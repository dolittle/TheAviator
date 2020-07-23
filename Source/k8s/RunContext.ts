// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KubeConfig, CoreV1Api, AppsV1Api, V1Pod } from '@kubernetes/client-node';
import { Guid } from '@dolittle/rudiments';
import { IRunContext, IPod, Pod, Mount } from './index';


export class RunContext implements IRunContext {
    private readonly _pods: IPod[];
    constructor(
        readonly id: Guid,
        private readonly _config: KubeConfig,
        private readonly _coreApi: CoreV1Api,
        private readonly _appsApi: AppsV1Api) {
        this._pods = [];
    }
    get pods(): IPod[] { return this._pods; };

    start(): Promise<void> {
        return this.onAllPods(pod => pod.start());
    }
    restart(): Promise<void> {
        return this.onAllPods(pod => pod.restart());
    }
    kill(): Promise<void> {
        return this.onAllPods(pod => pod.kill());
    }
    async addPod(pod: V1Pod, name: string, imageTag: string, mounts: Mount[], exposedPorts: number[]): Promise<IPod> {
        await this._coreApi.createNamespacedPod(
            this._config.contexts[0].namespace!,
            pod
        );
        return new Pod(this.id, pod.metadata?.name!, name, pod.spec?.containers[0].image!, imageTag, mounts, exposedPorts, pod.spec?.hostname!, this._config, this._config.contexts[0].namespace!);
    }
    startPod(pod: IPod): Promise<void> {
        return pod.start();
    }
    stopPod(pod: IPod): Promise<void> {
        return pod.stop();
    }
    restartPod(pod: IPod): Promise<void> {
        return pod.restart();
    }
    killPod(pod: IPod): Promise<void> {
        return pod.kill();
    }
    async clear(): Promise<void> {
        await this.onAllPods(pod => pod.kill());
        this._pods.length = 0;
    }

    private async onAllPods(action: (pod: IPod) => void | Promise<void>) {
        for (const pod of this.pods) {
            await action(pod);
        }
    }
}
