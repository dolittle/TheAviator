// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroserviceConfiguration } from '..';
import { Mount } from '../../containers';

export interface IConfigurationManager {
    generateForHead(configuration: MicroserviceConfiguration, workingDirectory: string): Mount[];
    generateForRuntime(configuration: MicroserviceConfiguration, workingDirectory: string): Mount[];
}


