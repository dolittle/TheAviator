// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IPod } from '@dolittle/aviator.k8s';
import { HeadConfiguration } from './configuration';
import { MicroserviceComponent } from './index';

export class Head extends MicroserviceComponent {
    readonly interactionPort = 5000;
    constructor(image: string, imageTag: string, pod: IPod, readonly configuration: HeadConfiguration) {
        super(image, imageTag, pod);
    }
}
