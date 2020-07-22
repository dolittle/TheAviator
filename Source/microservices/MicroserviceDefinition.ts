// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';

/**
 * Represents the definition of a microservice.
 *
 * @export
 * @class MicroserviceDefinition
 */
export class MicroserviceDefinition {
    readonly identifier: Guid;
    readonly name: string;
    readonly tenants: Guid[];
    readonly producers: MicroserviceDefinition[] = [];

    constructor(name: string, tenants: Guid[]) {
        this.identifier = Guid.create();
        this.name = name;
        this.tenants = tenants;
    }

    /**
     * Adds a producer to the microservice definition.
     *
     * @param {MicroserviceDefinition} consumer
     */
    addProducer(consumer: MicroserviceDefinition) {
        this.producers.push(consumer);
    }
}
