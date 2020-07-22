// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { BrokenRuleCause } from './index';

/**
 * Represents a broken rule.
 *
 * @export
 * @class BrokenRule
 */
export class BrokenRule {
    readonly name!: string;

    readonly causes!: BrokenRuleCause[];
}

