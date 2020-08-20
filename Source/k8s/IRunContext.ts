// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { V1Pod, V1ConfigMap, V1Service } from '@kubernetes/client-node';
import { NamespacedPod } from './index';

export interface IRunContext {
    readonly id: Guid;
    readonly pods: readonly NamespacedPod[];

    createPod(pod: V1Pod, service?: V1Service, configMap?: V1ConfigMap): Promise<NamespacedPod>

    /**
     * Clear all resources.
     *
     * @returns {Promise<void>}
     */
    clear(): Promise<void>

}
