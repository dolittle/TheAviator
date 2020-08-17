// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IRunContext } from '@dolittle/aviator.k8s';

import { Guid } from '@dolittle/rudiments';
import { MicroserviceConfiguration, ConfigurationFiles, MicroserviceComponent, IMicroserviceComponentFactoryFor } from './index';
import { ObjectID } from 'mongodb';

export abstract class MicroserviceComponentFactoryFor<T extends MicroserviceComponent> implements IMicroserviceComponentFactoryFor<T> {

    constructor(protected readonly type: string) {
    }

    abstract create (id: Guid, runContext: IRunContext, configuration: MicroserviceConfiguration, configurationFiles?: ConfigurationFiles): Promise<T>;

    protected getBaseName(id: Guid) {
        return `${id.toString()}-`;
    }
    protected getConfigMapName(id: Guid, configName: string) {
        return `${this.getBaseName(id)}${this.type}-${configName}`;
    }
    protected getServiceName(id: Guid) {
        return `${this.getBaseName(id)}${this.type}-service`;
    }
    protected getPodName(id: Guid) {
        return `${this.getBaseName(id)}${this.type}`;
    }
    protected getLabels(runContext: IRunContext, configuration: MicroserviceConfiguration) {
        return {
            runContext: runContext.id.toString(),
            microservice: configuration.identifier,
            type: this.type
        };
    }
    protected volumeMountsFromConfigurationFiles(configName: string, configurationFiles: ConfigurationFiles) {
        return configurationFiles.map(configFile => {
            return {
                mountPath: `${configurationFiles.rootPath}/${configFile.fileName}`,
                subPath: configFile.fileName,
                name: configName
            };
        });
    }
    protected configMapDataFromConfigurationFiles(configurationFiles: ConfigurationFiles) {
        const data: any = {};
        configurationFiles.forEach(config => {
            data[config.fileName] = config.content;
        });
        return data;
    }
}
