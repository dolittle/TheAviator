// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IRunContext } from '@dolittle/aviator.k8s';

import { IMicroserviceActions, MicroserviceActions, IHead, IRuntime, IMongo, IEventStore, EventStore, EventStoreTenantConfiguration } from './index';

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
        readonly name: string,
        readonly eventStoreConfigurations: readonly EventStoreTenantConfiguration[],
        readonly head: IHead,
        readonly runtime: IRuntime,
        readonly eventStoreStorage: IMongo) {

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

    }
}
