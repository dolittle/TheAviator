// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import stream from 'stream';
import { IPod } from '@dolittle/aviator.k8s';
import { MicroserviceComponent } from './index';

export class Mongo extends MicroserviceComponent {
    readonly port = 27017;
    constructor(image: string, imageTag: string, pod: IPod, readonly host: string) {
        super(image, imageTag, pod);
    }

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
