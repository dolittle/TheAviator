// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Microservice } from '@dolittle/aviator.microservices';
import { SubjectContent } from '@dolittle/testing.gherkin';

export class MicroserviceScenarioSubjectContent extends SubjectContent {
    constructor(readonly microservice: Microservice) {
        super();
    }
}