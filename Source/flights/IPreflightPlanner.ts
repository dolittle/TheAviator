// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/rudiments';
import { ScenarioFor, ScenarioContext } from '../gherkin';
import { Platform } from '../microservices';
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
    createChecklistFor(platform: Platform, ...scenarios: Constructor<ScenarioFor<ScenarioContext>>[]): Promise<PreflightChecklist>
}
