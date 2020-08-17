// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IRunContext } from '@dolittle/aviator.k8s';

import {
    Microservice,
    IMicroserviceFactory,
    IHeadFactory,
    IRuntimeFactory,
    IConfigurationManager,
    MicroserviceConfiguration,
    IMongoFactory
} from './index';
import { Guid } from '@dolittle/rudiments';

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
        private readonly _headFactory: IHeadFactory,
        private readonly _runtimeFactory: IRuntimeFactory,
        private readonly _mongoFactory: IMongoFactory) {
    }

    /** @inheritdoc */
    async create(workingDirectory: string, configuration: MicroserviceConfiguration, runContext: IRunContext): Promise<Microservice> {
        const id = Guid.create();
        const head = await this._headFactory.create(id, runContext, configuration, this._configurationManager.generateForHead(configuration, workingDirectory));
        const runtime = await this._runtimeFactory.create(id, runContext, configuration, this._configurationManager.generateForRuntime(configuration, workingDirectory));
        const mongo = await this._mongoFactory.create(id, runContext, configuration);
        return new Microservice(
            runContext,
            configuration,
            head,
            runtime,
            mongo);
    }
}
