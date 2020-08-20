// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ISerializer } from '@dolittle/serialization.json';
import { ScenarioEnvironmentBuilder } from '@dolittle/testing.gherkin';
import { IRunContext } from '@dolittle/aviator.k8s';
import { IMicroserviceFactory, Microservice, Platform, MicroserviceConfiguration, IMicroserviceHostsProvider } from '@dolittle/aviator.microservices';

import { MicroserviceScenarioEnvironment, MicroserviceScenarioEnvironmentDefinition, GetMicroserviceScenarioDestination, GetMicroserviceDestination } from './index';
import { Guid } from '@dolittle/rudiments';

export class MicroserviceScenarioEnvironmentBuilder extends ScenarioEnvironmentBuilder<MicroserviceScenarioEnvironment, MicroserviceScenarioEnvironmentDefinition> {
    constructor(
        private readonly _runContext: IRunContext,
        private readonly _workingDirectory: string,
        private readonly _microserviceFactory: IMicroserviceFactory,
        private readonly _microserviceHostsProvider: IMicroserviceHostsProvider,
        private readonly _serializer: ISerializer,
        private readonly _getMicroserviceScenarioDestination: GetMicroserviceScenarioDestination,
        private readonly _getMicroserviceDestination: GetMicroserviceDestination) {
            super();
    }

    async forPlatformAndDefinition(platform: Platform, definition: MicroserviceScenarioEnvironmentDefinition): Promise<MicroserviceScenarioEnvironmentBuilder> {
        this.definition = definition;
        const microservices: { [key: string]: Microservice } = {};

        const configurations = this.prepareMicroserviceConfigurations(platform, definition);
        for (const { configuration, runningId } of configurations) {
            const microservice = await this._microserviceFactory.create(runningId, this._workingDirectory, configuration, this._runContext);
            microservices[configuration.name] = microservice;
        }

        this.environment = new MicroserviceScenarioEnvironment(definition, microservices, this._serializer, this._getMicroserviceScenarioDestination, this._getMicroserviceDestination);
        return this;
    }


    private prepareMicroserviceConfigurations(platform: Platform, definition: MicroserviceScenarioEnvironmentDefinition): {configuration: MicroserviceConfiguration, runningId: Guid}[] {
        const configurationsAndIds: {configuration: MicroserviceConfiguration, runningId: Guid}[] = [];
        for (const microserviceDefinition of definition.microservices) {
            const configuration = MicroserviceConfiguration.from(platform, microserviceDefinition, this._microserviceHostsProvider);
            const runningId = Guid.create();
            configuration.setHostsFor(runningId);
            configurationsAndIds.push({
                configuration,
                runningId
            });
        }

        const configurations = configurationsAndIds.map(_ => _.configuration);
        for (const consumerDefinition of definition.microservices) {
            const consumer = configurations.find(_ => _.name === consumerDefinition.name);
            if (consumer) {
                for (const producerDefinition of consumerDefinition.producers) {
                    const producer = configurations.find(_ => _.name === producerDefinition.name);
                    if (producer) {
                        consumer.addProducer(producer);
                    }
                }
            }
        }

        return configurationsAndIds;
    }
}
