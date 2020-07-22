// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';

/**
 * Represents the configuration of an Event Store for a tenant.
 *
 * @export
 * @class EventStoreTenantConfiguration
 */
export class EventStoreTenantConfiguration {
    readonly tenantId: string;
    readonly database: string;

    /**
     * Creates an instance of EventStoreTenantConfiguration.
     * @param {string} tenantId
     * @param {string} server
     */
    constructor(tenantId: Guid, readonly server: string) {
        this.tenantId = tenantId.toString();
        const shortIdentifier = this.tenantId.substr(0, 8);
        this.database = `event-store-${shortIdentifier}`;
    }
}
