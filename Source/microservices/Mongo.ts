// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import stream from 'stream';
import { NamespacedPod } from '@dolittle/aviator.k8s';

import { MicroserviceComponent, MicroserviceConfiguration } from './index';

export class Mongo extends MicroserviceComponent {
    constructor(pod: NamespacedPod, microserviceConfiguration: MicroserviceConfiguration) {
        super(pod, microserviceConfiguration);
    }

    get clientUrl() { return `mongodb://pod/url:${MicroserviceConfiguration.mongoPort}`;}

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
