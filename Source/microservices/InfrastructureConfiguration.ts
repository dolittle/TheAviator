// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type InfrastructureConfigurationObject = {
    runtime: string,
    head: string,
    mongo: string
};
export type InfrastructureConfiguration = { [headLanguage: string]: InfrastructureConfigurationObject};
