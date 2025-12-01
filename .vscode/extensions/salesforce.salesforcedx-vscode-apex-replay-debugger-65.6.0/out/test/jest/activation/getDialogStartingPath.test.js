"use strict";
/*
 * Copyright (c) 2022, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
Object.defineProperty(exports, "__esModule", { value: true });
const salesforcedx_utils_vscode_1 = require("@salesforce/salesforcedx-utils-vscode");
const vscode = require("vscode");
const vscode_uri_1 = require("vscode-uri");
const getDialogStartingPath_1 = require("../../../src/activation/getDialogStartingPath");
const debuggerConstants_1 = require("../../../src/debuggerConstants");
jest.mock('vscode');
describe('getDialogStartingPath', () => {
    const testPath = '/here/is/a/fake/path/to/';
    let hasRootWorkspaceStub;
    let mockGet;
    let mockExtensionContext;
    let vsCodeUriMock;
    let debugLogsFolderMock;
    let stateFolderMock;
    beforeEach(() => {
        jest.clearAllMocks();
        hasRootWorkspaceStub = jest.spyOn(salesforcedx_utils_vscode_1.workspaceUtils, 'hasRootWorkspace');
        mockGet = jest.fn();
        mockExtensionContext = {
            workspaceState: { get: mockGet }
        };
        vsCodeUriMock = jest.spyOn(vscode_uri_1.URI, 'file');
        debugLogsFolderMock = jest.spyOn(salesforcedx_utils_vscode_1.projectPaths, 'debugLogsFolder');
        stateFolderMock = jest.spyOn(salesforcedx_utils_vscode_1.projectPaths, 'stateFolder');
        // Mock VSCode workspace.fs.stat to return directory type (exists)
        vscode.workspace.fs.stat.mockResolvedValue({ type: vscode.FileType.Directory });
    });
    it('Should return last opened log folder if present', async () => {
        hasRootWorkspaceStub.mockReturnValue(true);
        mockGet.mockReturnValue(testPath);
        vsCodeUriMock.mockReturnValue({ path: testPath });
        // Act
        const dialogStartingPathUri = await (0, getDialogStartingPath_1.getDialogStartingPath)(mockExtensionContext);
        expect(hasRootWorkspaceStub).toHaveBeenCalled();
        expect(mockGet).toHaveBeenCalledWith(debuggerConstants_1.LAST_OPENED_LOG_FOLDER_KEY);
        expect(vscode.workspace.fs.stat).toHaveBeenCalled();
        expect(vsCodeUriMock).toHaveBeenCalledWith(testPath);
        expect(dialogStartingPathUri.path).toEqual(testPath);
    });
    it('Should return project log folder when last opened log folder not present', async () => {
        hasRootWorkspaceStub.mockReturnValue(true);
        mockGet.mockReturnValue(undefined);
        const fakePathToDebugLogsFolder = 'path/to/debug/logs';
        debugLogsFolderMock.mockReturnValue(fakePathToDebugLogsFolder);
        vsCodeUriMock.mockReturnValue({
            path: fakePathToDebugLogsFolder
        });
        // Act
        const dialogStartingPathUri = await (0, getDialogStartingPath_1.getDialogStartingPath)(mockExtensionContext);
        expect(hasRootWorkspaceStub).toHaveBeenCalled();
        expect(mockGet).toHaveBeenCalledWith(debuggerConstants_1.LAST_OPENED_LOG_FOLDER_KEY);
        expect(vscode.workspace.fs.stat).toHaveBeenCalled();
        expect(vsCodeUriMock).toHaveBeenCalledWith(fakePathToDebugLogsFolder);
        expect(dialogStartingPathUri.path).toEqual(fakePathToDebugLogsFolder);
    });
    it('Should return state folder as fallback when project log folder not present', async () => {
        hasRootWorkspaceStub.mockReturnValue(true);
        mockGet.mockReturnValue(undefined);
        const fakePathToDebugLogsFolder = 'path/to/debug/logs';
        debugLogsFolderMock.mockReturnValue(fakePathToDebugLogsFolder);
        // Mock that the debug logs folder doesn't exist
        vscode.workspace.fs.stat.mockRejectedValueOnce(new Error('Not found'));
        const fakePathToStateFolder = 'path/to/state';
        stateFolderMock.mockReturnValue(fakePathToStateFolder);
        vsCodeUriMock.mockReturnValue({
            path: fakePathToStateFolder
        });
        // Act
        const dialogStartingPathUri = await (0, getDialogStartingPath_1.getDialogStartingPath)(mockExtensionContext);
        expect(hasRootWorkspaceStub).toHaveBeenCalled();
        expect(mockGet).toHaveBeenCalledWith(debuggerConstants_1.LAST_OPENED_LOG_FOLDER_KEY);
        expect(vscode.workspace.fs.stat).toHaveBeenCalled();
        expect(vsCodeUriMock).toHaveBeenCalledWith(fakePathToStateFolder);
        expect(dialogStartingPathUri.path).toEqual(fakePathToStateFolder);
    });
    it('Should return undefined when not in a project workspace', async () => {
        hasRootWorkspaceStub.mockReturnValue(false);
        mockGet.mockReturnValue(testPath);
        // Act
        const dialogStartingPathUri = await (0, getDialogStartingPath_1.getDialogStartingPath)(mockExtensionContext);
        expect(dialogStartingPathUri).toEqual(undefined);
    });
});
//# sourceMappingURL=getDialogStartingPath.test.js.map