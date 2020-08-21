// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IRunContext, IRunContexts } from './index';

export interface IOrchestrator {
    readonly runContexts: IRunContexts;
    createRun(namespace: string): Promise<IRunContext>

}
