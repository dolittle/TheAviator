// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import stream from 'stream';
import { IMicroserviceComponent } from '../../index';

export interface IMongo extends IMicroserviceComponent {
    readonly clientUrl: string;
    dump(database: string, outputStream: stream.Writable): Promise<void>;
}
