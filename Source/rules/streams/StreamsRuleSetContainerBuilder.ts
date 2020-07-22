// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';

import { Microservice, shared } from '@dolittle/aviator.microservices';
import { EventWithContentShouldBeInStream } from './index';
import { MicroserviceRuleSetContainerBuilder } from '../index';

export class StreamsRuleSetContainerBuilder extends MicroserviceRuleSetContainerBuilder {
    constructor(microservice: Microservice) {
        super(microservice);
    }

    should_contain = (tenantId: Guid, streamId: Guid, scopeId: Guid, ...events: shared.EventObject[]) => this.addRuleBuilderFor(new EventWithContentShouldBeInStream(tenantId, `${scopeId.toString() !== Guid.empty.toString() ? `x-${scopeId.toString()}-` : ''}stream-${streamId.toString()}`, ...events));
    should_be_in_public_stream = (tenantId: Guid, publicStreamId: Guid, ...events: shared.EventObject[]) => this.addRuleBuilderFor(new EventWithContentShouldBeInStream(tenantId, `public-stream-${publicStreamId.toString()}`, ...events));
    should_be_in_external_event_log = (tenantId: Guid, externalScopeId: Guid, ...events: shared.EventObject[]) => this.addRuleBuilderFor(new EventWithContentShouldBeInStream(tenantId, `x-${externalScopeId.toString()}-event-log`, ...events));
}
