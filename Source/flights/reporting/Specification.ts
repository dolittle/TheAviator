// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Feature } from './index';

/**
 * Represents a specification.
 *
 * @export
 * @class Specification
 */
export class Specification {
    readonly feature!: Feature;
    readonly givens!: string[];
    readonly when!: string;
    readonly ands!: string[];
    readonly thens!: string[];
    readonly children!: Specification[];
}
