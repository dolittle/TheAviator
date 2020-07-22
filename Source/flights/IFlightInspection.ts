// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PreflightChecklist } from './index';

/**
 * Defines a system that can run preflight checklist.
 *
 * @export
 * @interface IFlightInspection
 */
export interface IFlightInspection {
    /**
     * Runs the preflight checklist
     *
     * @param {PreflightChecklist} checklist
     * @returns {Promise<void>}
     */
    runPreflightCheck(checklist: PreflightChecklist): Promise<void>;
}
