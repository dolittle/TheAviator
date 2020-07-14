// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Duration } from 'moment';

export class FlightSimulationOptions {
    duration!: Duration;
    warmUpPeriod!: Duration;
    coolOffPeriod!: Duration;
    maximumSimultaneousActors = 1;
    minimumIntervalForBehaviors = 1000;
    maximumIntervalForBehaviors = 10000;
}
