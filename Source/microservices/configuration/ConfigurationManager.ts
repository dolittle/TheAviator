// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

import templates from './templates';
import { IConfigurationManager, ConfigurationTarget, MicroserviceConfiguration, ConfigurationTemplate, ConfigurationFile, ConfigurationFiles } from './index';

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
    generateForHead(configuration: MicroserviceConfiguration, workingDirectory: string): ConfigurationFiles {
        return this.generateFiles(configuration, HeadConfig, workingDirectory);
    }

    /**
     * @inheritdoc
     */
    generateForRuntime(configuration: MicroserviceConfiguration, workingDirectory: string): ConfigurationFiles {
        return this.generateFiles(configuration, RuntimeConfig, workingDirectory);
    }

    private generateFiles(configuration: MicroserviceConfiguration, target: ConfigurationTarget, workingDirectory: string): ConfigurationFiles {
        const compiledConfigurations = new ConfigurationFiles('/app/.dolittle');
        const templatesForTarget = templates[target];
        for (const template of templatesForTarget) {
            compiledConfigurations.push(this.generateFile(configuration, target, template, workingDirectory));
        }
        return compiledConfigurations;
    }

    private generateFile(configuration: MicroserviceConfiguration, target: ConfigurationTarget, configurationTemplate: ConfigurationTemplate, workingDirectory: string): ConfigurationFile {
        const template = Handlebars.compile(configurationTemplate.template);
        const content = template(configuration);
        const destination = this.getAndEnsureHostPathFor(configuration, target, configurationTemplate.fileName, workingDirectory);
        fs.writeFileSync(destination, content);

        return {
            fileName: configurationTemplate.fileName,
            content
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

