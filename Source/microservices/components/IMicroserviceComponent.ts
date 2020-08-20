// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { BehaviorSubject } from 'rxjs';
import { MicroserviceConfiguration } from '../index';


export interface IMicroserviceComponent {
    readonly uniqueName: string
    readonly friendlyName: string
    readonly exposedPorts: readonly number[]
    readonly microserviceConfiguration: MicroserviceConfiguration;
    readonly outputStream: BehaviorSubject<NodeJS.ReadWriteStream>

    stop(): Promise<void>
    continue(): Promise<void>
    restart(): Promise<void>
    pause(): Promise<void>
    resume(): Promise<void>
    kill(): Promise<void>
}