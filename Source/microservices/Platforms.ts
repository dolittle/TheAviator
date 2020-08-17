// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Platform } from './index';

export class Platforms {
    static forJavascript(runtimeVersion?: string, headVersion?: string) {
        return new Platform('javascript', runtimeVersion ?? '5.0.1', headVersion ?? '1.0.0-rc.1', '4.2.2');
    }
    static forDotnet(runtimeVersion?: string, headVersion?: string) {
        return new Platform('dotnet', runtimeVersion ?? '5.0.1', headVersion ?? '5.0.0-rc.3', '4.2.2');
    }
}
