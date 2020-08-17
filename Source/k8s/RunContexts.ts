// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { IRunContext, IRunContexts } from './index';

export class RunContexts implements IRunContexts {
    private readonly _contexts: Map<string, IRunContext>;

    constructor() {
        this._contexts = new Map<string, IRunContext>();
    }

    /**
     * @inheritdoc
     */
    add(context: IRunContext): void {
        const idString = context.id.toString();
        if (this._contexts.has(idString)) {throw new Error(`Run context with id '${idString}' already exists`);}
        this._contexts.set(idString, context);
    }

    /**
     * @inheritdoc
     */
    get(id: Guid): IRunContext {
        const idString = id.toString();
        if (!this._contexts.has(idString)) {throw new Error(`Run context with id '${idString}' does not exist`);}
        return this._contexts.get(idString)!;
    }

    /**
     * @inheritdoc
     */
    async remove(id: Guid): Promise<void> {
        await this._contexts.get(id.toString())?.clear();
        this._contexts.delete(id.toString());
    }

    /**
     * @inheritdoc
     */
    async clear(): Promise<void> {
        for (const context of this._contexts.values()) {
            await context.clear();
        }
        this._contexts.clear();
    }
}
