// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IRunContext } from '@dolittle/aviator.k8s';

import { MicroserviceConfiguration, ConfigurationFiles, MicroserviceComponent } from './index';

export interface IMicroserviceComponentFactoryFor<T extends MicroserviceComponent> {
    create(runContext: IRunContext, configuration: MicroserviceConfiguration, configurationFiles?: ConfigurationFiles): Promise<T>;
}
