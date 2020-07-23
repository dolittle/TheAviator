// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const content =
`{
    {{#each eventStoreForTenants}}
    "{{tenantId}}": {
        "eventStore": {
            "servers": [
                "{{server}}"
            ],
            "database": "{{database}}"
        }
    }
    {{/each}}
}
`;

const name = 'resources.json';

export default {name, content};