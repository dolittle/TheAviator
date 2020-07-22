// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Specification as ReportingSpecification } from './index';
import { Specification } from '../../gherkin';

/**
 * Defines a system that can convert a Specification to a ReportingSpecification.
 *
 * @export
 * @interface ISpecificationConverter
 */
export interface ISpecificationConverter {
    /**
     * Convert the Specification.
     *
     * @param {Specification} input
     * @returns {ReportingSpecification}
     */
    convert(input: Specification): ReportingSpecification;
}
