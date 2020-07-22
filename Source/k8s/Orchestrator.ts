// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KubeConfig, CoreV1Api, AppsV1Api, V1Pod } from '@kubernetes/client-node';
import { Guid } from '@dolittle/rudiments';
import { K8sConfiguration, IOrchestrator, IRunContext, IPodFactory } from './index';


export class Orchestrator implements IOrchestrator {
    private readonly _config: KubeConfig;
    private readonly _coreApi: CoreV1Api;
    private readonly _appsApi: AppsV1Api;

    constructor(readonly private _podFactory: IPodFactory, options?: K8sConfiguration) {
        this._config = this._createConfig(options);
        this._coreApi = this._config.makeApiClient(CoreV1Api);
        this._appsApi = this._config.makeApiClient(AppsV1Api);
        this._coreApi.listNamespacedPod('integration-tests')
            .then(res => {
                console.log(res.body);
            })
            .catch(reason => console.error(reason));

    }

    async createPod(runId: Guid): Promise<void> {
        await this._coreApi.createNamespacedPod(
            'integration-tests',
            new V1Pod());
    }
    async createRun(): Promise<IRunContext> {
        throw new Error('Method not implemented.');
    }

    private _createConfig(options?: K8sConfiguration): KubeConfig {
        const config = new KubeConfig();
        if (options == null) {
            config.loadFromDefault();
        } else {
            config.loadFromOptions({
                contexts: [options.context],
                users: [options.user],
                clusters: [options.cluster],
                currentContext: options.cluster.name
            });
        }
        return config;
    }

    private _getPod(): V1Pod {
        const pod = new V1Pod();
        pod.apiVersion = 'v1';
        pod.spec = {
            containers: [
                {
                    name: 
                }
            ], 
        }
        return pod;
    }
}