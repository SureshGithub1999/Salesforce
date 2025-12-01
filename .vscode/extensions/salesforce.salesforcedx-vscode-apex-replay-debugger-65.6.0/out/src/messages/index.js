"use strict";
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.nls = void 0;
const vscode_i18n_1 = require("@salesforce/vscode-i18n");
const i18n_1 = require("./i18n");
const i18n_ja_1 = require("./i18n.ja");
// Default instance name for backward compatibility
const DEFAULT_INSTANCE = 'salesforcedx-vscode-apex-replay-debugger';
// Register default Apex extension messages
const localizationService = vscode_i18n_1.LocalizationService.getInstance(DEFAULT_INSTANCE);
localizationService.messageBundleManager.registerMessageBundle(DEFAULT_INSTANCE, {
    messages: i18n_1.messages,
    type: 'base'
});
localizationService.messageBundleManager.registerMessageBundle(DEFAULT_INSTANCE, {
    messages: { ...i18n_ja_1.messages, _locale: vscode_i18n_1.LOCALE_JA },
    type: 'locale'
});
exports.nls = {
    localize: (key, ...args) => localizationService.localize(key, ...args)
};
//# sourceMappingURL=index.js.map