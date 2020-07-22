// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { BrokenRule } from './index';

/**
 * Represents the result of a then.
 *
 * @export
 * @class ThenResult
 */
export class ThenResult {
    readonly then!: string;
    readonly brokenRules!: BrokenRule[];
}
