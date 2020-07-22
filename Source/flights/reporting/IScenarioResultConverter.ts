// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ScenarioResult as ReportingScenarioResult } from './index';
import { ScenarioResult } from '../../gherkin';

/**
 * Defines a system that can convert a ScenarioResult to a ReportingScenarioResult.
 *
 * @export
 * @interface IScenarioResultConverter
 */
export interface IScenarioResultConverter {
    /**
     * Convert the ScenarioResult.
     *
     * @param {ScenarioResult} input
     * @returns {ReportingScenarioResult}
     */
    convert(input: ScenarioResult): ReportingScenarioResult;
}