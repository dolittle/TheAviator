// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Cluster, Context, User } from '@kubernetes/client-node/dist/config_types';

export type K8sConfiguration = {
    cluster: Cluster;
    context: Context;
    user: User;
};
