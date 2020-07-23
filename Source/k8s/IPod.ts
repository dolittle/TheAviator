// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as stream from 'stream';
import { BehaviorSubject } from 'rxjs';
import * as k8s from '@kubernetes/client-node';
import { Guid } from '@dolittle/rudiments';

import { Mount } from './index';
// eslint-disable-next-line import/no-extraneous-dependencies
import WebSocket from 'isomorphic-ws';

export interface IPod {
    readonly id: Guid;
    readonly name: string;
    readonly friendlyName: string;
    readonly containerImage: string;
    readonly containerImageTag: string;
    readonly mounts: Mount[];
    readonly exposedPorts: number[];
    readonly address: string;
    readonly outputStream: BehaviorSubject<NodeJS.ReadWriteStream>

    exec(
        command: string | string[],
        stdout: stream.Writable | null,
        stderr: stream.Writable | null,
        stdin: stream.Readable | null,
        tty: boolean,
        statusCallback?: (status: k8s.V1Status) => void): Promise<InstanceType<typeof WebSocket>>;

}
