// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KubeConfig, CoreV1Api, AppsV1Api, V1ConfigMap, V1Pod, V1Service } from '@kubernetes/client-node';
import { Guid } from '@dolittle/rudiments';

import { IRunContext, NamespacedPod } from './index';


export class RunContext implements IRunContext {
    private readonly _pods: NamespacedPod[];
    private readonly _namespace: string;
    constructor(
        readonly id: Guid,
        private readonly _config: KubeConfig,
        private readonly _coreApi: CoreV1Api,
        private readonly _appsApi: AppsV1Api) {
        this._pods = [];
        this._namespace = this._config.contexts[0].namespace!;
    }
    get pods(): NamespacedPod[] { return this._pods; };

    start(): Promise<void> {
        const x = {metadata: {}} as V1ConfigMap;
        return this.onAllPods(pod => pod.start());
    }
    restart(): Promise<void> {
        return this.onAllPods(pod => pod.restart());
    }
    kill(): Promise<void> {
        return this.onAllPods(pod => pod.kill());
    }
    async createPod(pod: V1Pod, service?: V1Service, configMap?: V1ConfigMap): Promise<NamespacedPod> {
        if (service != null) await this._coreApi.createNamespacedService(this._namespace, service);
        if (configMap != null) await this._coreApi.createNamespacedConfigMap(this._namespace, configMap);

        await this._coreApi.createNamespacedPod(
            this._namespace,
            pod
        );
        return new NamespacedPod(
            this.id,
            this._namespace,
            pod.metadata?.name!,
            pod.spec?.containers[0].name!,
            pod.spec?.containers[0].image!,
            this._config);
    }
    startPod(pod: NamespacedPod): Promise<void> {
        return pod.start();
    }
    stopPod(pod: NamespacedPod): Promise<void> {
        return pod.stop();
    }
    restartPod(pod: NamespacedPod): Promise<void> {
        return pod.restart();
    }
    killPod(pod: NamespacedPod): Promise<void> {
        return pod.kill();
    }
    async clear(): Promise<void> {
        await this.onAllPods(pod => pod.kill());
        this._pods.length = 0;
    }

    private async onAllPods(action: (pod: NamespacedPod) => void | Promise<void>) {
        for (const pod of this.pods) {
            await action(pod);
        }
    }
}
