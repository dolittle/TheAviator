// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';

/**
 * Represents the configuration of an Event Horizon
 *
 * @export
 * @class EventHorizonConfiguration
 */
export class EventHorizonConfiguration {
    readonly consumerTenant: string;
    readonly producerTenant: string;
    readonly microservice: string;
    readonly scope: string;
    readonly stream: string;
    /**
     * Creates an instance of EventHorizonConfiguration.
     * @param {Guid} consumerTenant
     * @param {Guid} producerTenant
     * @param {Guid} microservice
     * @param {Guid} scope
     * @param {Guid} stream
     */
    constructor(
        consumerTenant: Guid,
        producerTenant: Guid,
        microservice: Guid,
        scope: Guid,
        stream: Guid) {
            this.consumerTenant = consumerTenant.toString();
            this.producerTenant = producerTenant.toString();
            this.microservice = microservice.toString();
            this.scope = scope.toString();
            this.stream = stream.toString();
    }
}
