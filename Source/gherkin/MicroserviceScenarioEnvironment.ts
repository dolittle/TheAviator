// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fs from 'fs';
import path from 'path';
import { Microservice } from '@dolittle/aviator.microservices';

import { ISerializer } from '@dolittle/serialization.json';
import { Scenario, ScenarioEnvironment } from '@dolittle/testing.gherkin';
import { MicroserviceScenarioEnvironmentDefinition } from './index';

const eventStoreDumpFolderName = 'eventStore';
const containerOptionsFileExtension = '.json';

export type MicroserviceAction = (microservice: Microservice) => Promise<void>;
export type GetMicroserviceScenarioDestination = (scenario: Scenario, microservice: Microservice) => string;
export type GetMicroserviceDestination = (microservice: Microservice) => string;

export class MicroserviceScenarioEnvironment extends ScenarioEnvironment<MicroserviceScenarioEnvironmentDefinition> {

    constructor(
        definition: MicroserviceScenarioEnvironmentDefinition,
        readonly microservices: { [key: string]: Microservice },
        private readonly _serializer: ISerializer,
        private readonly _getMicroserviceScenarioDestination: GetMicroserviceScenarioDestination,
        private readonly _getMicroserviceDestination: GetMicroserviceDestination) {
            super(definition);
            this.writeConfigurationFiles();
    }

    async start(): Promise<void> {
        await this.forEachMicroservice(_ => _.start());
        await this.connectConsumersToProducers();
    }

    async stop(): Promise<void> {
        await this.disconnectConsumersFromProducers();
        await this.forEachMicroservice(_ => _.kill());
    }

    forEachMicroservice(action: MicroserviceAction): Promise<void[]> {
        const promises: Promise<void>[] = [];
        for (const microservice of Object.values(this.microservices)) {
            promises.push(action(microservice));
        }
        return Promise.all(promises);
    }

    async dumpEventStore(scenario: Scenario) {
        this.forEachMicroservice(async (microservice) => {
            const microserviceDestinationDirectory = this._getMicroserviceScenarioDestination(scenario, microservice);
            const destinationDirectory = path.join(microserviceDestinationDirectory, eventStoreDumpFolderName);
            await fs.promises.mkdir(destinationDirectory, { recursive: true });

            await microservice.eventStore.dump(destinationDirectory);
        });
    }

    private async connectConsumersToProducers() {
        for (const consumerName of Object.keys(this.definition.consumerToProducerMap)) {
            const consumer = this.microservices[consumerName];
            if (consumer) {
                for (const producerDefinition of this.definition.consumerToProducerMap[consumerName]) {
                    const producer = this.microservices[producerDefinition.name];
                    if (producer) {
                        await consumer.connectToProducer(producer);
                    }
                }
            }
        }
    }

    private async disconnectConsumersFromProducers() {
        for (const consumerName of Object.keys(this.definition.consumerToProducerMap)) {
            const consumer = this.microservices[consumerName];
            if (consumer) {
                for (const producerDefinition of this.definition.consumerToProducerMap[consumerName]) {
                    const producer = this.microservices[producerDefinition.name];
                    if (producer) {
                        await consumer.disconnectFromProducer(producer);
                    }
                }
            }
        }
    }

    private writeConfigurationFiles() {
        for (const microservice of Object.values(this.microservices)) {
            const microservicePath = this._getMicroserviceDestination(microservice);

            const writeOptionsFile = (something: any) => {
                const containerOptionsFile = path.join(microservicePath, `${something.options.friendlyName}${containerOptionsFileExtension}`);
                const configOutput = JSON.parse(JSON.stringify(something.options));

                configOutput.boundPorts = {};
                for (const [k, v] of something.boundPorts) {
                    configOutput.boundPorts[k] = v;
                }
                fs.writeFileSync(containerOptionsFile, this._serializer.toJSON(configOutput));
            };

            writeOptionsFile(microservice.head);
            writeOptionsFile(microservice.runtime);
            writeOptionsFile(microservice.eventStoreStorage);
        }
    }
}

export const emptyMicroserviceScenarioEnvironment = new MicroserviceScenarioEnvironment(
    {} as MicroserviceScenarioEnvironmentDefinition,
    {},
    {} as ISerializer,
    {} as GetMicroserviceScenarioDestination,
    {} as GetMicroserviceDestination);