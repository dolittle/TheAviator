// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * Represents the configuration of a Runtime.
 *
 * @export
 * @class RuntimeConfiguration
 */
export class RuntimeConfiguration {
    constructor(readonly host: string, readonly publicPort: number, readonly privatePort: number) {
    }
}
