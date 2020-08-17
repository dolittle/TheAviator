// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IRunContext } from '@dolittle/aviator.k8s';
import { Head, MicroserviceConfiguration, Platform, IHeadFactory, ConfigurationFiles, MicroserviceComponentFactoryFor } from './index';

export class HeadFactory extends MicroserviceComponentFactoryFor<Head> implements IHeadFactory {
    async create(runContext: IRunContext, configuration: MicroserviceConfiguration, configurationFiles: ConfigurationFiles): Promise<Head> {
        const configName = `${this.getBaseName(runContext, configuration)}head-dolittle`;
        const namespacedPod = await runContext.createPod(
            {
                apiVersion: 'v1',
                kind: 'Pod',
                metadata: {
                    name: `${this.getBaseName(runContext, configuration)}head`,
                    labels: {
                        runContext: runContext.id.toString(),
                        microservice: configuration.identifier
                    }
                },
                spec: {
                    containers: [
                        {
                            name: 'head',
                            image: this.getContainerImage(configuration.platform),
                            ports: [
                                {
                                    containerPort: MicroserviceConfiguration.headInteractionPort,
                                    name: 'api'
                                },
                                {
                                    containerPort: MicroserviceConfiguration.runtimePublicPort,
                                    name: 'public'
                                }
                            ],
                            volumeMounts: this.volumeMountsFromConfigurationFiles(configName, configurationFiles)
                        }
                    ]
                }
            },
            {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    name: `${this.getBaseName(runContext, configuration)}head-service`,
                    labels: this.getLabels(runContext, configuration)
                },
                spec: {
                    selector: this.getLabels(runContext, configuration),
                    ports: [
                        {
                            port: MicroserviceConfiguration.headInteractionPort,
                            name: 'api',
                            targetPort: 'api' as any
                        }
                    ]
                }
            },
            {
                apiVersion: 'v1',
                kind: 'ConfigMap',
                metadata: {
                    name: configName,
                    labels: this.getLabels(runContext, configuration)
                },
                data: this.configMapDataFromConfigurationFiles(configurationFiles)
            }
        );
        return new Head(namespacedPod, configuration);
    }

    private getContainerImage(platform: Platform): string {
        return `dolittle/integrationtests-head-${platform.language}:${platform.headVersion}`;
    }
}
