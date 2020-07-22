// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/rudiments';
import { IGiven, ScenarioEnvironmentDefinition } from './';

export interface IScenarioContextManager {
    getFor(givenStatement: Constructor<IGiven>): ScenarioEnvironmentDefinition;
}
