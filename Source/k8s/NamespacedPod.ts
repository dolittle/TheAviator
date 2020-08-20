// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { retry } from 'async';
import { PassThrough, Writable, Readable } from 'stream';
import webSocketStream from 'websocket-stream';;
import { BehaviorSubject } from 'rxjs';

import { Guid } from '@dolittle/rudiments';
import * as k8s from '@kubernetes/client-node';

export class NamespacedPod {
    private readonly _exec: k8s.Exec;
    private readonly _attach: k8s.Attach;
    private readonly _outputStream: BehaviorSubject<NodeJS.ReadWriteStream>;
    private readonly _serviceSelector: {[key: string]: string} | undefined;
    private _status: 'Starting' | 'Running' | 'Stopped' | 'Killed' | 'Paused';

    constructor(
        readonly runId: Guid,
        readonly namespace: string,
        readonly uniqueName: string,
        readonly friendlyName: string,
        readonly containerImage: string,
        readonly exposedPorts: readonly number[],
        config: k8s.KubeConfig,
        private readonly _coreApi: k8s.CoreV1Api,
        private readonly _pod: k8s.V1Pod,
        private readonly _service?: k8s.V1Service,
        private readonly _configMap?: k8s.V1ConfigMap) {
            this._status = 'Running';
            this._exec = new k8s.Exec(config);
            this._attach = new k8s.Attach(config);
            this._outputStream = new BehaviorSubject<NodeJS.ReadWriteStream>(new PassThrough());
            this._serviceSelector = { ...this._service?.spec?.selector};

    }

    get outputStream() { return this._outputStream; }

    get status() { return this._status; }

    exec(
        command: string | string[],
        stdout: Writable | null,
        stderr: Writable | null,
        stdin: Readable | null,
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
        if (this.status === 'Stopped') {
            await this._coreApi.createNamespacedPod(this.namespace, this._pod);
            await this.captureOutputFromContainer();
            this._status = 'Running';
        }
    }

    async stop() {
        if (this.status !== 'Stopped' && this.status !== 'Killed') {
            await this._coreApi.deleteNamespacedPod(this._pod.metadata?.name!, this.namespace);
            this._status = 'Stopped';
        }
    }
    async restart() {
        await this.stop();
        await this.start();
    }
    async kill() {
        await this.stop();
        if (this._service != null) await this._coreApi.deleteNamespacedService(this._service.metadata?.name!, this.namespace);
        if (this._configMap != null) await this._coreApi.deleteNamespacedConfigMap(this._configMap.metadata?.name!, this.namespace);
        this._status = 'Killed';
    }
    async pause() {
        if (this._service != null) {
            await this._coreApi.patchNamespacedService(
                this._service.metadata?.name!,
                this.namespace,
                {
                    spec: {
                        selector: {}
                    }
                });
            this._status = 'Paused';
        }
    }
    async resume() {
        if (this._service != null) {
            await this._coreApi.patchNamespacedService(
                this._service.metadata?.name!,
                this.namespace,
                {
                    spec: {
                        selector: this._serviceSelector
                    }
                });
        }
    }

    async captureOutputFromContainer() {
        await this.waitTillReady();
        this._outputStream.next(new PassThrough());
        const ws = await this._attach.attach(this.namespace, this.uniqueName, this.friendlyName, process.stdout, process.stderr, null, false);
        const stream = webSocketStream(ws as any);
        stream.setEncoding('utf8');
        stream.pipe(this.outputStream.value);
    }

    async waitTillReady() {
        try {
            await retry({ interval: 200 }, async (callback, results) => {
                const status = await this._coreApi.readNamespacedPodStatus(this._pod.metadata?.name!, this.namespace);
                const body = status.body;
                if (body.status?.phase !== 'Running') {
                    callback(new Error('Running'));
                } else {
                    callback(null);
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

}
