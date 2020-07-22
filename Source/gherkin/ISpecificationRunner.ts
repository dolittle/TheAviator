// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Specification, SpecificationResult, ScenarioContext, ScenarioFor } from './';

export interface ISpecificationRunner {
    run(scenarioFor: ScenarioFor<ScenarioContext>, specification: Specification): Promise<SpecificationResult>;
}


