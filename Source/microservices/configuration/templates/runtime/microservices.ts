// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const content =
`{
    {{#each producers}}
    "{{identifier}}": {
        "host": "{{runtime.host}}",
        "port": "{{runtime.publicPort}}"
    }
    {{/each}}
}
`;

const name = 'microservices.json';

export default {name, content};