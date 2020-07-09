// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ScenarioEnvironmentDefinition } from './ScenarioEnvironmentDefinition';
import { ScenarioEnvironment } from './ScenarioEnvironment';

export interface IGiven {
    describe(scenarioContext: ScenarioEnvironmentDefinition): void;

    establish(scenarioContext: ScenarioEnvironment): Promise<void>;
}
