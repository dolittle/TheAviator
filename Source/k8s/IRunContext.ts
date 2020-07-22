// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { IPod } from './index';

export interface IRunContext {
    readonly id: Guid;
    readonly pods: IPod[];

    addMicroservice(): Promise<void>

    /**
     * Clear all resources.
     *
     * @returns {Promise<void>}
     */
    clear(): Promise<void>

}
