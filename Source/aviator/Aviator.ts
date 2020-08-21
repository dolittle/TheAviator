// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/rudiments';

import {
    IMicroserviceFactory,
    MicroserviceFactory,
    IConfigurationManager,
    ConfigurationManager,
    Platform,
    IHeadFactory,
    IRuntimeFactory,
    IMongoFactory
} from '@dolittle/aviator.microservices';

import {
    HeadFactory,
    RuntimeFactory,
    MongoFactory,
    MicroserviceHostsProvider
} from '@dolittle/aviator.microservices.k8s';

import {
    FlightRecorder,
    FlightInspection,
    Flight,
    PreflightPlanner,
    FlightPaths,
    FlightReporter
} from '@dolittle/aviator.flights';

import {
    ISpecificationBuilder,
    IScenarioConverter,
    ISpecificationRunner,
    IScenarioResultConverter,
    ISpecificationConverter,
    ISpecificationResultConverter,
    SpecificationBuilder,
    SpecificationRunner,
    SpecificationConverter,
    ScenarioConverter,
    SpecificationResultConverter,
    ScenarioResultConverter,
    ScenarioFor
} from '@dolittle/testing.gherkin';

import {
    ISerializer,
    Serializer
} from '@dolittle/serialization.json';

import {
    MicroserviceScenarioContext,
    MicroserviceScenarioEnvironmentBuilder
} from '@dolittle/aviator.gherkin';

import {
    IRunContext,
    IOrchestrator,
    Orchestrator,
    IRunContexts,
    RunContexts
} from '@dolittle/aviator.k8s';
import { AviatorConfiguration } from './index';

export class Aviator {
    readonly runContexts: IRunContexts;
    readonly orchestrator: IOrchestrator;
    readonly serializer: ISerializer;
    readonly headFactory: IHeadFactory;
    readonly runtimeFactory: IRuntimeFactory;
    readonly mongoFactory: IMongoFactory;
    readonly microserviceFactory: IMicroserviceFactory;
    readonly configurationManager: IConfigurationManager;
    readonly specificationBuilder: ISpecificationBuilder;
    readonly specificationRunner: ISpecificationRunner;
    readonly scenarioConverter: IScenarioConverter;
    readonly scenarioResultConverter: IScenarioResultConverter;
    readonly specificationConverter: ISpecificationConverter;
    readonly specificationResultConverter: ISpecificationResultConverter;

    private constructor(readonly platform: Platform, readonly configuration: AviatorConfiguration) {
        this.runContexts = new RunContexts();
        this.orchestrator = new Orchestrator(this.runContexts);
        this.serializer = new Serializer();
        this.headFactory = new HeadFactory();
        this.runtimeFactory = new RuntimeFactory();
        this.mongoFactory = new MongoFactory();
        this.configurationManager = new ConfigurationManager();
        this.specificationBuilder = new SpecificationBuilder();
        this.specificationRunner = new SpecificationRunner();
        this.microserviceFactory = new MicroserviceFactory(this.configurationManager, this.headFactory, this.runtimeFactory, this.mongoFactory);
        this.specificationConverter = new SpecificationConverter();
        this.scenarioConverter = new ScenarioConverter(this.specificationConverter);
        this.specificationResultConverter = new SpecificationResultConverter(this.specificationConverter);
        this.scenarioResultConverter = new ScenarioResultConverter(this.specificationResultConverter);
    }

    static getFor(platform: Platform, configuration: AviatorConfiguration) {
        return new Aviator(platform, configuration);
    }

    async performPreflightChecklist(...scenarios: Constructor<ScenarioFor<MicroserviceScenarioContext>>[]): Promise<Flight> {
        const runContext = await this.orchestrator.createRun(this.configuration.namespace);
        const flight = await this.performPreflightChecklistInContext(runContext, ...scenarios);
        return flight;
    }
    async performPreflightChecklistInContext(runContext: IRunContext, ...scenarios: Constructor<ScenarioFor<MicroserviceScenarioContext>>[]): Promise<Flight> {
        const flightPaths = new FlightPaths();
        const scenarioEnvironmentBuilder = new MicroserviceScenarioEnvironmentBuilder(
            runContext,
            flightPaths.base,
            this.microserviceFactory,
            new MicroserviceHostsProvider(),
            this.serializer,
            (scenario, microservice) => flightPaths.forMicroserviceInScenario(scenario,  microservice),
            microservice => flightPaths.forMicroservice(microservice));
        const flightPlanner = new PreflightPlanner(scenarioEnvironmentBuilder, this.specificationBuilder);
        const checklist = await flightPlanner.createChecklistFor(this.platform, ...scenarios);
        const flight = new Flight(this.platform, flightPaths, checklist);
        const reporter = new FlightReporter();
        flight.setRecorder(new FlightRecorder(flight, this.scenarioConverter, this.scenarioResultConverter, this.serializer));
        reporter.observe(flight);
        const flightControl = new FlightInspection(flight, this.specificationRunner);
        await flightControl.runPreflightCheck();
        return flight;
    }
}
