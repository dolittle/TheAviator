// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import {
    RuntimeConfiguration,
    HeadConfiguration,
    Tenant,
    EventStoreTenantConfiguration,
    EventHorizonConfiguration,
    EventHorizonTenantConsentConfiguration
} from './index';
import { MicroserviceDefinition, Platform, shared } from '../index';

/**
 * Represents the configuration of a microservice.
 *
 * @export
 * @class MicroserviceConfiguration
 */
export class MicroserviceConfiguration {
    shortIdentifier: string;
    eventStoreForTenants: EventStoreTenantConfiguration[];
    tenants: Tenant[];
    runtime: RuntimeConfiguration;
    head: HeadConfiguration;
    mongoHost: string;
    producers: MicroserviceConfiguration[] = [];
    consumers: MicroserviceConfiguration[] = [];
    consents: EventHorizonTenantConsentConfiguration[] = [];
    eventHorizons: EventHorizonConfiguration[] = [];
    identifier: string;

    constructor(
        readonly platform: Platform,
        readonly name: string,
        identifier: Guid,
        tenants: Guid[]) {

        this.identifier = identifier.toString();
        this.shortIdentifier = this.identifier.substr(0, 8);

        this.mongoHost = `mongo-${this.shortIdentifier}`;
        const runtimeHost = `runtime-${this.shortIdentifier}`;
        const headHost = `head-${this.shortIdentifier}`;

        this.runtime = new RuntimeConfiguration(runtimeHost, 50052, 50053);
        this.head = new HeadConfiguration(headHost);

        this.eventStoreForTenants = tenants.map(tenant => new EventStoreTenantConfiguration(tenant, this.mongoHost));
        this.tenants = tenants.map(tenant => new Tenant(tenant));
    }

    /**
     * Adds a MicroserviceConfiguration for a producer.
     *
     * @param {MicroserviceConfiguration} producer
     */
    addProducer(producer: MicroserviceConfiguration) {
        this.producers.push(producer);
        producer.addConsumer(this);

        for (const tenant of this.tenants) {
            const tenantId = Guid.as(tenant.tenantId);
            this.eventHorizons.push(new EventHorizonConfiguration(tenantId, tenantId, Guid.as(producer.identifier), shared.Scopes.producerScope, shared.Streams.publicStream));
        }
    }

    /**
     * Adds a MicroserviceConfiguration for a consumer.
     *
     * @param {MicroserviceConfiguration} consumer
     */
    addConsumer(consumer: MicroserviceConfiguration) {
        this.consumers.push(consumer);

        for (const tenant of this.tenants) {
            const tenantId = Guid.as(tenant.tenantId);
            this.consents.push(new EventHorizonTenantConsentConfiguration(tenantId, tenantId, Guid.as(consumer.identifier), shared.Streams.publicStream));
        }
    }

    static from(platform: Platform, definition: MicroserviceDefinition) {
        const configuration = new MicroserviceConfiguration(platform, definition.name, definition.identifier, definition.tenants);
        return configuration;
    }
}
