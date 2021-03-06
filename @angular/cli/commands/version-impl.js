"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionCommand = void 0;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const fs = require("fs");
const path = require("path");
const command_1 = require("../models/command");
const color_1 = require("../utilities/color");
class VersionCommand extends command_1.Command {
    async run() {
        const cliPackage = require('../package.json');
        let workspacePackage;
        try {
            workspacePackage = require(path.resolve(this.workspace.root, 'package.json'));
        }
        catch (_a) { }
        const patterns = [
            /^@angular\/.*/,
            /^@angular-devkit\/.*/,
            /^@bazel\/.*/,
            /^@ngtools\/.*/,
            /^@nguniversal\/.*/,
            /^@schematics\/.*/,
            /^rxjs$/,
            /^typescript$/,
            /^ng-packagr$/,
            /^webpack$/,
        ];
        const packageNames = [
            ...Object.keys(cliPackage.dependencies || {}),
            ...Object.keys(cliPackage.devDependencies || {}),
            ...Object.keys((workspacePackage === null || workspacePackage === void 0 ? void 0 : workspacePackage.dependencies) || {}),
            ...Object.keys((workspacePackage === null || workspacePackage === void 0 ? void 0 : workspacePackage.devDependencies) || {}),
        ];
        const versions = packageNames
            .filter(x => patterns.some(p => p.test(x)))
            .reduce((acc, name) => {
            if (name in acc) {
                return acc;
            }
            acc[name] = this.getVersion(name);
            return acc;
        }, {});
        const ngCliVersion = cliPackage.version;
        let angularCoreVersion = '';
        const angularSameAsCore = [];
        if (workspacePackage) {
            // Filter all angular versions that are the same as core.
            angularCoreVersion = versions['@angular/core'];
            if (angularCoreVersion) {
                for (const angularPackage of Object.keys(versions)) {
                    if (versions[angularPackage] == angularCoreVersion &&
                        angularPackage.startsWith('@angular/')) {
                        angularSameAsCore.push(angularPackage.replace(/^@angular\//, ''));
                        delete versions[angularPackage];
                    }
                }
                // Make sure we list them in alphabetical order.
                angularSameAsCore.sort();
            }
        }
        const namePad = ' '.repeat(Object.keys(versions).sort((a, b) => b.length - a.length)[0].length + 3);
        const asciiArt = `
     _                      _                 ____ _     ___
    / \\   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / ??? \\ | '_ \\ / _\` | | | | |/ _\` | '__|   | |   | |    | |
  / ___ \\| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \\_\\_| |_|\\__, |\\__,_|_|\\__,_|_|       \\____|_____|___|
                |___/
    `
            .split('\n')
            .map(x => color_1.colors.red(x))
            .join('\n');
        this.logger.info(asciiArt);
        this.logger.info(`
      Angular CLI: ${ngCliVersion}
      Node: ${process.versions.node}
      OS: ${process.platform} ${process.arch}

      Angular: ${angularCoreVersion}
      ... ${angularSameAsCore
            .reduce((acc, name) => {
            // Perform a simple word wrap around 60.
            if (acc.length == 0) {
                return [name];
            }
            const line = acc[acc.length - 1] + ', ' + name;
            if (line.length > 60) {
                acc.push(name);
            }
            else {
                acc[acc.length - 1] = line;
            }
            return acc;
        }, [])
            .join('\n... ')}
      Ivy Workspace: ${workspacePackage ? this.getIvyWorkspace() : ''}

      Package${namePad.slice(7)}Version
      -------${namePad.replace(/ /g, '-')}------------------
      ${Object.keys(versions)
            .map(module => `${module}${namePad.slice(module.length)}${versions[module]}`)
            .sort()
            .join('\n')}
    `.replace(/^ {6}/gm, ''));
    }
    getVersion(moduleName) {
        let packagePath;
        let cliOnly = false;
        // Try to find the package in the workspace
        try {
            packagePath = require.resolve(`${moduleName}/package.json`, { paths: [this.workspace.root] });
        }
        catch (_a) { }
        // If not found, try to find within the CLI
        if (!packagePath) {
            try {
                packagePath = require.resolve(`${moduleName}/package.json`);
                cliOnly = true;
            }
            catch (_b) { }
        }
        let version;
        // If found, attempt to get the version
        if (packagePath) {
            try {
                version = require(packagePath).version + (cliOnly ? ' (cli-only)' : '');
            }
            catch (_c) { }
        }
        return version || '<error>';
    }
    getIvyWorkspace() {
        try {
            const content = fs.readFileSync(path.resolve(this.workspace.root, 'tsconfig.json'), 'utf-8');
            const tsConfig = core_1.parseJson(content, core_1.JsonParseMode.Loose);
            if (!core_1.isJsonObject(tsConfig)) {
                return '<error>';
            }
            const { angularCompilerOptions } = tsConfig;
            return core_1.isJsonObject(angularCompilerOptions) && angularCompilerOptions.enableIvy === false
                ? 'No'
                : 'Yes';
        }
        catch (_a) {
            return '<error>';
        }
    }
}
exports.VersionCommand = VersionCommand;
VersionCommand.aliases = ['v'];
