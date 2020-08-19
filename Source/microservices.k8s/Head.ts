// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { NamespacedPod } from '@dolittle/aviator.k8s';
import { MicroserviceConfiguration, IHead } from '@dolittle/aviator.microservices';

import { K8sMicroserviceComponent } from './index';

export class Head extends K8sMicroserviceComponent implements IHead {
    constructor(pod: NamespacedPod, microserviceConfiguration: MicroserviceConfiguration) {
        super(pod, microserviceConfiguration);
    }
    get baseUrl() { return 'url/to/pod'; }
    get apiUrl() { return `${this.baseUrl}:${MicroserviceConfiguration.headInteractionPort}/api`; }
}
