// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KubeConfig, CoreV1Api, AppsV1Api } from '@kubernetes/client-node';
import { Guid } from '@dolittle/rudiments';
import { K8sConfiguration, IOrchestrator, IRunContext, IRunContexts, RunContext } from './index';


export class Orchestrator implements IOrchestrator {
    private readonly _config: KubeConfig;
    private readonly _coreApi: CoreV1Api;
    private readonly _appsApi: AppsV1Api;

    constructor(private readonly _runContexts: IRunContexts, options?: K8sConfiguration) {
        this._config = this._createConfig(options);
        this._coreApi = this._config.makeApiClient(CoreV1Api);
        this._appsApi = this._config.makeApiClient(AppsV1Api);
        this._coreApi.listNamespacedPod('integration-tests')
            .then(res => {
                console.log(res.body);
            })
            .catch(reason => console.error(reason));

    }

    async createRun(): Promise<IRunContext> {
        const runId = Guid.create();
        const runContext = new RunContext(runId, this._config, this._coreApi, this._appsApi);
        this._runContexts.add(runContext);
        return runContext;
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
}