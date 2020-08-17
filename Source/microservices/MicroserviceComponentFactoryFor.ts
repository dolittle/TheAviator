// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IRunContext } from '@dolittle/aviator.k8s';
import { MicroserviceConfiguration, ConfigurationFiles, MicroserviceComponent, IMicroserviceComponentFactoryFor } from './index';

export abstract class MicroserviceComponentFactoryFor<T extends MicroserviceComponent> implements IMicroserviceComponentFactoryFor<T> {
    abstract create (runContext: IRunContext, configuration: MicroserviceConfiguration, configurationFiles: ConfigurationFiles): Promise<T>;

    getBaseName(runContext: IRunContext, configuration: MicroserviceConfiguration) {
        return `${runContext.id.toString()}-${configuration.identifier}-`;
    }
    getLabels(runContext: IRunContext, configuration: MicroserviceConfiguration) {
        return {
            runContext: runContext.id.toString(),
            microservice: configuration.identifier
        };
    }
    volumeMountsFromConfigurationFiles(configName: string, configurationFiles: ConfigurationFiles) {
        return configurationFiles.map(configFile => {
            return {
                mountPath: `${configurationFiles.rootPath}/${configFile.fileName}`,
                subPath: configFile.fileName,
                name: configName
            };
        });
    }
    configMapDataFromConfigurationFiles(configurationFiles: ConfigurationFiles) {
        const data: any = {};
        configurationFiles.forEach(config => {
            data[config.fileName] = config.content;
        });
        return data;
    }
}
