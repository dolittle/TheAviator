// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const content =
`{
    {{#each consents}}
    "{{producerTenant}}": [
        {
            "microservice": "{{microservice}}",
            "tenant": "{{consumerTenant}}",
            "stream": "{{stream}}",
            "partition": "00000000-0000-0000-0000-000000000000",
            "consent": "aaf66b7d-2fb7-4ded-9722-23d48f6bb2af"
        }
    ]
    {{/each}}
}
`;

const name = 'event-horizon-consents.json';

export default {name, content};