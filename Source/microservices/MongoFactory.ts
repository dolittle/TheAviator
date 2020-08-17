// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IRunContext } from '@dolittle/aviator.k8s';

import { Mongo, MicroserviceConfiguration, Platform, IMongoFactory, MicroserviceComponentFactoryFor } from './index';
import { Guid } from '@dolittle/rudiments';

export class MongoFactory extends MicroserviceComponentFactoryFor<Mongo> implements IMongoFactory {
    constructor() {
        super('mongo');
    }
    async create(id: Guid, runContext: IRunContext, configuration: MicroserviceConfiguration): Promise<Mongo> {
        const labels = this.getLabels(runContext, configuration);
        const namespacedPod = await runContext.createPod(
            {
                apiVersion: 'v1',
                kind: 'Pod',
                metadata: {
                    name: this.getPodName(id, configuration),
                    labels
                },
                spec: {
                    containers: [
                        {
                            name: this.type,
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
                    name: this.getServiceName(id, configuration),
                    labels
                },
                spec: {
                    selector: labels,
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
