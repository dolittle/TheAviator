// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/rudiments';

import {
    MicroserviceScenarioContext,
    MicroserviceScenarioEnvironment,
    MicroserviceScenarioEnvironmentDefinition,
    MicroserviceScenarioEnvironmentBuilder
} from '@dolittle/aviator.gherkin';

import {
    ScenarioFor,
    ISpecificationBuilder,
    Scenario,
} from '@dolittle/testing.gherkin';

import { Infrastructure } from '@dolittle/aviator.microservices';

import { IPreflightPlanner, PreflightChecklist } from './index';

/**
 * Represents an implementation of IPreflightPlanner.
 *
 * @export
 * @class PreflightPlanner
 * @implements {IPreflightPlanner}
 */
export class PreflightPlanner implements IPreflightPlanner {

    constructor(private _scenarioEnvironmentBuilder: MicroserviceScenarioEnvironmentBuilder, private _specificationBuilder: ISpecificationBuilder) {
    }

    /** @inheritdoc */
    async createChecklistFor(platform: Infrastructure, ...scenarios: Constructor<ScenarioFor<MicroserviceScenarioContext>>[]): Promise<PreflightChecklist> {
        const scenarioEnvironmentsByContextType: Map<Constructor<MicroserviceScenarioContext>, MicroserviceScenarioEnvironment> = new Map();
        const scenarioContextsByContextType: Map<Constructor<MicroserviceScenarioContext>, MicroserviceScenarioContext> = new Map();
        const scenariosByEnvironments: Map<MicroserviceScenarioEnvironment, Scenario[]> = new Map();

        for (const scenarioForConstructor of scenarios) {
            const instance = new scenarioForConstructor() as ScenarioFor<MicroserviceScenarioContext>;
            const scenarioContextType = instance.for;

            let scenarioEnvironment: MicroserviceScenarioEnvironment | undefined;

            if (scenarioEnvironmentsByContextType.has(scenarioContextType)) {
                scenarioEnvironment = scenarioEnvironmentsByContextType.get(scenarioContextType);
            } else {
                const scenarioContext = new scenarioContextType();

                const scenarioEnvironmentDefinition = new MicroserviceScenarioEnvironmentDefinition();
                scenarioContext.describe(scenarioEnvironmentDefinition);

                await this._scenarioEnvironmentBuilder.forPlatformAndDefinition(platform, scenarioEnvironmentDefinition);
                scenarioEnvironment = this._scenarioEnvironmentBuilder.build();
                scenarioEnvironmentsByContextType.set(scenarioContextType, scenarioEnvironment);
                scenariosByEnvironments.set(scenarioEnvironment, []);
                scenarioContextsByContextType.set(scenarioContextType, scenarioContext);
            }

            instance.context = scenarioContextsByContextType.get(scenarioContextType);

            if (scenarioEnvironment) {
                const specification = this._specificationBuilder.buildFrom(instance);
                const scenario = new Scenario(instance, scenarioEnvironment, specification);
                scenariosByEnvironments.get(scenarioEnvironment)?.push(scenario);
            }
        }

        return new PreflightChecklist(scenariosByEnvironments);
    }
}
