// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IMicroserviceHostsProvider } from '@dolittle/aviator.microservices';
import { Guid } from '@dolittle/rudiments';

export class MicroserviceHostsProvider implements IMicroserviceHostsProvider {
    provide(uniqueId: Guid): { mongo: string; runtime: string; head: string; } {
        return {
            head: `head-${uniqueId.toString()}-service`,
            mongo: `mongo-${uniqueId.toString()}-service`,
            runtime: `runtime-${uniqueId.toString()}-service`
        };
    }

}