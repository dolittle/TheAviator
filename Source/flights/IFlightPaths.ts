// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Scenario, ScenarioEnvironmentDefinition } from '../gherkin';

import { Microservice } from '../microservices';

/**
 * Defines a system for maintaining paths for a flight.
 */
export interface IFlightPaths {
    readonly base: string;
    readonly global: string;

    /**
     * Get Path for a {ScenarioContext}
     * @param {Scenario} scenario Scenario with context to get for.
     */
    forScenarioContext(scenario: Scenario): string;

    /**
     * Get Path for a {Scenario}
     * @param {Scenario} scenario Scenario to get for.
     */
    forScenario(scenario: Scenario): string;

    /**
     * Get Path for a {Microservice} used in a {Scenario}
     * @param {Microservice} microservice Microservice to get for.
     */
    forMicroservice(microservice: Microservice): string;

    /**
     * Get Path for a {Microservice} used in a {Scenario}
     * @param {Scenario} scenario Scenario to get for.
     * @param {Microservice} microservice Microservice to get for.
     */
    forMicroserviceInScenario(scenario: Scenario, microservice: Microservice): string;

    /**
     * Get Path for a {Microservice} used in a {ScenarioContext}
     * @param {Scenario} scenario Scenario to get for.
     * @param {Microservice} microservice Microservice to get for.
     */
    forMicroserviceInContext(scenario: Scenario, microservice: Microservice): string;
}
