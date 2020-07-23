// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as path from 'path';

import { Mount, IRunContext, IPodFactory } from '@dolittle/aviator.k8s';
import { Guid } from '@dolittle/rudiments';

import { MicroserviceConfiguration, IConfigurationManager, RuntimeConfiguration } from './configuration';
import { Microservice, IMicroserviceFactory, Head, Runtime } from './index';
import { Mongo } from './Mongo';

/**
 * Represents an implementation of IMicroserviceFactory.
 *
 * @export
 * @class MicroserviceFactory
 * @implements {IMicroserviceFactory}
 */
export class MicroserviceFactory implements IMicroserviceFactory {

    constructor(
        private readonly _configurationManager: IConfigurationManager,
        private readonly _podFactory: IPodFactory) {
    }

    /** @inheritdoc */
    async create(workingDirectory: string, configuration: MicroserviceConfiguration, runContext: IRunContext): Promise<Microservice> {
        const eventStoreStoragePod = await runContext.addPod(this.createEventStoreStoragePod(workingDirectory, configuration, runContext.id));
        const headPod = await runContext.addPod(this.createHeadPod(workingDirectory, configuration, runContext.id));
        const runtimePod = await runContext.addPod(this.createRuntimePod(workingDirectory, configuration, runContext.id));


        return new Microservice(
            runContext,
            configuration,
            new Head(headPod.containerImage, headPod.containerImageTag, headPod, configuration.head),
            new Runtime(runtimePod.containerImage, runtimePod.containerImageTag, runtimePod, configuration.runtime),
            new Mongo(eventStoreStoragePod.containerImage, eventStoreStoragePod.containerImageTag, eventStoreStoragePod, configuration.mongoHost));
    }

    private createEventStoreStoragePod(workingDirectory: string, configuration: MicroserviceConfiguration, runId: Guid) {
        return this._podFactory.create(
            runId,
            'mongo',
            configuration.mongoHost,
            'dolittle/mongodb',
            'latest',
            [27017],
            [
                {
                    host: path.join(workingDirectory, '_microservices', configuration.name, 'backup'),
                    container: '/backup'
                }
            ]);
    }
    private createHeadPod(workingDirectory: string, configuration: MicroserviceConfiguration, runId: Guid) {
        return this._podFactory.create(
            runId,
            'head',
            configuration.head.host,
            `dolittle/integrationtests-head-${configuration.platform}`,
            '5.0.0-rc.3',
            [5000],
            this._configurationManager.generateForHead(configuration, workingDirectory));
    }

    private createRuntimePod(workingDirectory: string, configuration: MicroserviceConfiguration, runId: Guid) {
        return this._podFactory.create(
            runId,
            'runtime',
            configuration.runtime.host,
            'dolittle/runtime',
            '5.0.1',
            [81, 9700, 50052, 50053],
            this._configurationManager.generateForRuntime(configuration, workingDirectory));
    }
}
