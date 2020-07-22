// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ScenarioContext } from '@dolittle/testing.gherkin';
import { MicroserviceInContext, MicroserviceScenarioEnvironment } from './index';

export abstract class MicroserviceScenarioContext extends ScenarioContext {
    readonly microservices: { [key: string]: MicroserviceInContext } = {};

    async establish(environment: MicroserviceScenarioEnvironment): Promise<void> {
        super.establish(environment);
        Object.entries(environment.microservices)
            .forEach(([microserviceName, microservice]) => this.microservices[microserviceName] = new MicroserviceInContext(microservice));
    }
}
