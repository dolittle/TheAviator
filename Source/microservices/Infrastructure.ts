// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export class Infrastructure {
    constructor(readonly headLanguage: string, readonly runtimeImage: string, readonly headImage: string, readonly mongoImage: string) {
    }
}
