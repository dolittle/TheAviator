// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as fs from 'fs';
import * as path from 'path';

import { Subject } from 'rxjs';

import { ISerializer } from '@dolittle/serialization.json';
import { Scenario, ReportingScenarioResult, IScenarioConverter, IScenarioResultConverter, ScenarioResult, ReportingScenario } from '@dolittle/testing.gherkin';
import { MicroserviceScenarioEnvironment } from '@dolittle/aviator.gherkin';
import { Microservice, IMicroserviceComponent } from '@dolittle/aviator.microservices';

import { Flight, IFlightRecorder } from './index';

/**
 * Represents an implementation of IFlightRecorder.
 *
 * @export
 * @class FlightRecorder
 * @implements {IFlightRecorder}
 */
export class FlightRecorder implements IFlightRecorder {
    private _currentScenario: Scenario;
    private _colorRemoverRegEx: RegExp;
    private _scenarioResultsPerContext: { [key: string]: ReportingScenarioResult[] } = {};

    readonly scenarioResult: Subject<ReportingScenarioResult>;

    constructor(
        private _flight: Flight,
        private _scenarioConverter: IScenarioConverter,
        private _scenarioResultConverter: IScenarioResultConverter,
        private _serializer: ISerializer) {
        this._colorRemoverRegEx = /#[0-9a-f]{6}|#[0-9a-f]{3}/gi;
        this._colorRemoverRegEx.compile();
        this.writePreflightChecklist();

        this.scenarioResult = new Subject();

        _flight.environment.subscribe((environment) => this.collectLogsFor(environment));
        _flight.scenario.subscribe((scenario) => this._currentScenario = scenario);
        this._currentScenario = _flight.scenario.getValue();
    }

    /** @inheritdoc */
    conclude() {
        const json = this._serializer.toJSON(this._scenarioResultsPerContext);
        const resultFilePath = path.join(this._flight.paths.base, 'results.json');
        fs.writeFileSync(resultFilePath, json);
    }

    /** @inheritdoc */
    async resultsFor(result: ScenarioResult) {
        const reportingResult = this._scenarioResultConverter.convert(result);
        const currentScenarioPathPath = this._flight.paths.forScenario(result.scenario);
        const resultFilePath = path.join(currentScenarioPathPath, 'result.json');
        const json = this._serializer.toJSON(reportingResult);
        fs.writeFileSync(resultFilePath, json);

        if (!this._scenarioResultsPerContext.hasOwnProperty(result.scenario.contextName)) {
            this._scenarioResultsPerContext[result.scenario.contextName] = [];
        }

        this._scenarioResultsPerContext[result.scenario.contextName].push(reportingResult);
        this.scenarioResult.next(reportingResult);
    }

    /** @inheritdoc */
    async captureMetricsFor(scenario: Scenario) {
        (scenario.environment as MicroserviceScenarioEnvironment).forEachMicroservice(async microservice => {
            const currentScenarioPath = this._flight.paths.forMicroserviceInScenario(scenario, microservice);
            const metricsFilePath = path.join(currentScenarioPath, 'metrics.txt');
            const metrics = await microservice.actions.getRuntimeMetrics();
            fs.writeFileSync(metricsFilePath, metrics);
        });
    }

    private collectLogsFor(environment: MicroserviceScenarioEnvironment) {
        Object.values(environment.microservices).forEach(microservice => {
            microservice.head.outputStream.subscribe(data => this.appendOutput(microservice, microservice.head, data));
            microservice.runtime.outputStream.subscribe(data => this.appendOutput(microservice, microservice.runtime, data));
            microservice.eventStoreStorage.outputStream.subscribe(data => this.appendOutput(microservice, microservice.eventStoreStorage, data));
        });
    }

    private appendOutput(microservice: Microservice, component: IMicroserviceComponent, data: string) {
        const currentScenarioPath = this._flight.paths.forMicroserviceInScenario(this._currentScenario, microservice);
        const currentContainerPath = path.join(currentScenarioPath, `${component.friendlyName}.log`);

        fs.appendFileSync(currentContainerPath, data);
    }

    private writePreflightChecklist() {
        const checklist: { [key: string]: ReportingScenario[] } = {};

        for (const environment of this._flight.preflightChecklist.scenariosByEnvironment.keys()) {
            const scenarios = this._flight.preflightChecklist.scenariosByEnvironment.get(environment);
            if (scenarios && scenarios.length > 0) {
                const scenarioContextName = scenarios[0].contextName;
                checklist[scenarioContextName] = scenarios.map(_ => { return this._scenarioConverter.convert(_); });
            }
        }

        const serialized = this._serializer.toJSON(checklist);
        const outputFile = path.join(this._flight.paths.base, 'preflight-checklist.json');

        fs.writeFileSync(outputFile, serialized);
    }
}
