// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { SpecificationResult as ReportingSpecificationResult } from './index';
import { SpecificationResult } from '../../gherkin';

/**
 * Defines a system that can convert a SpecificationResult to a ReportingSpecificationResult.
 *
 * @export
 * @interface ISpecificationResultConverter
 */
export interface ISpecificationResultConverter {
    /**
     * Convert the SpecificationResult.
     *
     * @param {SpecificationResult} input
     * @returns {ReportingSpecificationResult}
     */
    convert(input: SpecificationResult): ReportingSpecificationResult;
}

