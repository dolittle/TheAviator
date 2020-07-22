// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Specification, IContextDescriptorFor } from './';

export interface ISpecificationBuilder {
    buildFrom(description: IContextDescriptorFor<any>): Specification;
}
