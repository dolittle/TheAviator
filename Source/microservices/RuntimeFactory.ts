// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IRunContext } from '@dolittle/aviator.k8s';

import { Runtime, MicroserviceConfiguration, Platform, IRuntimeFactory, ConfigurationFiles, MicroserviceComponentFactoryFor } from './index';

export class RuntimeFactory extends MicroserviceComponentFactoryFor<Runtime> implements IRuntimeFactory {
    constructor() {
        super('runtime');
    }
    async create(runContext: IRunContext, configuration: MicroserviceConfiguration, configurationFiles: ConfigurationFiles): Promise<Runtime> {
        const configName = this.getConfigMapName(runContext, configuration, 'dolittle');
        const labels = this.getLabels(runContext, configuration);
        const namespacedPod = await runContext.createPod(
            {
                apiVersion: 'v1',
                kind: 'Pod',
                metadata: {
                    name: this.getPodName(runContext, configuration),
                    labels
                },
                spec: {
                    containers: [
                        {
                            name: this.type,
                            image: this.getContainerImage(configuration.platform),
                            ports: [
                                {
                                    containerPort: MicroserviceConfiguration.runtimePublicPort,
                                    name: 'public'
                                },
                                {
                                    containerPort: MicroserviceConfiguration.runtimePrivatePort,
                                    name: 'private'
                                },
                                {
                                    containerPort: MicroserviceConfiguration.runtimeMetricsPort,
                                    name: 'metrics'
                                },
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
                    name: this.getServiceName(runContext, configuration),
                    labels
                },
                spec: {
                    selector: labels,
                    ports: [
                        {
                            port: MicroserviceConfiguration.runtimePublicPort,
                            name: 'public',
                            targetPort: 'public' as any
                        },
                        {
                            port: MicroserviceConfiguration.runtimePrivatePort,
                            name: 'private',
                            targetPort: 'private' as any
                        },
                        {
                            port: MicroserviceConfiguration.runtimeMetricsPort,
                            name: 'metrics',
                            targetPort: 'metrics' as any
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
        return new Runtime(namespacedPod, configuration);
    }

    private getContainerImage(platform: Platform): string {
        return `dolittle/runtime:${platform.runtimeVersion}`;
    }
}
