// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { IRunContext } from './IRunContext';

export interface IOrchestrator {
    createPod(runId: Guid): Promise<void>
    createRun(): Promise<IRunContext>
}
