// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Mount } from '../../k8s';
import { MicroserviceConfiguration } from './';

/**
 * Defines a system that can manage configurations.
 *
 * @export
 * @interface IConfigurationManager
 */
export interface IConfigurationManager {

    /**
     * Generates the configuration files for a Head.
     *
     * @param {MicroserviceConfiguration} configuration
     * @param {string} workingDirectory
     * @returns {Mount[]}
     */
    generateForHead(configuration: MicroserviceConfiguration, workingDirectory: string): Mount[]

    /**
     * Generates the configuration files for a Runtime.
     *
     * @param {MicroserviceConfiguration} configuration
     * @param {string} workingDirectory
     * @returns {Mount[]}
     */
    generateForRuntime(configuration: MicroserviceConfiguration, workingDirectory: string): Mount[]
}


