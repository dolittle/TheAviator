// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { IPod } from './index';
import { V1Pod } from '@kubernetes/client-node';

export interface IRunContext {
    readonly id: Guid;
    readonly pods: IPod[];

    start(): Promise<void>
    restart(): Promise<void>
    kill(): Promise<void>

    addPod(pod: V1Pod): Promise<IPod>
    startPod(pod: IPod): Promise<void>
    stopPod(pod: IPod): Promise<void>
    restartPod(pod: IPod): Promise<void>
    killPod(pod: IPod): Promise<void>

    /**
     * Clear all resources.
     *
     * @returns {Promise<void>}
     */
    clear(): Promise<void>

}
