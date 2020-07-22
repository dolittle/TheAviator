// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Specification } from '../../gherkin';
import { Specification as ReportingSpecification, ISpecificationConverter } from './index';

/**
 * Represents an implementation of ISpecificationConverter.
 *
 * @export
 * @class SpecificationConverter
 * @implements {ISpecificationConverter}
 */
export class SpecificationConverter implements ISpecificationConverter {

    /**
     * @inheritdoc
     */
    convert(input: Specification): ReportingSpecification {
        return {
            feature: {
                name: input.feature.name,
                description: input.feature.description
            },
            givens: input.givens.map(_ => { return _.name; }),
            when: input.when.name,
            ands: input.ands.map(_ => { return _.name; }),
            thens: input.thens.map(_ => { return _.name; }),
            children: input.children.map(_ => this.convert(_))
        };
    }
}
