// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IRunContext } from '@dolittle/aviator.k8s';

import { MicroserviceConfiguration, ConfigurationFiles, MicroserviceComponent, IMicroserviceComponentFactoryFor } from './index';

export abstract class MicroserviceComponentFactoryFor<T extends MicroserviceComponent> implements IMicroserviceComponentFactoryFor<T> {

    constructor(protected readonly type: string) {
    }

    abstract create (runContext: IRunContext, configuration: MicroserviceConfiguration, configurationFiles?: ConfigurationFiles): Promise<T>;

    protected getBaseName(runContext: IRunContext, configuration: MicroserviceConfiguration) {
        return `${runContext.id.toString()}-${configuration.identifier}-`;
    }
    protected getConfigMapName(runContext: IRunContext, configuration: MicroserviceConfiguration, configName: string) {
        return `${this.getBaseName(runContext, configuration)}${this.type}-${configName}`;
    }
    protected getServiceName(runContext: IRunContext, configuration: MicroserviceConfiguration) {
        return `${this.getBaseName(runContext, configuration)}${this.type}-service`;
    }
    protected getPodName(runContext: IRunContext, configuration: MicroserviceConfiguration) {
        return `${this.getBaseName(runContext, configuration)}${this.type}`;
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
