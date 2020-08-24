// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fs from 'fs';
import { Infrastructure, InfrastructureConfiguration } from './index';

export class Infrastructures {
    private constructor(private readonly _infrastructures: readonly Infrastructure[]) {
    }

    static loadFrom(infrastructureObj: InfrastructureConfiguration): Infrastructures {
        const infrastructures: Infrastructure[] = [];
        for (const language of Object.keys(infrastructureObj)) {
            const obj = infrastructureObj[language];
            infrastructures.push({
                headLanguage: language,
                runtimeImage: obj.runtime,
                headImage: obj.head,
                mongoImage: obj.mongo
            });
        }
        return new Infrastructures(infrastructures);
    }

    static loadFromFile(configFilePath: string): Infrastructures {
        const json = JSON.parse(fs.readFileSync(configFilePath, { encoding: 'utf8' })) as InfrastructureConfiguration;
        return Infrastructures.loadFrom(json);
    }

    getFor(headLanguage: string): Infrastructure {
        const infrastructure = this._infrastructures.find(_ => _.headLanguage === headLanguage);
        if (infrastructure == null) throw new Error(`No infrastructure for head language ${headLanguage}`);
        return infrastructure;
    }
}
