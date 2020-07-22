// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/rudiments';
import { ScenarioContext, IContextDescriptorFor } from './';

export abstract class BehaviorFor<T extends ScenarioContext> implements IContextDescriptorFor<T> {
    abstract for: Constructor<T>;
    and(): Function[] {
        return [];
    }
}
