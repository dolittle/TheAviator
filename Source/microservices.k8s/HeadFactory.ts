// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IRunContext } from '@dolittle/aviator.k8s';
import { MicroserviceConfiguration, Platform, IHeadFactory, ConfigurationFiles } from '@dolittle/aviator.microservices';
import { Guid } from '@dolittle/rudiments';

import { MicroserviceComponentFactoryFor, Head } from './index';

export class HeadFactory extends MicroserviceComponentFactoryFor<Head> implements IHeadFactory {
    constructor() {
        super('head');
    }
    async create(id: Guid, runContext: IRunContext, configuration: MicroserviceConfiguration, configurationFiles: ConfigurationFiles): Promise<Head> {
        const volumeName = 'dolittle';
        const configName = this.getConfigMapName(id, volumeName);
        const labels = this.getLabels(runContext, configuration);
        const namespacedPod = await runContext.createPod(
            {
                apiVersion: 'v1',
                kind: 'Pod',
                metadata: {
                    name: this.getPodName(id),
                    labels
                },
                spec: {
                    containers: [
                        {
                            name: this.type,
                            image: this.getContainerImage(configuration.platform),
                            ports: [
                                {
                                    containerPort: MicroserviceConfiguration.headInteractionPort,
                                    name: 'api'
                                },
                                // {
                                //     containerPort: MicroserviceConfiguration.runtimePublicPort,
                                //     name: 'public'
                                // }
                            ],
                            volumeMounts: this.volumeMountsFromConfigurationFiles(volumeName, configurationFiles)
                        }
                    ],
                    volumes: [
                        {
                            name: volumeName,
                            configMap: {name: configName}
                        }
                    ]
                },
            },
            {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    name: this.getServiceName(id),
                    labels
                },
                spec: {
                    selector: labels,
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
                    labels
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
