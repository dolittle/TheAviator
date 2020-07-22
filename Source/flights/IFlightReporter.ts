// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Flight } from './index';

/**
 * Defines a system that reports the details of a Flight.
 *
 * @export
 * @interface IFlightReporter
 */
export interface IFlightReporter {

    /**
     * Observes a Flight.
     *
     * @param {Flight} flight
     */
    observe(flight: Flight): void;
}
