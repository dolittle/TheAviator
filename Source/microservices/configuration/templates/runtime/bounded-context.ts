// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const content =
`{
    "application": "a7ed04aa-3d95-4c15-acd2-101a15d3828e",
    "boundedContext": "{{identifier}}",
    "boundedContextName": "[UNSET]",
    "resources": {
        "eventStore": {
          "production": "MongoDB",
          "development": "MongoDB"
        }
      },
        "core": {
      "language": "csharp"
    },
    "interaction": []
}
`;

const name = 'bounded-context.json';

export default {name, content};