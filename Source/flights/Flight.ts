// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { BehaviorSubject } from 'rxjs';

import { Scenario } from '@dolittle/testing.gherkin';
import { MicroserviceScenarioEnvironment, emptyMicroserviceScenarioEnvironment } from '@dolittle/aviator.gherkin';
import { Infrastructure } from '@dolittle/aviator.microservices';
import { IFlightPaths, IFlightRecorder, PreflightChecklist } from './index';

/**
 * Represents a flight with a PreflightChecklist to perform.
 *
 * @export
 * @class Flight
 */
export class Flight {
    private _recorder: IFlightRecorder | undefined;

    readonly environment: BehaviorSubject<MicroserviceScenarioEnvironment>;
    readonly scenario: BehaviorSubject<Scenario>;

    constructor(readonly platform: Infrastructure, private readonly _flightPaths: IFlightPaths, readonly preflightChecklist: PreflightChecklist) {
        this.environment = new BehaviorSubject<MicroserviceScenarioEnvironment>(emptyMicroserviceScenarioEnvironment);
        this.scenario = new BehaviorSubject<Scenario>(Scenario.none);
    }

    /**
     * Gets the flight paths.
     *
     * @readonly
     * @type {IFlightPaths}
     */
    get paths(): IFlightPaths {
        return this._flightPaths;
    }

    /**
     * Gets the flight recorder.
     *
     * @readonly
     * @type {IFlightRecorder}
     */
    get recorder(): IFlightRecorder {
        if (this._recorder) {
            return this._recorder;
        }
        throw new Error('Flight recorder is not configured for flight');
    }

    /**
     * Sets the flight recorder of this Flight.
     *
     * @param {IFlightRecorder} recorder
     */
    setRecorder(recorder: IFlightRecorder) {
        this._recorder = recorder;
    }
}
