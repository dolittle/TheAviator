// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { SpecificationResult } from '../../gherkin';
import { SpecificationResult as ReportingSpecificationResult, ISpecificationConverter, ISpecificationResultConverter } from './index';

/**
 * Represents an implementation of ISpecificationResultConverter.
 *
 * @export
 * @class SpecificationResultConverter
 * @implements {ISpecificationResultConverter}
 */
export class SpecificationResultConverter implements ISpecificationResultConverter {
    constructor(private _specificationConverter: ISpecificationConverter) {
    }

    /**
     * @inheritdoc
     */
    convert(input: SpecificationResult): ReportingSpecificationResult {
        return {
            specification: this._specificationConverter.convert(input.specification),
            results: input.results.map(thenResult => {
                return {
                    then: thenResult.then.name,
                    brokenRules: thenResult.brokenRules.map(brokenRule => {
                        return {
                            name: brokenRule.rule.constructor.name,
                            causes: brokenRule.causes.map(brokenRuleCause => {
                                return {
                                    title: brokenRuleCause.title,
                                    description: brokenRuleCause.description
                                };
                            })
                        };
                    })
                };
            })
        };
    }
}
