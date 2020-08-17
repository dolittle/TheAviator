// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const content =
`{
    "public": {
        "host": "{{runtime.host}}",
        "port": "{{runtime.publicPort}}"
    },
    "private": {
        "host": "{{runtime.host}}",
        "port": "{{runtime.privatePort}}"
    }
}
`;

const name = 'clients.json';

export default {name, content};