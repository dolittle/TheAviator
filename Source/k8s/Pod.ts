// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as stream from 'stream';
import * as k8s from '@kubernetes/client-node';
import { Guid } from '@dolittle/rudiments';
import { Mount, IPod } from './index';
import { BehaviorSubject, config } from 'rxjs';

export class Pod implements IPod {
    private readonly _exec: k8s.Exec;
    private readonly _attach: k8s.Attach;
    private readonly _outputStream: BehaviorSubject<NodeJS.ReadWriteStream>;
    constructor(
        readonly runId: Guid,
        readonly name: string,
        readonly friendlyName: string,
        readonly containerImage: string,
        readonly containerImageTag: string,
        readonly mounts: Mount[],
        readonly exposedPorts: number[],
        readonly address: string,
        config: k8s.KubeConfig,
        private readonly _namespace: string) {
            this._exec = new k8s.Exec(config);
            this._attach = new k8s.Attach(config);
            this._outputStream = new BehaviorSubject<NodeJS.ReadWriteStream>(new stream.PassThrough());
    }

    get outputStream() { return this._outputStream; }

    exec(
        command: string | string[],
        stdout: stream.Writable | null,
        stderr: stream.Writable | null,
        stdin: stream.Readable,
        tty: boolean,
        statusCallback?: (status: k8s.V1Status) => void) {
        return this._exec.exec(
            this._namespace,
            this.name,
            this.friendlyName,
            command, stdout,
            stderr,
            stdin,
            tty,
            statusCallback);
    }

    async start() {
        this.captureOutputFromContainer();
    }

    async stop() {
        // TODO: STOP
    }
    async restart() {
        //TODO: RESTART
    }
    async kill() {
        //TODO: KILL
    }

    private async captureOutputFromContainer() {
        this._outputStream.next(new stream.PassThrough());
        const ws = await this._attach.attach(this._namespace, this.name, this.friendlyName, process.stdout, process.stderr, null, false);
        ws.onmessage = event => console.log(`message: ${event.data}`);
        // TODO: Connect to stream
    }


}
