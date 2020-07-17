// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export * as Banner from './Banner';

export * as Orchestrators from './orchestrators';
export * as EventStores from './eventStores';
export * as Flights from './flights';
export * as Gherkin from './gherkin';
export * as Microservices from './microservices';
export * from './Aviator';

export const platforms = {
    dotnet: 'dotnet',
    javascript: 'javascript'
};
