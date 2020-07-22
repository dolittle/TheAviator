// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { Microservice, shared } from '@dolittle/aviator.microservices';

import { EventWithContentShouldBeInStream } from './index';
import { MicroserviceRuleSetContainerBuilder } from '../index';


export class EventLogRuleSetContainerBuilder extends MicroserviceRuleSetContainerBuilder {
    constructor(microservice: Microservice) {
        super(microservice);
    }

    should_contain = (tenantId: Guid, ...events: shared.EventObject[]) => this.addRuleBuilderFor(new EventWithContentShouldBeInStream(tenantId, 'event-log', ...events));
}
