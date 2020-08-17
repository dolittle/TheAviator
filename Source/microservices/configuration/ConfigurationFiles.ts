// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ConfigurationFile } from './index';

export class ConfigurationFiles extends Array<ConfigurationFile> {
    constructor(readonly rootPath: string) {
        super();
    }
}
