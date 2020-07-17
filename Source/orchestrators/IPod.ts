// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Guid } from '@dolittle/rudiments';
export interface IPod {
    readonly id: Guid;
    readonly name: string;
    readonly fullName: string;
}
