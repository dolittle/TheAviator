
// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type PlatformLanguage = 'dotnet' | 'javascript';

export class Platform {
    constructor(readonly language: PlatformLanguage, readonly runtimeVersion: string, readonly headVersion: string, readonly dolittleMongoVersion: string) {
    }
}
