// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { FilterQuery } from 'mongodb';
import { Guid } from '@dolittle/rudiments';

/**
 * Defines the interface of the event store.
 *
 * @export
 * @interface IEventStore
 */
export interface IEventStore {
    /**
     * Find events in a specific stream.
     *
     * @param {Guid} tenantId
     * @param {string} stream
     * @param {FilterQuery<any>} filter
     * @returns {Promise<any[]>}
     */
    findEvents(tenantId: Guid, stream: string, filter: FilterQuery<any>): Promise<any[]>

    /**
     * Get stream processor state.
     *
     * @param {Guid} tenantId
     * @param {Guid} eventProcessorId
     * @param {Guid} scopeId
     * @param {Guid} sourceStreamId
     * @returns {Promise<any>}
     */
    getStreamProcessorState(tenantId: Guid, eventProcessorId: Guid, scopeId: Guid, sourceStreamId: Guid): Promise<any>;

    /**
     * Dumps the event store database.
     *
     * @param {string} path
     * @returns {Promise<string[]>}
     */
    dump(path: string): Promise<string[]>;

    /**
     * Clears the database.
     *
     * @returns {Promise<void>}
     */
    clear(): Promise<void>;
}
