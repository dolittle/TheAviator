// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { IRunContext } from '@dolittle/aviator.k8s';

import { MicroserviceConfiguration, ConfigurationFiles, MicroserviceComponent } from './index';

export interface IMicroserviceComponentFactoryFor<T extends MicroserviceComponent> {
    create(id: Guid, runContext: IRunContext, configuration: MicroserviceConfiguration, configurationFiles?: ConfigurationFiles): Promise<T>;
}
