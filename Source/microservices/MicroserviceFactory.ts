// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as path from 'path';

import { Mount } from '../k8s';
import { Microservice, IMicroserviceFactory } from './';
import { MicroserviceConfiguration, IConfigurationManager } from './configuration';

/**
 * Represents an implementation of IMicroserviceFactory.
 *
 * @export
 * @class MicroserviceFactory
 * @implements {IMicroserviceFactory}
 */
export class MicroserviceFactory implements IMicroserviceFactory {

    constructor(
        private _configurationManager: IConfigurationManager) {
    }

    /** @inheritdoc */
    async create(workingDirectory: string, configuration: MicroserviceConfiguration): Promise<Microservice> {
        const eventStoreStorage = await this.configureContainer(
            'mongo',
            configuration.mongoHost,
            'dolittle/mongodb',
            'latest',
            [27017],
            [{
                host: path.join(workingDirectory, '_microservices', configuration.name, 'backup'),
                container: '/backup'
            }]
        );

        const head = await this.configureContainer(
            'head',
            configuration.head.host,
            `dolittle/integrationtests-head-${configuration.platform}`,
            '5.0.0-rc.3',
            [5000],
            []);

        const runtime = await this.configureContainer(
            'runtime',
            configuration.runtime.host,
            'dolittle/runtime',
            '5.0.1',
            [81, 9700, 50052, 50053],
            []);

        return new Microservice(configuration, {} as any, head, runtime, eventStoreStorage);
    }

    /** @inheritdoc */
    async configureContainer(
        name: string,
        uniqueName: string,
        image: string,
        tag: string,
        exposedPorts: number[],
        mounts: Mount[]): Promise<any> {

        const containerOptions = {
            name: uniqueName,
            friendlyName: name,
            image,
            tag,
            exposedPorts,
            mounts
        };
        return {};
    }
}
