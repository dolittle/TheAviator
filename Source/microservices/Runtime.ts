// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IPod } from '@dolittle/aviator.k8s';
import { RuntimeConfiguration } from './configuration';
import { MicroserviceComponent } from './index';

export class Runtime extends MicroserviceComponent {
    readonly uiInteractionPort = 81;
    readonly metricsPort = 9700;
    readonly publicPort = 50052;
    readonly privatePort = 50053;
    constructor(image: string, imageTag: string, pod: IPod, readonly configuration: RuntimeConfiguration) {
        super(image, imageTag, pod);
    }
}
