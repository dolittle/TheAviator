// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroserviceScenarioEnvironment } from '@dolittle/aviator.gherkin';
import { Scenario } from '@dolittle/testing.gherkin';

/**
 * Represents a checklist that has to be performed prior to a Flight.
 *
 * @export
 * @class PreflightChecklist
 */
export class PreflightChecklist {
    readonly scenariosByEnvironment: Map<MicroserviceScenarioEnvironment, Scenario[]>;

    constructor(scenariosByEnvironment: Map<MicroserviceScenarioEnvironment, Scenario[]>) {
        this.scenariosByEnvironment = scenariosByEnvironment;
    }
}
