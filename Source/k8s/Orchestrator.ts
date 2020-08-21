// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KubeConfig, CoreV1Api, AppsV1Api } from '@kubernetes/client-node';
import { Guid } from '@dolittle/rudiments';

import { IOrchestrator, IRunContext, IRunContexts, RunContext } from './index';


export class Orchestrator implements IOrchestrator {
    private readonly _config: KubeConfig;
    private readonly _coreApi: CoreV1Api;
    private readonly _appsApi: AppsV1Api;

    constructor(private readonly _runContexts: IRunContexts) {
        this._config = this._createConfig();
        this._coreApi = this._config.makeApiClient(CoreV1Api);
        this._appsApi = this._config.makeApiClient(AppsV1Api);
    }
    get runContexts() { return this._runContexts; }

    async createRun(namespace: string): Promise<IRunContext> {
        const runId = Guid.create();
        const runContext = new RunContext(runId, namespace, this._config, this._coreApi);
        this._runContexts.add(runContext);
        return runContext;
    }

    private _createConfig(): KubeConfig {
        const config = new KubeConfig();
        config.loadFromDefault();
        return config;
    }
}
