"use strict";
/**
 * @license
 * Copyright 2019 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeExamples = void 0;
var tslib_1 = require("tslib");
var Lint = require("../../index");
// tslint:disable: object-literal-sort-keys
exports.codeExamples = [
    {
        description: "Disallows usages of a non-awaited Promise as boolean.",
        config: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            \"rules\": { \"no-promise-as-boolean\": true }\n        "], ["\n            \"rules\": { \"no-promise-as-boolean\": true }\n        "]))),
        pass: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            async function waiter(custumerDecisionPromise: Promise<any>) {\n                if (await custumerDecisionPromise) {\n                    console.log(\"Customer ready to take an order.\")\n                }\n            }\n        "], ["\n            async function waiter(custumerDecisionPromise: Promise<any>) {\n                if (await custumerDecisionPromise) {\n                    console.log(\"Customer ready to take an order.\")\n                }\n            }\n        "]))),
        fail: Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n            async function waiter(custumerDecisionPromise: Promise<any>) {\n                if (custumerDecisionPromise) {\n                    console.log(\"Customer ready to take an order.\")\n                }\n            }\n        "], ["\n            async function waiter(custumerDecisionPromise: Promise<any>) {\n                if (custumerDecisionPromise) {\n                    console.log(\"Customer ready to take an order.\")\n                }\n            }\n        "]))),
    },
    {
        description: "Disallows usages of a non-awaited third-party promise as boolean.",
        config: Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n            \"rules\": { \"no-promise-as-boolean\": [true, { \"promise-classes\": [\"CustomPromise\"] }] }\n        "], ["\n            \"rules\": { \"no-promise-as-boolean\": [true, { \"promise-classes\": [\"CustomPromise\"] }] }\n        "]))),
        pass: Lint.Utils.dedent(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n            function printOrdersPerLine(orderId: number, orderedFoodPromise: CustomPromise<string[]>) {\n                orderedFoodPromise.then(orderedFood => {\n                    console.log(`${orderId} contains the following items:`);\n\n                    for (let index = 0; orderedFood; index++) {\n                        console.log(\"orderedFood[index]\");\n                    }\n\n                    console.log(\"Done.\");\n                })\n            }\n        "], ["\n            function printOrdersPerLine(orderId: number, orderedFoodPromise: CustomPromise<string[]>) {\n                orderedFoodPromise.then(orderedFood => {\n                    console.log(\\`\\${orderId} contains the following items:\\`);\n\n                    for (let index = 0; orderedFood; index++) {\n                        console.log(\"orderedFood[index]\");\n                    }\n\n                    console.log(\"Done.\");\n                })\n            }\n        "]))),
        fail: Lint.Utils.dedent(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n            function printOrdersPerLine(orderId: number, orderedFoodPromise: CustomPromise<string[]>) {\n                console.log(`${orderId} contains the following items:`);\n\n                for (let index = 0; orderedFoodPromise; index++) {\n                    console.log(\"orderedFoodPromise[index]\");\n                }\n\n                console.log(\"Done.\");\n            }\n        "], ["\n            function printOrdersPerLine(orderId: number, orderedFoodPromise: CustomPromise<string[]>) {\n                console.log(\\`\\${orderId} contains the following items:\\`);\n\n                for (let index = 0; orderedFoodPromise; index++) {\n                    console.log(\"orderedFoodPromise[index]\");\n                }\n\n                console.log(\"Done.\");\n            }\n        "]))),
    },
];
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
