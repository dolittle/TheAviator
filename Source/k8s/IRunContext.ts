// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { V1Pod, V1ConfigMap, V1Service } from '@kubernetes/client-node';
import { NamespacedPod } from './index';

export interface IRunContext {
    readonly id: Guid;
    readonly pods: NamespacedPod[];

    start(): Promise<void>
    restart(): Promise<void>
    kill(): Promise<void>

    createPod(pod: V1Pod, service?: V1Service, configMap?: V1ConfigMap): Promise<NamespacedPod>
    startPod(pod: NamespacedPod): Promise<void>
    stopPod(pod: NamespacedPod): Promise<void>
    restartPod(pod: NamespacedPod): Promise<void>
    killPod(pod: NamespacedPod): Promise<void>

    /**
     * Clear all resources.
     *
     * @returns {Promise<void>}
     */
    clear(): Promise<void>

}
