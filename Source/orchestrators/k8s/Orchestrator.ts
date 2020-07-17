// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import k8s, {  KubeConfig, Config } from '@kubernetes/client-node';
import { Guid } from '@dolittle/rudiments';
import { IOrchestrator, IRunContext } from '../index';

export class Orchestrator implements IOrchestrator {
    private readonly _config: KubeConfig;

    private constructor() {
        this._config = this._createConfig();
        this._config.makeApiClient(k8s.CoreV1Api);

    }
    createPod(runId: Guid): string {
        throw new Error('Method not implemented.');
    }
    createRun(): IRunContext {
        throw new Error('Method not implemented.');
    }

    private _createConfig(): KubeConfig {
        const config = new k8s.KubeConfig();
        config.loadFromOptions({});
        return config;
    }
}