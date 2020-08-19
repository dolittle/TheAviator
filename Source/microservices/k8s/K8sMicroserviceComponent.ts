// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { NamespacedPod } from '@dolittle/aviator.k8s';
import { MicroserviceConfiguration, IMicroserviceComponent } from '../index';

export abstract class K8sMicroserviceComponent implements IMicroserviceComponent {
    constructor(protected readonly pod: NamespacedPod, readonly microserviceConfiguration: MicroserviceConfiguration) {
    }

    get uniqueName() { return this.pod.uniqueName; }
    get friendlyName() { return this.pod.friendlyName; }
    get exposedPorts() { return this.pod.exposedPorts; }

    stop(): Promise<void> {
        return this.pod.stop();
    }
    continue(): Promise<void> {
        return this.pod.start();
    }
    restart(): Promise<void> {
        return this.pod.restart();
    }
    pause(): Promise<void> {
        return this.pod.pause();
    }
    resume(): Promise<void> {
        return this.pod.resume();
    }
    kill(): Promise<void> {
        return this.pod.kill();
    }
}
