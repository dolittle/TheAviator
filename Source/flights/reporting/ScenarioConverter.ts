// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Scenario } from '../../gherkin';
import { Scenario as ReportingScenario, IScenarioConverter, ISpecificationConverter } from './index';

/**
 * Represents an implementation of IScenarioConverter.
 *
 * @export
 * @class ScenarioConverter
 * @implements {IScenarioConverter}
 */
export class ScenarioConverter implements IScenarioConverter {
    constructor(readonly _specificationConverter: ISpecificationConverter) {
    }

    /**
     * @inheritdoc
     */
    convert(input: Scenario): ReportingScenario {
        return {
            name: input.name,
            context: input.contextName,
            specification: this._specificationConverter.convert(input.specification)
        };
    }
}
