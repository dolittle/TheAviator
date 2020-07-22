// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { K8sConfiguration } from './index';

const environmentMap = {
    default: 'AVIATOR_K8S_DEFAULT',
    clusterName: 'AVIATOR_K8S_CLUSTER_NAME',
    clusterServer: 'AVIATOR_K8S_CLUSTER_SERVER',
    userName: 'AVIATOR_K8S_USER_NAME',
    userPassword: 'AVIATOR_K8S_USER_PASSWORD',
    userToken: 'AVIATOR_K8S_USER_TOKEN',
    contextName: 'AVIATOR_K8S_CONTEXT_NAME',
    contextCluster: 'AVIATOR_K8S_CONTEXT_CLUSTER',
    contextUser: 'AVIATOR_K8S_CONTEXT_USER',
    contextNamespace: 'AVIATOR_K8S_CONTEXT_NAMESPACE',

};

export class ConfigurationProvider {
    private static _instance: ConfigurationProvider;
    private _configuration!: K8sConfiguration;

    static get() {
        if (ConfigurationProvider._instance == null) {
            this._instance = new ConfigurationProvider();
        }
        return ConfigurationProvider._instance;
    }
    provide(): K8sConfiguration {
        if (this._configuration == null) {
            const configuration = this._extractConfiguration();

        }
        return this._configuration;
    }
    private _extractConfiguration(): K8sConfiguration | undefined  {
        if (process.env[environmentMap.default] != null) return undefined;
        const config: K8sConfiguration = {
            cluster: {
                name: process.env[environmentMap.clusterName]!,
                server: process.env[environmentMap.clusterServer]!,
                skipTLSVerify: false
            },
            user: {
                name: process.env[environmentMap.userName]!,
                password: process.env[environmentMap.userPassword],
                token: process.env[environmentMap.userToken]
            },
            context: {
                name: process.env[environmentMap.contextName]!,
                cluster: process.env[environmentMap.contextCluster]!,
                user: process.env[environmentMap.contextUser]!,
                namespace: process.env[environmentMap.contextNamespace]
            }
        };
        return config;
    }
}
