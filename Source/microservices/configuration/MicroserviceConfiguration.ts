// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import {
    RuntimeConfiguration,
    HeadConfiguration,
    Tenant,
    EventStoreTenantConfiguration,
    EventHorizonConfiguration,
    EventHorizonTenantConsentConfiguration,
    IMicroserviceHostsProvider
} from './index';
import { MicroserviceDefinition, Platform, shared } from '../index';

/**
 * Represents the configuration of a microservice.
 *
 * @export
 * @class MicroserviceConfiguration
 */
export class MicroserviceConfiguration {
    static headInteractionPort = 5000;
    static runtimePublicPort = 50052;
    static runtimePrivatePort = 50053;
    static runtimeUiInteractionPort = 81;
    static runtimeMetricsPort = 9700;
    static mongoPort = 27017;

    eventStoreForTenants!: EventStoreTenantConfiguration[];
    tenants: Tenant[];
    runtime!: RuntimeConfiguration;
    head!: HeadConfiguration;
    producers: MicroserviceConfiguration[] = [];
    consumers: MicroserviceConfiguration[] = [];
    consents: EventHorizonTenantConsentConfiguration[] = [];
    eventHorizons: EventHorizonConfiguration[] = [];
    identifier: string;

    private constructor(
        readonly platform: Platform,
        readonly name: string,
        identifier: Guid,
        tenants: Guid[],
        private readonly _hostsProvider: IMicroserviceHostsProvider) {

        this.identifier = identifier.toString();

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

    setHostsFor(uniqueId: Guid) {
        const hosts = this._hostsProvider.provide(uniqueId);

        this.runtime = new RuntimeConfiguration(hosts.runtime, MicroserviceConfiguration.runtimePublicPort, MicroserviceConfiguration.runtimePrivatePort);
        this.head = new HeadConfiguration(hosts.head);

        this.eventStoreForTenants = this.tenants.map(tenant => new EventStoreTenantConfiguration(Guid.as(tenant.tenantId), hosts.mongo));
    }
    static from(platform: Platform, definition: MicroserviceDefinition, hostsProvider: IMicroserviceHostsProvider) {
        const configuration = new MicroserviceConfiguration(platform, definition.name, definition.identifier, definition.tenants, hostsProvider);
        return configuration;
    }
}
