// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';

import { EventWithContentShouldBeInStream } from './';
import { Microservice } from '../../microservices';
import { EventObject } from '../../microservices/shared/EventObject';

import { ScenarioRuleSetContainerBuilder } from '../';

export class EventLogRuleSetContainerBuilder extends ScenarioRuleSetContainerBuilder {
    constructor(microservice: Microservice) {
        super(microservice);
    }

    should_contain = (tenantId: Guid, ...events: EventObject[]) => this.addRuleBuilderFor(new EventWithContentShouldBeInStream(tenantId, 'event-log', ...events));
}
