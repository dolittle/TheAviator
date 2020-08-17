// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { RuleSetContainerEvaluation, BrokenRule } from '@dolittle/rules';
import { Microservice, IMicroserviceActions, Head, Runtime, Mongo } from '@dolittle/aviator.microservices';
import { MicroserviceRuleSetContainerBuilder, EventLogRuleSetContainerBuilder, StreamProcessorRuleSetContainerBuilder, StreamsRuleSetContainerBuilder } from '@dolittle/aviator.rules';

export class MicroserviceInContext {
    readonly microservice: Microservice;
    readonly event_log: EventLogRuleSetContainerBuilder;
    readonly stream_processors: StreamProcessorRuleSetContainerBuilder;
    readonly streams: StreamsRuleSetContainerBuilder;

    constructor(microservice: Microservice) {
        this.microservice = microservice;
        this.event_log = new EventLogRuleSetContainerBuilder(this.microservice);
        this.stream_processors = new StreamProcessorRuleSetContainerBuilder(this.microservice);
        this.streams = new StreamsRuleSetContainerBuilder(this.microservice);
    }

    get head(): Head {
        return this.microservice.head;
    }

    get runtime(): Runtime {
        return this.microservice.runtime;
    }

    get eventStoreStorage(): Mongo {
        return this.microservice.eventStoreStorage;
    }

    get actions(): IMicroserviceActions {
        return this.microservice.actions;
    }

    get ruleSetContainerBuilders(): MicroserviceRuleSetContainerBuilder[] {
        return [
            this.event_log,
            this.stream_processors,
            this.streams
        ];
    }

    async evaluate(): Promise<BrokenRule[]> {
        let brokenRules: BrokenRule[] = [];

        brokenRules = brokenRules.concat(await this.evaluateAndGetBrokenRules(this.event_log));
        brokenRules = brokenRules.concat(await this.evaluateAndGetBrokenRules(this.stream_processors));
        brokenRules = brokenRules.concat(await this.evaluateAndGetBrokenRules(this.streams));

        return brokenRules;
    }

    private async evaluateAndGetBrokenRules(ruleSetContainerBuilder: MicroserviceRuleSetContainerBuilder | undefined) {
        if (!ruleSetContainerBuilder) {
            return [];
        }
        const ruleSetContainer = ruleSetContainerBuilder.build();
        const evaluation = new RuleSetContainerEvaluation(ruleSetContainer);
        await evaluation.evaluate(this);
        return evaluation.brokenRules;
    }
}
