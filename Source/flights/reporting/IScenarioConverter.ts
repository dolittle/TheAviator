// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Scenario as ReportingScenario } from './index';
import { Scenario } from '../../gherkin';

/**
 * Represents a converter for a scenario.
 *
 * @export
 * @interface IScenarioConverter
 */
export interface IScenarioConverter {
    convert(input: Scenario): ReportingScenario;
}
