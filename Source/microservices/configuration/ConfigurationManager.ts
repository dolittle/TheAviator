// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

import { Mount } from '@dolittle/aviator.k8s';
import { IConfigurationManager, ConfigurationTarget, MicroserviceConfiguration, ConfigurationTemplate } from './index';
import templates from './templates';

const HeadConfig = 'head';
const RuntimeConfig = 'runtime';


/**
 * Represents an implementation of IConfigurationManager.
 *
 * @export
 * @class ConfigurationManager
 * @implements {IConfigurationManager}
 */
export class ConfigurationManager implements IConfigurationManager {

    /**
     * @inheritdoc
     */
    generateForHead(configuration: MicroserviceConfiguration, workingDirectory: string): Mount[] {
        return this.generateFiles(configuration, HeadConfig, workingDirectory);
    }

    /**
     * @inheritdoc
     */
    generateForRuntime(configuration: MicroserviceConfiguration, workingDirectory: string): Mount[] {
        return this.generateFiles(configuration, RuntimeConfig, workingDirectory);
    }

    private generateFiles(configuration: MicroserviceConfiguration, target: ConfigurationTarget, workingDirectory: string) {
        const mounts: Mount[] = [];
        const templatesForTarget = templates[target];
        for (const template of templatesForTarget) {
            mounts.push(this.generateFile(configuration, target, template, workingDirectory));
        }
        return mounts;
    }

    private generateFile(configuration: MicroserviceConfiguration, target: ConfigurationTarget, configurationTemplate: ConfigurationTemplate, workingDirectory: string): Mount {
        const template = Handlebars.compile(configurationTemplate.content);
        const result = template(configuration);
        const destination = this.getAndEnsureHostPathFor(configuration, target, configurationTemplate.fileName, workingDirectory);
        fs.writeFileSync(destination, result);

        return {
            host: destination,
            container: `/app/.dolittle/${configurationTemplate.fileName}`
        };
    }

    private getAndEnsureHostPathFor(configuration: MicroserviceConfiguration, target: ConfigurationTarget, fileName: string, workingDirectory: string): string {
        const hostPath = path.join(workingDirectory, '_microservices', configuration.name, target);
        if (!fs.existsSync(hostPath)) {
            fs.mkdirSync(hostPath, { recursive: true });
        }

        return path.join(hostPath, fileName);
    }
}

