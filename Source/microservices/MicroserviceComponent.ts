// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IPod } from '@dolittle/aviator.k8s';

export abstract class MicroserviceComponent {
    constructor(readonly image: string, readonly imageTag: string, readonly pod: IPod) {
    }
}
