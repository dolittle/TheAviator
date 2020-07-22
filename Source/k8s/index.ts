// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Orchestrator } from './Orchestrator';
import { ConfigurationProvider } from './ConfigurationProvider';

export * from './K8sConfiguration';
export * from './Mount';
export * from './IPod';
export * from './IPodFactory';
export * from './IRunContext';
export * from './IRunContexts';
export * from './IOrchestrator';
export * from './ConfigurationProvider';
export * from './Orchestrator';

export const orchestrator = new Orchestrator(undefined as any, ConfigurationProvider.get().provide());