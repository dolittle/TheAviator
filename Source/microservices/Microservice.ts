// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import {  } from '../k8s';

import { IMicroserviceActions, MicroserviceActions } from './index';
import { MicroserviceConfiguration } from './configuration';
import { IEventStore, EventStore } from '../eventStores';

/**
 * Represents a microservice.
 *
 * @export
 * @class Microservice
 */
export class Microservice {
    readonly configuration: MicroserviceConfiguration;
    readonly head: any;
    readonly runtime: any;
    readonly eventStoreStorage: any;
    readonly actions: IMicroserviceActions;
    readonly eventStore: IEventStore;

    constructor(
        configuration: MicroserviceConfiguration,
        containerEnvironment: any,
        head: any,
        runtime: any,
        eventStoreStorage: any) {

        this.configuration = configuration;
        this.head = head;
        this.runtime = runtime;
        this.eventStoreStorage = eventStoreStorage;
        this.actions = new MicroserviceActions(this);
        this.eventStore = new EventStore(this);
    }

    /**
     * Starts the microservice.
     *
     */
    async start() {
        // await this.eventStoreStorage.start(new LogMessageWaitStrategy('waiting for connections on port 27017'));
        // await this.runtime.start(new LogMessageWaitStrategy('Application started.'));
        // await this.head.start(new LogMessageWaitStrategy('Connected to runtime'));
    }

    /**
     * Stops the microservice.
     *
     */
    async stop() {
        await this.head.stop();
        await this.runtime.stop();
        await this.eventStoreStorage.stop();
    }

    /**
     * Restart the microservice.
     *
     */
    async restart() {
        await this.head.restart();
        await this.runtime.restart();
        await this.eventStoreStorage.restart();
    }

    /**
     * Kills the microservice.
     *
     */
    async kill() {
        await this.head.kill();
        await this.runtime.kill();
        await this.eventStoreStorage.kill();

        // await this._containerEnvironment.removeNetwork(this.configuration.networkName);
    }

    async connectToProducer(producer: Microservice) {
        // await this.head.connectToNetwork(producer.configuration.networkName);
        // await this.runtime.connectToNetwork(producer.configuration.networkName);
        // await this.eventStoreStorage.connectToNetwork(producer.configuration.networkName);
    }

    async disconnectFromProducer(producer: Microservice) {
        // await this.head.disconnectFromNetwork(producer.configuration.networkName);
        // await this.runtime.disconnectFromNetwork(producer.configuration.networkName);
        // await this.eventStoreStorage.disconnectFromNetwork(producer.configuration.networkName);
    }
}
