"use strict";
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveTestCodeCoverage = void 0;
const salesforcedx_utils_vscode_1 = require("@salesforce/salesforcedx-utils-vscode");
const vscode = require("vscode");
const retrieveTestCodeCoverage = () => vscode.workspace.getConfiguration(salesforcedx_utils_vscode_1.SFDX_CORE_CONFIGURATION_NAME).get('retrieve-test-code-coverage', false);
exports.retrieveTestCodeCoverage = retrieveTestCodeCoverage;
//# sourceMappingURL=settings.js.map