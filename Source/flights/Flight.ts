// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { BehaviorSubject } from 'rxjs';

import { Scenario, ScenarioEnvironment, ScenarioEnvironmentDefinition } from '../gherkin';
import { IFlightPaths, IFlightRecorder, PreflightChecklist } from './index';

/**
 * Represents a flight with a PreflightChecklist to perform.
 *
 * @export
 * @class Flight
 */
export class Flight {
    private _recorder: IFlightRecorder | undefined;
    private _flightPaths: IFlightPaths;

    readonly preflightChecklist: PreflightChecklist;
    readonly platform: string;

    readonly environment: BehaviorSubject<ScenarioEnvironment>;
    readonly scenario: BehaviorSubject<Scenario>;

    constructor(platform: string, flightPaths: IFlightPaths, preflightChecklist: PreflightChecklist) {
        this.platform = platform;
        this._flightPaths = flightPaths;
        this.preflightChecklist = preflightChecklist;

        this.environment = new BehaviorSubject<ScenarioEnvironment>(ScenarioEnvironment.empty);
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
