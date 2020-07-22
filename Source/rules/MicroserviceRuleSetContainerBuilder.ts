// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Microservice } from '@dolittle/aviator.microservices';
import { ScenarioRuleSetContainerBuilder } from '@dolittle/testing.gherkin';
import { MicroserviceScenarioSubjectContent } from './index';

/**
 * Represents a rule set container builder for a microservice.
 *
 * @export
 * @class StreamProcessorRuleSetContainerBuilder
 * @extends {ScenarioRuleSetContainerBuilder}
 */
export class MicroserviceRuleSetContainerBuilder extends ScenarioRuleSetContainerBuilder<MicroserviceScenarioSubjectContent> {
    constructor(private readonly _microservice: Microservice) {
        super(new MicroserviceScenarioSubjectContent(_microservice));
    }
}
