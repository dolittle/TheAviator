// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ScenarioResult } from '../../gherkin';
import { ScenarioResult as ReportingScenarioResult, IScenarioResultConverter, ISpecificationResultConverter } from './index';

/**
 * Represents an implementation of IScenarioResultConverter.
 *
 * @export
 * @class ScenarioResultConverter
 * @implements {IScenarioResultConverter}
 */
export class ScenarioResultConverter implements IScenarioResultConverter {
    constructor(private _specificationResultConverter: ISpecificationResultConverter) {
    }

    /**
     * @inheritdoc
     */
    convert(input: ScenarioResult): ReportingScenarioResult {
        return {
            name: input.scenario.name,
            result: this._specificationResultConverter.convert(input.result)
        };
    }
}