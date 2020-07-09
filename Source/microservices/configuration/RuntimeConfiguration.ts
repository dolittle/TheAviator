// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export class RuntimeConfiguration {
    readonly host: string;
    readonly publicPort: number;
    readonly privatePort: number;
    constructor(host: string, publicPort: number, privatePort: number) {
        this.host = host;
        this.publicPort = publicPort;
        this.privatePort = privatePort;
    }
}
