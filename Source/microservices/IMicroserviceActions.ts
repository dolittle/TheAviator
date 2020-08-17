// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';

import { shared } from './index';

/**
 * Defines a system that can perform a set of actions on a microservice.
 *
 * @export
 * @interface IMicroserviceActions
 */
export interface IMicroserviceActions {
    checkStatus(): Promise<string>;
    commitEvents(tenantId: Guid, eventSource: Guid, ...events: shared.EventObject[]): Promise<void>;
    commitPublicEvents(tenantId: Guid, eventSource: Guid, ...events: shared.EventObject[]): Promise<void>;
    commitAggregateEvents(tenantId: Guid, eventSource: Guid, version: number, ...events: shared.EventObject[]): Promise<void>;
    getRuntimeMetrics(): Promise<string>;
}
