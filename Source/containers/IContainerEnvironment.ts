// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IContainer } from './IContainer';
import { ContainerOptions } from './ContainerOptions';

export interface IContainerEnvironment {
    createContainer(options: ContainerOptions): IContainer;
    createNetwork(name: string): Promise<void>;
    removeNetwork(name: string): Promise<void>;
}
