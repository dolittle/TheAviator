// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as stream from 'stream';
import { BehaviorSubject } from 'rxjs';

import { Guid } from '@dolittle/rudiments';
import * as k8s from '@kubernetes/client-node';

export class NamespacedPod {
    private readonly _exec: k8s.Exec;
    private readonly _attach: k8s.Attach;
    private readonly _outputStream: BehaviorSubject<NodeJS.ReadWriteStream>;
    constructor(
        readonly runId: Guid,
        readonly namespace: string,
        readonly uniqueName: string,
        readonly friendlyName: string,
        readonly containerImage: string,
        config: k8s.KubeConfig) {
            this._exec = new k8s.Exec(config);
            this._attach = new k8s.Attach(config);
            this._outputStream = new BehaviorSubject<NodeJS.ReadWriteStream>(new stream.PassThrough());

    }

    get outputStream() { return this._outputStream; }


    exec(
        command: string | string[],
        stdout: stream.Writable | null,
        stderr: stream.Writable | null,
        stdin: stream.Readable | null,
        tty: boolean,
        statusCallback?: (status: k8s.V1Status) => void) {
        return this._exec.exec(
            this.namespace,
            this.uniqueName,
            this.friendlyName,
            command,
            stdout,
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
        const ws = await this._attach.attach(this.namespace, this.uniqueName, this.friendlyName, process.stdout, process.stderr, null, false);
        ws.onmessage = event => console.log(`message: ${event.data}`);
        // TODO: Connect to stream
    }


}
