/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule, DOCUMENT, ɵPLATFORM_BROWSER_ID as PLATFORM_BROWSER_ID } from '@angular/common';
import { APP_ID, ApplicationModule, createPlatformFactory, ErrorHandler, Inject, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, platformCore, RendererFactory2, Sanitizer, SkipSelf, Testability, ɵINJECTOR_SCOPE as INJECTOR_SCOPE, ɵsetDocument } from '@angular/core';
import { BrowserDomAdapter } from './browser/browser_adapter';
import { SERVER_TRANSITION_PROVIDERS, TRANSITION_ID } from './browser/server-transition';
import { BrowserGetTestability } from './browser/testability';
import { ELEMENT_PROBE_PROVIDERS } from './dom/debug/ng_probe';
import { DomRendererFactory2 } from './dom/dom_renderer';
import { DomEventsPlugin } from './dom/events/dom_events';
import { EVENT_MANAGER_PLUGINS, EventManager } from './dom/events/event_manager';
import { HAMMER_PROVIDERS } from './dom/events/hammer_gestures';
import { KeyEventsPlugin } from './dom/events/key_events';
import { DomSharedStylesHost, SharedStylesHost } from './dom/shared_styles_host';
import { DomSanitizer, DomSanitizerImpl } from './security/dom_sanitization_service';
export function initDomAdapter() {
    BrowserDomAdapter.makeCurrent();
    BrowserGetTestability.init();
}
export function errorHandler() {
    return new ErrorHandler();
}
export function _document() {
    // Tell ivy about the global document
    ɵsetDocument(document);
    return document;
}
const ɵ0 = PLATFORM_BROWSER_ID;
export const INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_ID, useValue: ɵ0 },
    { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    { provide: DOCUMENT, useFactory: _document, deps: [] },
];
const BROWSER_SANITIZATION_PROVIDERS__PRE_R3__ = [
    { provide: Sanitizer, useExisting: DomSanitizer },
    { provide: DomSanitizer, useClass: DomSanitizerImpl, deps: [DOCUMENT] },
];
export const BROWSER_SANITIZATION_PROVIDERS__POST_R3__ = [];
/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](http://g.co/ng/security).
 * @publicApi
 */
export const BROWSER_SANITIZATION_PROVIDERS = BROWSER_SANITIZATION_PROVIDERS__PRE_R3__;
/**
 * A factory function that returns a `PlatformRef` instance associated with browser service
 * providers.
 *
 * @publicApi
 */
export const platformBrowser = createPlatformFactory(platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
export const BROWSER_MODULE_PROVIDERS = [
    BROWSER_SANITIZATION_PROVIDERS,
    { provide: INJECTOR_SCOPE, useValue: 'root' },
    { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: DomEventsPlugin,
        multi: true,
        deps: [DOCUMENT, NgZone, PLATFORM_ID]
    },
    { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true, deps: [DOCUMENT] },
    HAMMER_PROVIDERS,
    {
        provide: DomRendererFactory2,
        useClass: DomRendererFactory2,
        deps: [EventManager, DomSharedStylesHost, APP_ID]
    },
    { provide: RendererFactory2, useExisting: DomRendererFactory2 },
    { provide: SharedStylesHost, useExisting: DomSharedStylesHost },
    { provide: DomSharedStylesHost, useClass: DomSharedStylesHost, deps: [DOCUMENT] },
    { provide: Testability, useClass: Testability, deps: [NgZone] },
    { provide: EventManager, useClass: EventManager, deps: [EVENT_MANAGER_PLUGINS, NgZone] },
    ELEMENT_PROBE_PROVIDERS,
];
/**
 * Exports required infrastructure for all Angular apps.
 * Included by default in all Angular apps created with the CLI
 * `new` command.
 * Re-exports `CommonModule` and `ApplicationModule`, making their
 * exports and providers available to all apps.
 *
 * @publicApi
 */
export class BrowserModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error(`BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.`);
        }
    }
    /**
     * Configures a browser-based app to transition from a server-rendered app, if
     * one is present on the page.
     *
     * @param params An object containing an identifier for the app to transition.
     * The ID must match between the client and server versions of the app.
     * @returns The reconfigured `BrowserModule` to import into the app's root `AppModule`.
     */
    static withServerTransition(params) {
        return {
            ngModule: BrowserModule,
            providers: [
                { provide: APP_ID, useValue: params.appId },
                { provide: TRANSITION_ID, useExisting: APP_ID },
                SERVER_TRANSITION_PROVIDERS,
            ],
        };
    }
}
BrowserModule.decorators = [
    { type: NgModule, args: [{ providers: BROWSER_MODULE_PROVIDERS, exports: [CommonModule, ApplicationModule] },] }
];
BrowserModule.ctorParameters = () => [
    { type: BrowserModule, decorators: [{ type: Optional }, { type: SkipSelf }, { type: Inject, args: [BrowserModule,] }] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsb0JBQW9CLElBQUksbUJBQW1CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRyxPQUFPLEVBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLHFCQUFxQixFQUFFLFlBQVksRUFBRSxNQUFNLEVBQXVCLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQWUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBa0IsV0FBVyxFQUF1QixlQUFlLElBQUksY0FBYyxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU5VixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsMkJBQTJCLEVBQUUsYUFBYSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDdkYsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLG1CQUFt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LEVBQUUsSUFBSSxFQUFFLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLEVBQUM7SUFDdEYsdUJBQXVCO0NBQ3hCLENBQUM7QUFFRjs7Ozs7Ozs7R0FRRztBQUVILE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFlBQTJELFlBQWdDO1FBQ3pGLElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQ1gsK0pBQStKLENBQUMsQ0FBQztTQUN0SztJQUNILENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQXVCO1FBQ2pELE9BQU87WUFDTCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFDO2dCQUN6QyxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBQztnQkFDN0MsMkJBQTJCO2FBQzVCO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQTFCRixRQUFRLFNBQUMsRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLEVBQUM7OztZQUVoQixhQUFhLHVCQUF6RSxRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlLCBET0NVTUVOVCwgybVQTEFURk9STV9CUk9XU0VSX0lEIGFzIFBMQVRGT1JNX0JST1dTRVJfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JRCwgQXBwbGljYXRpb25Nb2R1bGUsIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgRXJyb3JIYW5kbGVyLCBJbmplY3QsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBOZ1pvbmUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCwgUExBVEZPUk1fSU5JVElBTElaRVIsIHBsYXRmb3JtQ29yZSwgUGxhdGZvcm1SZWYsIFJlbmRlcmVyRmFjdG9yeTIsIFNhbml0aXplciwgU2tpcFNlbGYsIFN0YXRpY1Byb3ZpZGVyLCBUZXN0YWJpbGl0eSwgybVDb25zb2xlIGFzIENvbnNvbGUsIMm1SU5KRUNUT1JfU0NPUEUgYXMgSU5KRUNUT1JfU0NPUEUsIMm1c2V0RG9jdW1lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICcuL2Jyb3dzZXIvYnJvd3Nlcl9hZGFwdGVyJztcbmltcG9ydCB7U0VSVkVSX1RSQU5TSVRJT05fUFJPVklERVJTLCBUUkFOU0lUSU9OX0lEfSBmcm9tICcuL2Jyb3dzZXIvc2VydmVyLXRyYW5zaXRpb24nO1xuaW1wb3J0IHtCcm93c2VyR2V0VGVzdGFiaWxpdHl9IGZyb20gJy4vYnJvd3Nlci90ZXN0YWJpbGl0eSc7XG5pbXBvcnQge0VMRU1FTlRfUFJPQkVfUFJPVklERVJTfSBmcm9tICcuL2RvbS9kZWJ1Zy9uZ19wcm9iZSc7XG5pbXBvcnQge0RvbVJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJy4vZG9tL2RvbV9yZW5kZXJlcic7XG5pbXBvcnQge0RvbUV2ZW50c1BsdWdpbn0gZnJvbSAnLi9kb20vZXZlbnRzL2RvbV9ldmVudHMnO1xuaW1wb3J0IHtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIEV2ZW50TWFuYWdlcn0gZnJvbSAnLi9kb20vZXZlbnRzL2V2ZW50X21hbmFnZXInO1xuaW1wb3J0IHtIQU1NRVJfUFJPVklERVJTfSBmcm9tICcuL2RvbS9ldmVudHMvaGFtbWVyX2dlc3R1cmVzJztcbmltcG9ydCB7S2V5RXZlbnRzUGx1Z2lufSBmcm9tICcuL2RvbS9ldmVudHMva2V5X2V2ZW50cyc7XG5pbXBvcnQge0RvbVNoYXJlZFN0eWxlc0hvc3QsIFNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJy4vZG9tL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgRG9tU2FuaXRpemVySW1wbH0gZnJvbSAnLi9zZWN1cml0eS9kb21fc2FuaXRpemF0aW9uX3NlcnZpY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdERvbUFkYXB0ZXIoKSB7XG4gIEJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG4gIEJyb3dzZXJHZXRUZXN0YWJpbGl0eS5pbml0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvckhhbmRsZXIoKTogRXJyb3JIYW5kbGVyIHtcbiAgcmV0dXJuIG5ldyBFcnJvckhhbmRsZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9kb2N1bWVudCgpOiBhbnkge1xuICAvLyBUZWxsIGl2eSBhYm91dCB0aGUgZ2xvYmFsIGRvY3VtZW50XG4gIMm1c2V0RG9jdW1lbnQoZG9jdW1lbnQpO1xuICByZXR1cm4gZG9jdW1lbnQ7XG59XG5cbmV4cG9ydCBjb25zdCBJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fQlJPV1NFUl9JRH0sXG4gIHtwcm92aWRlOiBQTEFURk9STV9JTklUSUFMSVpFUiwgdXNlVmFsdWU6IGluaXREb21BZGFwdGVyLCBtdWx0aTogdHJ1ZX0sXG4gIHtwcm92aWRlOiBET0NVTUVOVCwgdXNlRmFjdG9yeTogX2RvY3VtZW50LCBkZXBzOiBbXX0sXG5dO1xuXG5jb25zdCBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlNfX1BSRV9SM19fOiBTdGF0aWNQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogU2FuaXRpemVyLCB1c2VFeGlzdGluZzogRG9tU2FuaXRpemVyfSxcbiAge3Byb3ZpZGU6IERvbVNhbml0aXplciwgdXNlQ2xhc3M6IERvbVNhbml0aXplckltcGwsIGRlcHM6IFtET0NVTUVOVF19LFxuXTtcblxuZXhwb3J0IGNvbnN0IEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSU19fUE9TVF9SM19fID0gW107XG5cbi8qKlxuICogQHNlY3VyaXR5IFJlcGxhY2luZyBidWlsdC1pbiBzYW5pdGl6YXRpb24gcHJvdmlkZXJzIGV4cG9zZXMgdGhlIGFwcGxpY2F0aW9uIHRvIFhTUyByaXNrcy5cbiAqIEF0dGFja2VyLWNvbnRyb2xsZWQgZGF0YSBpbnRyb2R1Y2VkIGJ5IGFuIHVuc2FuaXRpemVkIHByb3ZpZGVyIGNvdWxkIGV4cG9zZSB5b3VyXG4gKiBhcHBsaWNhdGlvbiB0byBYU1Mgcmlza3MuIEZvciBtb3JlIGRldGFpbCwgc2VlIHRoZSBbU2VjdXJpdHkgR3VpZGVdKGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5KS5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyA9IEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSU19fUFJFX1IzX187XG5cbi8qKlxuICogQSBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGBQbGF0Zm9ybVJlZmAgaW5zdGFuY2UgYXNzb2NpYXRlZCB3aXRoIGJyb3dzZXIgc2VydmljZVxuICogcHJvdmlkZXJzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtQnJvd3NlcjogKGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXSkgPT4gUGxhdGZvcm1SZWYgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICdicm93c2VyJywgSU5URVJOQUxfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlMpO1xuXG5leHBvcnQgY29uc3QgQlJPV1NFUl9NT0RVTEVfUFJPVklERVJTOiBTdGF0aWNQcm92aWRlcltdID0gW1xuICBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMsXG4gIHtwcm92aWRlOiBJTkpFQ1RPUl9TQ09QRSwgdXNlVmFsdWU6ICdyb290J30sXG4gIHtwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUZhY3Rvcnk6IGVycm9ySGFuZGxlciwgZGVwczogW119LFxuICB7XG4gICAgcHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICAgIHVzZUNsYXNzOiBEb21FdmVudHNQbHVnaW4sXG4gICAgbXVsdGk6IHRydWUsXG4gICAgZGVwczogW0RPQ1VNRU5ULCBOZ1pvbmUsIFBMQVRGT1JNX0lEXVxuICB9LFxuICB7cHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB1c2VDbGFzczogS2V5RXZlbnRzUGx1Z2luLCBtdWx0aTogdHJ1ZSwgZGVwczogW0RPQ1VNRU5UXX0sXG4gIEhBTU1FUl9QUk9WSURFUlMsXG4gIHtcbiAgICBwcm92aWRlOiBEb21SZW5kZXJlckZhY3RvcnkyLFxuICAgIHVzZUNsYXNzOiBEb21SZW5kZXJlckZhY3RvcnkyLFxuICAgIGRlcHM6IFtFdmVudE1hbmFnZXIsIERvbVNoYXJlZFN0eWxlc0hvc3QsIEFQUF9JRF1cbiAgfSxcbiAge3Byb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsIHVzZUV4aXN0aW5nOiBEb21SZW5kZXJlckZhY3RvcnkyfSxcbiAge3Byb3ZpZGU6IFNoYXJlZFN0eWxlc0hvc3QsIHVzZUV4aXN0aW5nOiBEb21TaGFyZWRTdHlsZXNIb3N0fSxcbiAge3Byb3ZpZGU6IERvbVNoYXJlZFN0eWxlc0hvc3QsIHVzZUNsYXNzOiBEb21TaGFyZWRTdHlsZXNIb3N0LCBkZXBzOiBbRE9DVU1FTlRdfSxcbiAge3Byb3ZpZGU6IFRlc3RhYmlsaXR5LCB1c2VDbGFzczogVGVzdGFiaWxpdHksIGRlcHM6IFtOZ1pvbmVdfSxcbiAge3Byb3ZpZGU6IEV2ZW50TWFuYWdlciwgdXNlQ2xhc3M6IEV2ZW50TWFuYWdlciwgZGVwczogW0VWRU5UX01BTkFHRVJfUExVR0lOUywgTmdab25lXX0sXG4gIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTLFxuXTtcblxuLyoqXG4gKiBFeHBvcnRzIHJlcXVpcmVkIGluZnJhc3RydWN0dXJlIGZvciBhbGwgQW5ndWxhciBhcHBzLlxuICogSW5jbHVkZWQgYnkgZGVmYXVsdCBpbiBhbGwgQW5ndWxhciBhcHBzIGNyZWF0ZWQgd2l0aCB0aGUgQ0xJXG4gKiBgbmV3YCBjb21tYW5kLlxuICogUmUtZXhwb3J0cyBgQ29tbW9uTW9kdWxlYCBhbmQgYEFwcGxpY2F0aW9uTW9kdWxlYCwgbWFraW5nIHRoZWlyXG4gKiBleHBvcnRzIGFuZCBwcm92aWRlcnMgYXZhaWxhYmxlIHRvIGFsbCBhcHBzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtwcm92aWRlcnM6IEJST1dTRVJfTU9EVUxFX1BST1ZJREVSUywgZXhwb3J0czogW0NvbW1vbk1vZHVsZSwgQXBwbGljYXRpb25Nb2R1bGVdfSlcbmV4cG9ydCBjbGFzcyBCcm93c2VyTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgQEluamVjdChCcm93c2VyTW9kdWxlKSBwYXJlbnRNb2R1bGU6IEJyb3dzZXJNb2R1bGV8bnVsbCkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgQnJvd3Nlck1vZHVsZSBoYXMgYWxyZWFkeSBiZWVuIGxvYWRlZC4gSWYgeW91IG5lZWQgYWNjZXNzIHRvIGNvbW1vbiBkaXJlY3RpdmVzIHN1Y2ggYXMgTmdJZiBhbmQgTmdGb3IgZnJvbSBhIGxhenkgbG9hZGVkIG1vZHVsZSwgaW1wb3J0IENvbW1vbk1vZHVsZSBpbnN0ZWFkLmApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGEgYnJvd3Nlci1iYXNlZCBhcHAgdG8gdHJhbnNpdGlvbiBmcm9tIGEgc2VydmVyLXJlbmRlcmVkIGFwcCwgaWZcbiAgICogb25lIGlzIHByZXNlbnQgb24gdGhlIHBhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgQW4gb2JqZWN0IGNvbnRhaW5pbmcgYW4gaWRlbnRpZmllciBmb3IgdGhlIGFwcCB0byB0cmFuc2l0aW9uLlxuICAgKiBUaGUgSUQgbXVzdCBtYXRjaCBiZXR3ZWVuIHRoZSBjbGllbnQgYW5kIHNlcnZlciB2ZXJzaW9ucyBvZiB0aGUgYXBwLlxuICAgKiBAcmV0dXJucyBUaGUgcmVjb25maWd1cmVkIGBCcm93c2VyTW9kdWxlYCB0byBpbXBvcnQgaW50byB0aGUgYXBwJ3Mgcm9vdCBgQXBwTW9kdWxlYC5cbiAgICovXG4gIHN0YXRpYyB3aXRoU2VydmVyVHJhbnNpdGlvbihwYXJhbXM6IHthcHBJZDogc3RyaW5nfSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QnJvd3Nlck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQnJvd3Nlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQVBQX0lELCB1c2VWYWx1ZTogcGFyYW1zLmFwcElkfSxcbiAgICAgICAge3Byb3ZpZGU6IFRSQU5TSVRJT05fSUQsIHVzZUV4aXN0aW5nOiBBUFBfSUR9LFxuICAgICAgICBTRVJWRVJfVFJBTlNJVElPTl9QUk9WSURFUlMsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==