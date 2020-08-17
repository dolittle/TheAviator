// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ConfigurationTemplate } from '../index';
import headBoundedContext from './head/bounded-context';
import runtimeBoundedContext from './runtime/bounded-context';
import clients from './head/clients';
import eventHorizons from './head/event-horizons';
import headResources from './head/resources';
import runtimeResources from './runtime/resources';
import headTenants from './head/tenants';
import runtimeTenants from './runtime/tenants';
import eventHorizonConsents from './runtime/event-horizon-consents';
import microservices from './runtime/microservices';


const templates: { head: ConfigurationTemplate[], runtime: ConfigurationTemplate[]} = {
    head: [
        asConfigurationTemplate(headBoundedContext),
        asConfigurationTemplate(clients),
        asConfigurationTemplate(eventHorizons),
        asConfigurationTemplate(headResources),
        asConfigurationTemplate(headTenants)

    ],
    runtime: [
        asConfigurationTemplate(runtimeBoundedContext),
        asConfigurationTemplate(runtimeResources),
        asConfigurationTemplate(runtimeTenants),
        asConfigurationTemplate(eventHorizonConsents),
        asConfigurationTemplate(microservices)
    ]
};

function asConfigurationTemplate(template: {name: string, content: string}) {
    return new ConfigurationTemplate(template.name, template.content);
}

export default templates;