// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IRunContext } from '@dolittle/aviator.k8s';
import { Mongo, MicroserviceConfiguration, Platform, IMongoFactory, ConfigurationFiles, MicroserviceComponentFactoryFor } from './index';

export class MongoFactory extends MicroserviceComponentFactoryFor<Mongo> implements IMongoFactory {
    async create(runContext: IRunContext, configuration: MicroserviceConfiguration, configurationFiles: ConfigurationFiles): Promise<Mongo> {
        const namespacedPod = await runContext.createPod(
            {
                apiVersion: 'v1',
                kind: 'Pod',
                metadata: {
                    name: `${this.getBaseName(runContext, configuration)}mongo`,
                    labels: this.getLabels(runContext, configuration)
                },
                spec: {
                    containers: [
                        {
                            name: 'mongo',
                            image: this.getContainerImage(configuration.platform),
                            ports: [
                                {
                                    containerPort: MicroserviceConfiguration.mongoPort,
                                    name: 'mongo'
                                }
                            ]
                        }
                    ]
                }
            },
            {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    name: `${this.getBaseName(runContext, configuration)}mongo-service`,
                    labels: this.getLabels(runContext, configuration)
                },
                spec: {
                    selector: this.getLabels(runContext, configuration),
                    ports: [
                        {
                            port: MicroserviceConfiguration.mongoPort,
                            name: 'mongo',
                            targetPort: 'mongo' as any
                        }
                    ],
                    clusterIP: 'None'
                }
            }
        );
        return new Mongo(namespacedPod, configuration);
    }

    private getContainerImage(platform: Platform): string {
        return `dolittle/mongodb:${platform.runtimeVersion}`;
    }
}
