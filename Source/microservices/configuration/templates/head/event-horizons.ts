// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const content =
`{
    {{#each eventHorizons}}
    "{{consumerTenant}}": [
        {
            "scope": "{{scope}}",
            "microservice": "{{microservice}}",
            "tenant": "{{producerTenant}}",
            "stream": "{{stream}}",
            "partition": "00000000-0000-0000-0000-000000000000"
        }
    ]
    {{/each}}
}
`;
const name = 'event-horizons.json';

export default {name, content};