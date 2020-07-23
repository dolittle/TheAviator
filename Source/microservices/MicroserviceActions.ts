// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fetch from 'node-fetch';
import { Guid } from '@dolittle/rudiments';

import { Microservice, IMicroserviceActions, shared } from './index';

/**
 * Represents an implementation of IMicroserviceActions.
 *
 * @export
 * @class MicroserviceActions
 * @implements {IMicroserviceActions}
 */
export class MicroserviceActions implements IMicroserviceActions {

    constructor(private readonly _microservice: Microservice) {
    }

    /** @inheritdoc */
    async checkStatus(): Promise<string> {
        try {
            const url = `${this.getHeadBaseUrl()}/api/Events`;
            const response = await fetch(url, { timeout: 1000 });
            const result = await response.text();
            return result;
        } catch (ex) {
            return '';
        }
    }

    /** @inheritdoc */
    async commitEvents(tenantId: Guid, eventSource: Guid, ...events: shared.EventObject[]): Promise<void> {
        try {
            await this.postCommitRequest(
                this.getUrlForCommittingEvents(tenantId, eventSource, false),
                events);
        } catch (ex) {

        }
    }

    /** @inheritdoc */
    async commitPublicEvents(tenantId: Guid, eventSource: Guid, ...events: shared.EventObject[]): Promise<void> {
        try {
            await this.postCommitRequest(
                this.getUrlForCommittingEvents(tenantId, eventSource, true),
                events);
        } catch (ex) {
        }
    }

    /** @inheritdoc */
    async commitAggregateEvents(tenantId: Guid, eventSource: Guid, version: number, ...events: shared.EventObject[]): Promise<void> {
        try {
            await this.postCommitRequest(
                this.getUrlForCommittingAggregateEvents(tenantId, eventSource, version),
                events);
        } catch (ex) { }
    }


    /** @inheritdoc */
    async getRuntimeMetrics(): Promise<string> {
        try {
            const url = `${this._microservice.runtime.pod.address}:${this._microservice.runtime.metricsPort}/metrics`;
            const response = await fetch(url, { timeout: 1000 });
            const result = await response.text();
            return result;
        } catch (ex) {
            return '';
        }
    }

    private getUrlForCommittingEvents(tenantId: Guid, eventSource: Guid, publicEvent: boolean): string {
        return `${this.getHeadBaseUrl()}/api/Events/${publicEvent ? 'Public/' : ''}${tenantId.toString()}/${eventSource.toString()}`;
    }

    private getUrlForCommittingAggregateEvents(tenantId: Guid, eventSource: Guid, version: number): string {
        return `${this.getHeadBaseUrl()}/api/Events/Aggregate/${tenantId.toString()}/${eventSource.toString()}/${version}`;
    }

    private postCommitRequest(url: string, content: any) {
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(content),
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000
        });
    }

    private getHeadBaseUrl() {
        return `${this._microservice.head.pod.address}:${this._microservice.head.interactionPort}`;
    }
}
