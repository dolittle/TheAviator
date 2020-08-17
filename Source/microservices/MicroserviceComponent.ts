// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { NamespacedPod } from '@dolittle/aviator.k8s';
import { MicroserviceConfiguration } from './index';

export abstract class MicroserviceComponent {
    constructor(readonly pod: NamespacedPod, readonly microserviceConfiguration: MicroserviceConfiguration) {
    }
}
