// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { NamespacedPod } from '@dolittle/aviator.k8s';

import { MicroserviceComponent, MicroserviceConfiguration } from './index';

export class Head extends MicroserviceComponent {
    constructor(pod: NamespacedPod, readonly microserviceConfiguration: MicroserviceConfiguration) {
        super(pod, microserviceConfiguration);
    }
    get baseUrl() { return 'url/to/pod'; }
    get apiUrl() { return `${this.baseUrl}:${MicroserviceConfiguration.headInteractionPort}/api`;}
}
