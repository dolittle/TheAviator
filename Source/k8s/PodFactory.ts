// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { V1Pod } from '@kubernetes/client-node';
import { Mount, IPodFactory } from './index';

export class PodFactory implements IPodFactory {
    create(runId: Guid, shortName: string, uniqueName: string, image: string, label: string, exposedPorts: number[], mounts: Mount[]): V1Pod {
        const pod = new V1Pod();
        pod.kind = 'Pod';
        pod.apiVersion = 'v1';

        return pod;
    }

}
