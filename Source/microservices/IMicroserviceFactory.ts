// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Microservice } from './index';
import { MicroserviceConfiguration } from './configuration';

/**
 * Defines a factory for Microservice.
 *
 * @export
 * @interface IMicroserviceFactory
 */
export interface IMicroserviceFactory {
    /**
     * Create a microservice.
     *
     * @param {string} workingDirectory
     * @param {MicroserviceConfiguration} configuration
     * @returns {Promise<Microservice>}
     */
    create(workingDirectory: string, configuration: MicroserviceConfiguration): Promise<Microservice>
}
