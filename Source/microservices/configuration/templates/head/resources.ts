// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const content =
`{
    {{#each tenants}}
    "{{tenantId}}": {
    }
    {{/each}}
}
`;

const name = 'resources.json';

export default {name, content};