// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IRunContext } from '@dolittle/aviator.k8s';
import { Guid } from '@dolittle/rudiments';

import { Microservice, MicroserviceConfiguration } from './index';

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
     * @param {IRunContexts} runContext
     * @returns {Promise<Microservice>}
     */
    create(runningId: Guid, workingDirectory: string, configuration: MicroserviceConfiguration, runContext: IRunContext): Promise<Microservice>
}
