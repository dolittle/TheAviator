// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';

/**
 * Represents the configuration of an Event Horizon consent for a tenant.
 *
 * @export
 * @class EventHorizonTenantConsentConfiguration
 */
export class EventHorizonTenantConsentConfiguration {
    readonly producerTenant: Guid;
    readonly consumerTenant: Guid;
    readonly microservice: Guid;
    readonly stream: Guid;

    /**
     * Creates an instance of EventHorizonTenantConsentConfiguration.
     * @param {Guid} producerTenant
     * @param {Guid} consumerTenant
     * @param {Guid} microservice
     * @param {Guid} stream
     */
    constructor(
        producerTenant: Guid,
        consumerTenant: Guid,
        microservice: Guid,
        stream: Guid) {
            this.producerTenant = producerTenant;
            this.consumerTenant = consumerTenant;
            this.microservice = microservice;
            this.stream = stream;
    }
}
