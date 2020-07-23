// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IRunContext } from '@dolittle/aviator.k8s';

import { MicroserviceConfiguration } from './configuration';
import { IEventStore, EventStore } from './eventStores';
import { IMicroserviceActions, MicroserviceActions, Head, Runtime, Mongo } from './index';

/**
 * Represents a microservice.
 *
 * @export
 * @class Microservice
 */
export class Microservice {
    readonly actions: IMicroserviceActions;
    readonly eventStore: IEventStore;

    constructor(
        private readonly _runContext: IRunContext,
        readonly configuration: MicroserviceConfiguration,
        readonly head: Head,
        readonly runtime: Runtime,
        readonly eventStoreStorage: Mongo) {

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

        await this._runContext.startPod(this.eventStoreStorage.pod);
        await this._runContext.startPod(this.runtime.pod);
        await this._runContext.startPod(this.head.pod);
    }

    /**
     * Stops the microservice.
     *
     */
    async stop() {
        await this._runContext.stopPod(this.head.pod);
        await this._runContext.stopPod(this.runtime.pod);
        await this._runContext.stopPod(this.eventStoreStorage.pod);
    }

    /**
     * Restart the microservice.
     *
     */
    async restart() {
        await this._runContext.restartPod(this.head.pod);
        await this._runContext.restartPod(this.runtime.pod);
        await this._runContext.restartPod(this.eventStoreStorage.pod);
    }

    /**
     * Kills the microservice.
     *
     */
    async kill() {
        await this._runContext.killPod(this.head.pod);
        await this._runContext.killPod(this.runtime.pod);
        await this._runContext.killPod(this.eventStoreStorage.pod);

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
