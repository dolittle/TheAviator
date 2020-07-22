// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Specification, ThenResult } from './index';

/**
 * Represents the result of a Specification.
 *
 * @export
 * @class SpecificationResult
 */
export class SpecificationResult {
    readonly specification!: Specification;
    readonly results!: ThenResult[];
}
