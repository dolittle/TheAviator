// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Subject } from 'rxjs';

import { Scenario, ScenarioResult } from '../gherkin';

import { ScenarioResult as ReportingScenarioResult } from './reporting';

/**
 * Defines a system that can record information about a flight.
 *
 * @export
 * @interface IFlightRecorder
 */
export interface IFlightRecorder {
    readonly scenarioResult: Subject<ReportingScenarioResult>;

    /**
     * Concludes the flight record.
     *
     */
    conclude(): void;

    /**
     * Capture metrics for a Scenario.
     *
     * @param {Scenario} scenario
     * @returns {Promise<void>}
     */
    captureMetricsFor(scenario: Scenario): Promise<void>;

    /**
     * Records the results for a ScenarioResult.
     *
     * @param {ScenarioResult} scenarioResult
     * @returns {Promise<void>}
     */
    resultsFor(scenarioResult: ScenarioResult): Promise<void>;
}
