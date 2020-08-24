// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/rudiments';
import { MicroserviceScenarioContext } from '@dolittle/aviator.gherkin';
import { Infrastructure } from '@dolittle/aviator.microservices';
import { ScenarioFor } from '@dolittle/testing.gherkin';

import { PreflightChecklist } from './index';

/**
 * Defines a system that can plan out a flight.
 *
 * @export
 * @interface IPreflightPlanner
 */
export interface IPreflightPlanner {

    /**
     * Creates a preflight checklist for
     *
     * @param {string} platform
     * @param {...Constructor<ScenarioFor<ScenarioContext>>[]} scenarios
     * @returns {Promise<PreflightChecklist>}
     */
    createChecklistFor(platform: Infrastructure, ...scenarios: Constructor<ScenarioFor<MicroserviceScenarioContext>>[]): Promise<PreflightChecklist>
}
