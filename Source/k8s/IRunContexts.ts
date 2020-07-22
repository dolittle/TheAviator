// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Guid } from '@dolittle/rudiments';
import { IRunContext } from './index';

export interface IRunContexts {
    add(context: IRunContext): void;
    get(id: Guid): IRunContext;
    remove(id: Guid): Promise<void>;
    clear(): Promise<void>;
}
