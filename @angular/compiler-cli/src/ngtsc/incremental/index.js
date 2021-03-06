/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/incremental", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/incremental/src/noop", "@angular/compiler-cli/src/ngtsc/incremental/src/state", "@angular/compiler-cli/src/ngtsc/incremental/src/strategy"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IncrementalDriver = exports.NOOP_INCREMENTAL_BUILD = void 0;
    var tslib_1 = require("tslib");
    var noop_1 = require("@angular/compiler-cli/src/ngtsc/incremental/src/noop");
    Object.defineProperty(exports, "NOOP_INCREMENTAL_BUILD", { enumerable: true, get: function () { return noop_1.NOOP_INCREMENTAL_BUILD; } });
    var state_1 = require("@angular/compiler-cli/src/ngtsc/incremental/src/state");
    Object.defineProperty(exports, "IncrementalDriver", { enumerable: true, get: function () { return state_1.IncrementalDriver; } });
    tslib_1.__exportStar(require("@angular/compiler-cli/src/ngtsc/incremental/src/strategy"), exports);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvc3JjL25ndHNjL2luY3JlbWVudGFsL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7SUFFSCw2RUFBa0Q7SUFBMUMsOEdBQUEsc0JBQXNCLE9BQUE7SUFDOUIsK0VBQThDO0lBQXRDLDBHQUFBLGlCQUFpQixPQUFBO0lBQ3pCLG1HQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5leHBvcnQge05PT1BfSU5DUkVNRU5UQUxfQlVJTER9IGZyb20gJy4vc3JjL25vb3AnO1xuZXhwb3J0IHtJbmNyZW1lbnRhbERyaXZlcn0gZnJvbSAnLi9zcmMvc3RhdGUnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvc3RyYXRlZ3knO1xuIl19