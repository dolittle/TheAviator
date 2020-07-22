// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { V1Pod } from '@kubernetes/client-node';

export interface IPodFactory {
    create(runId: Guid, name: string,): V1Pod
}
