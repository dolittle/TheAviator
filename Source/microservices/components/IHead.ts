// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IMicroserviceComponent } from './index';

export interface IHead extends IMicroserviceComponent {
    readonly baseUrl: string;
    readonly apiUrl: string;
}
