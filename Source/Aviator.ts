// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/rudiments';
import { ISerializer } from './index';
import { Serializer } from './index';

import { IMicroserviceFactory, MicroserviceFactory, IConfigurationManager, ConfigurationManager, Platform } from './microservices';

import {
    FlightRecorder,
    FlightInspection,
    Flight,
    PreflightPlanner,
    FlightPaths,
    FlightReporter,
    FlightSimulationOptions,
    IFlightSimulationProcedure,
    FlightSimulation,
    FlightSimulator
    IScenarioConverter,
    IScenarioResultConverter,
    ScenarioConverter,
    ISpecificationConverter,
    SpecificationConverter,
    ScenarioResultConverter,
    SpecificationResultConverter,
    ISpecificationResultConverter,
    FlightSimulationPlanner
} from './flights';

import {
    ScenarioContext,
    ScenarioFor,
    ISpecificationBuilder,
    ISpecificationRunner,
    SpecificationBuilder,
    SpecificationRunner,
    ScenarioEnvironmentBuilder
} from './gherkin';
import { Platform } from './microservices/Platform';

export class Aviator {
    readonly serializer: ISerializer;
    // readonly containerFactory: IContainerEnvironment;
    readonly microserviceFactory: IMicroserviceFactory;
    readonly configurationManager: IConfigurationManager;
    readonly specificationBuilder: ISpecificationBuilder;
    readonly specificationRunner: ISpecificationRunner;
    readonly scenarioConverter: IScenarioConverter;
    readonly scenarioResultConverter: IScenarioResultConverter;
    readonly specificationConverter: ISpecificationConverter;
    readonly specificationResultConverter: ISpecificationResultConverter;

    private constructor(public readonly platform: Platform) {
        this.serializer = new Serializer();
        // this.containerFactory = new ContainerEnvironment();
        this.configurationManager = new ConfigurationManager();
        this.specificationBuilder = new SpecificationBuilder();
        this.specificationRunner = new SpecificationRunner();
        this.microserviceFactory = new MicroserviceFactory(this.configurationManager);
        this.specificationConverter = new SpecificationConverter();
        this.scenarioConverter = new ScenarioConverter(this.specificationConverter);
        this.specificationResultConverter = new SpecificationResultConverter(this.specificationConverter);
        this.scenarioResultConverter = new ScenarioResultConverter(this.specificationResultConverter);
    }

    static getFor(platform: Platform) {
        return new Aviator(platform);
    }

    async performPreflightChecklist(...scenarios: Constructor<ScenarioFor<ScenarioContext>>[]): Promise<Flight> {
        const flightPaths = new FlightPaths();
        const scenarioEnvironmentBuilder = new ScenarioEnvironmentBuilder(flightPaths, this.microserviceFactory, this.serializer);
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

    async startSimulation<T extends ScenarioContext>(options: FlightSimulationOptions, procedure: IFlightSimulationProcedure<T>): Promise<FlightSimulation> {
        const flightPaths = new FlightPaths();
        const scenarioEnvironmentBuilder = new ScenarioEnvironmentBuilder(flightPaths, this.microserviceFactory, this.serializer);
        const planner = new FlightSimulationPlanner(scenarioEnvironmentBuilder, this.specificationBuilder);
        const plan = await planner.createPlanFor(this.platform, options, procedure);
        const simulator = new FlightSimulator(this.specificationRunner);
        const simulation = simulator.run(plan);
        return simulation;
    }
}
