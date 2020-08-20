// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import stream from 'stream';

import { NamespacedPod } from '@dolittle/aviator.k8s';
import { MicroserviceConfiguration, IMongo } from '@dolittle/aviator.microservices';

import { MicroserviceComponent } from './index';

export class Mongo extends MicroserviceComponent implements IMongo {
    constructor(pod: NamespacedPod, microserviceConfiguration: MicroserviceConfiguration) {
        super(pod, microserviceConfiguration);
    }

    get clientUrl() { return `mongodb://${this.microserviceConfiguration.eventStoreForTenants[0].server}:${MicroserviceConfiguration.mongoPort}`;}

    async dump(database: string, outputStream: stream.Writable) {
        const ws = await this.pod.exec(
            [
                'mongodump',
                '--quiet',
                '--archive',
                '-d'
            ],
            outputStream,
            null,
            null,
            false);
        ws.onmessage = event => console.log(event.data);
    }
}
