/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HttpHeaders } from './headers';
/**
 * Type enumeration for the different kinds of `HttpEvent`.
 *
 * @publicApi
 */
export var HttpEventType;
(function (HttpEventType) {
    /**
     * The request was sent out over the wire.
     */
    HttpEventType[HttpEventType["Sent"] = 0] = "Sent";
    /**
     * An upload progress event was received.
     */
    HttpEventType[HttpEventType["UploadProgress"] = 1] = "UploadProgress";
    /**
     * The response status code and headers were received.
     */
    HttpEventType[HttpEventType["ResponseHeader"] = 2] = "ResponseHeader";
    /**
     * A download progress event was received.
     */
    HttpEventType[HttpEventType["DownloadProgress"] = 3] = "DownloadProgress";
    /**
     * The full response including the body was received.
     */
    HttpEventType[HttpEventType["Response"] = 4] = "Response";
    /**
     * A custom event from an interceptor or a backend.
     */
    HttpEventType[HttpEventType["User"] = 5] = "User";
})(HttpEventType || (HttpEventType = {}));
/**
 * Base class for both `HttpResponse` and `HttpHeaderResponse`.
 *
 * @publicApi
 */
export class HttpResponseBase {
    /**
     * Super-constructor for all responses.
     *
     * The single parameter accepted is an initialization hash. Any properties
     * of the response passed there will override the default values.
     */
    constructor(init, defaultStatus = 200, defaultStatusText = 'OK') {
        // If the hash has values passed, use them to initialize the response.
        // Otherwise use the default values.
        this.headers = init.headers || new HttpHeaders();
        this.status = init.status !== undefined ? init.status : defaultStatus;
        this.statusText = init.statusText || defaultStatusText;
        this.url = init.url || null;
        // Cache the ok value to avoid defining a getter.
        this.ok = this.status >= 200 && this.status < 300;
    }
}
/**
 * A partial HTTP response which only includes the status and header data,
 * but no response body.
 *
 * `HttpHeaderResponse` is a `HttpEvent` available on the response
 * event stream, only when progress events are requested.
 *
 * @publicApi
 */
export class HttpHeaderResponse extends HttpResponseBase {
    /**
     * Create a new `HttpHeaderResponse` with the given parameters.
     */
    constructor(init = {}) {
        super(init);
        this.type = HttpEventType.ResponseHeader;
    }
    /**
     * Copy this `HttpHeaderResponse`, overriding its contents with the
     * given parameter hash.
     */
    clone(update = {}) {
        // Perform a straightforward initialization of the new HttpHeaderResponse,
        // overriding the current parameters with new ones if given.
        return new HttpHeaderResponse({
            headers: update.headers || this.headers,
            status: update.status !== undefined ? update.status : this.status,
            statusText: update.statusText || this.statusText,
            url: update.url || this.url || undefined,
        });
    }
}
/**
 * A full HTTP response, including a typed response body (which may be `null`
 * if one was not returned).
 *
 * `HttpResponse` is a `HttpEvent` available on the response event
 * stream.
 *
 * @publicApi
 */
export class HttpResponse extends HttpResponseBase {
    /**
     * Construct a new `HttpResponse`.
     */
    constructor(init = {}) {
        super(init);
        this.type = HttpEventType.Response;
        this.body = init.body !== undefined ? init.body : null;
    }
    clone(update = {}) {
        return new HttpResponse({
            body: (update.body !== undefined) ? update.body : this.body,
            headers: update.headers || this.headers,
            status: (update.status !== undefined) ? update.status : this.status,
            statusText: update.statusText || this.statusText,
            url: update.url || this.url || undefined,
        });
    }
}
/**
 * A response that represents an error or failure, either from a
 * non-successful HTTP status, an error while executing the request,
 * or some other failure which occurred during the parsing of the response.
 *
 * Any error returned on the `Observable` response stream will be
 * wrapped in an `HttpErrorResponse` to provide additional context about
 * the state of the HTTP layer when the error occurred. The error property
 * will contain either a wrapped Error object or the error response returned
 * from the server.
 *
 * @publicApi
 */
export class HttpErrorResponse extends HttpResponseBase {
    constructor(init) {
        // Initialize with a default status of 0 / Unknown Error.
        super(init, 0, 'Unknown Error');
        this.name = 'HttpErrorResponse';
        /**
         * Errors are never okay, even when the status code is in the 2xx success range.
         */
        this.ok = false;
        // If the response was successful, then this was a parse error. Otherwise, it was
        // a protocol-level failure of some sort. Either the request failed in transit
        // or the server returned an unsuccessful status code.
        if (this.status >= 200 && this.status < 300) {
            this.message = `Http failure during parsing for ${init.url || '(unknown url)'}`;
        }
        else {
            this.message = `Http failure response for ${init.url || '(unknown url)'}: ${init.status} ${init.statusText}`;
        }
        this.error = init.error || null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vaHR0cC9zcmMvcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUV0Qzs7OztHQUlHO0FBQ0gsTUFBTSxDQUFOLElBQVksYUE4Qlg7QUE5QkQsV0FBWSxhQUFhO0lBQ3ZCOztPQUVHO0lBQ0gsaURBQUksQ0FBQTtJQUVKOztPQUVHO0lBQ0gscUVBQWMsQ0FBQTtJQUVkOztPQUVHO0lBQ0gscUVBQWMsQ0FBQTtJQUVkOztPQUVHO0lBQ0gseUVBQWdCLENBQUE7SUFFaEI7O09BRUc7SUFDSCx5REFBUSxDQUFBO0lBRVI7O09BRUc7SUFDSCxpREFBSSxDQUFBO0FBQ04sQ0FBQyxFQTlCVyxhQUFhLEtBQWIsYUFBYSxRQThCeEI7QUFnR0Q7Ozs7R0FJRztBQUNILE1BQU0sT0FBZ0IsZ0JBQWdCO0lBa0NwQzs7Ozs7T0FLRztJQUNILFlBQ0ksSUFLQyxFQUNELGdCQUF3QixHQUFHLEVBQUUsb0JBQTRCLElBQUk7UUFDL0Qsc0VBQXNFO1FBQ3RFLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDdEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLGlCQUFpQixDQUFDO1FBQ3ZELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7UUFFNUIsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDcEQsQ0FBQztDQUNGO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsZ0JBQWdCO0lBQ3REOztPQUVHO0lBQ0gsWUFBWSxPQUtSLEVBQUU7UUFDSixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHTCxTQUFJLEdBQWlDLGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFGM0UsQ0FBQztJQUlEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxTQUF1RixFQUFFO1FBRTdGLDBFQUEwRTtRQUMxRSw0REFBNEQ7UUFDNUQsT0FBTyxJQUFJLGtCQUFrQixDQUFDO1lBQzVCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPO1lBQ3ZDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDakUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVU7WUFDaEQsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxTQUFTO1NBQ3pDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQUVEOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxPQUFPLFlBQWdCLFNBQVEsZ0JBQWdCO0lBTW5EOztPQUVHO0lBQ0gsWUFBWSxPQU1SLEVBQUU7UUFDSixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFJTCxTQUFJLEdBQTJCLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFIN0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3pELENBQUM7SUFjRCxLQUFLLENBQUMsU0FNRixFQUFFO1FBQ0osT0FBTyxJQUFJLFlBQVksQ0FBTTtZQUMzQixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUMzRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTztZQUN2QyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUNuRSxVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVTtZQUNoRCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLFNBQVM7U0FDekMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBRUQ7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxPQUFPLGlCQUFrQixTQUFRLGdCQUFnQjtJQVVyRCxZQUFZLElBTVg7UUFDQyx5REFBeUQ7UUFDekQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFqQnpCLFNBQUksR0FBRyxtQkFBbUIsQ0FBQztRQUlwQzs7V0FFRztRQUNNLE9BQUUsR0FBRyxLQUFLLENBQUM7UUFZbEIsaUZBQWlGO1FBQ2pGLDhFQUE4RTtRQUM5RSxzREFBc0Q7UUFDdEQsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLG1DQUFtQyxJQUFJLENBQUMsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1NBQ2pGO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLDZCQUE2QixJQUFJLENBQUMsR0FBRyxJQUFJLGVBQWUsS0FBSyxJQUFJLENBQUMsTUFBTSxJQUNuRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO0lBQ2xDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0h0dHBIZWFkZXJzfSBmcm9tICcuL2hlYWRlcnMnO1xuXG4vKipcbiAqIFR5cGUgZW51bWVyYXRpb24gZm9yIHRoZSBkaWZmZXJlbnQga2luZHMgb2YgYEh0dHBFdmVudGAuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZW51bSBIdHRwRXZlbnRUeXBlIHtcbiAgLyoqXG4gICAqIFRoZSByZXF1ZXN0IHdhcyBzZW50IG91dCBvdmVyIHRoZSB3aXJlLlxuICAgKi9cbiAgU2VudCxcblxuICAvKipcbiAgICogQW4gdXBsb2FkIHByb2dyZXNzIGV2ZW50IHdhcyByZWNlaXZlZC5cbiAgICovXG4gIFVwbG9hZFByb2dyZXNzLFxuXG4gIC8qKlxuICAgKiBUaGUgcmVzcG9uc2Ugc3RhdHVzIGNvZGUgYW5kIGhlYWRlcnMgd2VyZSByZWNlaXZlZC5cbiAgICovXG4gIFJlc3BvbnNlSGVhZGVyLFxuXG4gIC8qKlxuICAgKiBBIGRvd25sb2FkIHByb2dyZXNzIGV2ZW50IHdhcyByZWNlaXZlZC5cbiAgICovXG4gIERvd25sb2FkUHJvZ3Jlc3MsXG5cbiAgLyoqXG4gICAqIFRoZSBmdWxsIHJlc3BvbnNlIGluY2x1ZGluZyB0aGUgYm9keSB3YXMgcmVjZWl2ZWQuXG4gICAqL1xuICBSZXNwb25zZSxcblxuICAvKipcbiAgICogQSBjdXN0b20gZXZlbnQgZnJvbSBhbiBpbnRlcmNlcHRvciBvciBhIGJhY2tlbmQuXG4gICAqL1xuICBVc2VyLFxufVxuXG4vKipcbiAqIEJhc2UgaW50ZXJmYWNlIGZvciBwcm9ncmVzcyBldmVudHMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEh0dHBQcm9ncmVzc0V2ZW50IHtcbiAgLyoqXG4gICAqIFByb2dyZXNzIGV2ZW50IHR5cGUgaXMgZWl0aGVyIHVwbG9hZCBvciBkb3dubG9hZC5cbiAgICovXG4gIHR5cGU6IEh0dHBFdmVudFR5cGUuRG93bmxvYWRQcm9ncmVzc3xIdHRwRXZlbnRUeXBlLlVwbG9hZFByb2dyZXNzO1xuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgYnl0ZXMgdXBsb2FkZWQgb3IgZG93bmxvYWRlZC5cbiAgICovXG4gIGxvYWRlZDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUb3RhbCBudW1iZXIgb2YgYnl0ZXMgdG8gdXBsb2FkIG9yIGRvd25sb2FkLiBEZXBlbmRpbmcgb24gdGhlIHJlcXVlc3Qgb3JcbiAgICogcmVzcG9uc2UsIHRoaXMgbWF5IG5vdCBiZSBjb21wdXRhYmxlIGFuZCB0aHVzIG1heSBub3QgYmUgcHJlc2VudC5cbiAgICovXG4gIHRvdGFsPzogbnVtYmVyO1xufVxuXG4vKipcbiAqIEEgZG93bmxvYWQgcHJvZ3Jlc3MgZXZlbnQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEh0dHBEb3dubG9hZFByb2dyZXNzRXZlbnQgZXh0ZW5kcyBIdHRwUHJvZ3Jlc3NFdmVudCB7XG4gIHR5cGU6IEh0dHBFdmVudFR5cGUuRG93bmxvYWRQcm9ncmVzcztcblxuICAvKipcbiAgICogVGhlIHBhcnRpYWwgcmVzcG9uc2UgYm9keSBhcyBkb3dubG9hZGVkIHNvIGZhci5cbiAgICpcbiAgICogT25seSBwcmVzZW50IGlmIHRoZSByZXNwb25zZVR5cGUgd2FzIGB0ZXh0YC5cbiAgICovXG4gIHBhcnRpYWxUZXh0Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFuIHVwbG9hZCBwcm9ncmVzcyBldmVudC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSHR0cFVwbG9hZFByb2dyZXNzRXZlbnQgZXh0ZW5kcyBIdHRwUHJvZ3Jlc3NFdmVudCB7XG4gIHR5cGU6IEh0dHBFdmVudFR5cGUuVXBsb2FkUHJvZ3Jlc3M7XG59XG5cbi8qKlxuICogQW4gZXZlbnQgaW5kaWNhdGluZyB0aGF0IHRoZSByZXF1ZXN0IHdhcyBzZW50IHRvIHRoZSBzZXJ2ZXIuIFVzZWZ1bFxuICogd2hlbiBhIHJlcXVlc3QgbWF5IGJlIHJldHJpZWQgbXVsdGlwbGUgdGltZXMsIHRvIGRpc3Rpbmd1aXNoIGJldHdlZW5cbiAqIHJldHJpZXMgb24gdGhlIGZpbmFsIGV2ZW50IHN0cmVhbS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSHR0cFNlbnRFdmVudCB7XG4gIHR5cGU6IEh0dHBFdmVudFR5cGUuU2VudDtcbn1cblxuLyoqXG4gKiBBIHVzZXItZGVmaW5lZCBldmVudC5cbiAqXG4gKiBHcm91cGluZyBhbGwgY3VzdG9tIGV2ZW50cyB1bmRlciB0aGlzIHR5cGUgZW5zdXJlcyB0aGV5IHdpbGwgYmUgaGFuZGxlZFxuICogYW5kIGZvcndhcmRlZCBieSBhbGwgaW1wbGVtZW50YXRpb25zIG9mIGludGVyY2VwdG9ycy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSHR0cFVzZXJFdmVudDxUPiB7XG4gIHR5cGU6IEh0dHBFdmVudFR5cGUuVXNlcjtcbn1cblxuLyoqXG4gKiBBbiBlcnJvciB0aGF0IHJlcHJlc2VudHMgYSBmYWlsZWQgYXR0ZW1wdCB0byBKU09OLnBhcnNlIHRleHQgY29taW5nIGJhY2tcbiAqIGZyb20gdGhlIHNlcnZlci5cbiAqXG4gKiBJdCBidW5kbGVzIHRoZSBFcnJvciBvYmplY3Qgd2l0aCB0aGUgYWN0dWFsIHJlc3BvbnNlIGJvZHkgdGhhdCBmYWlsZWQgdG8gcGFyc2UuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIdHRwSnNvblBhcnNlRXJyb3Ige1xuICBlcnJvcjogRXJyb3I7XG4gIHRleHQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBVbmlvbiB0eXBlIGZvciBhbGwgcG9zc2libGUgZXZlbnRzIG9uIHRoZSByZXNwb25zZSBzdHJlYW0uXG4gKlxuICogVHlwZWQgYWNjb3JkaW5nIHRvIHRoZSBleHBlY3RlZCB0eXBlIG9mIHRoZSByZXNwb25zZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIEh0dHBFdmVudDxUPiA9XG4gICAgSHR0cFNlbnRFdmVudHxIdHRwSGVhZGVyUmVzcG9uc2V8SHR0cFJlc3BvbnNlPFQ+fEh0dHBQcm9ncmVzc0V2ZW50fEh0dHBVc2VyRXZlbnQ8VD47XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgYm90aCBgSHR0cFJlc3BvbnNlYCBhbmQgYEh0dHBIZWFkZXJSZXNwb25zZWAuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHR0cFJlc3BvbnNlQmFzZSB7XG4gIC8qKlxuICAgKiBBbGwgcmVzcG9uc2UgaGVhZGVycy5cbiAgICovXG4gIHJlYWRvbmx5IGhlYWRlcnM6IEh0dHBIZWFkZXJzO1xuXG4gIC8qKlxuICAgKiBSZXNwb25zZSBzdGF0dXMgY29kZS5cbiAgICovXG4gIHJlYWRvbmx5IHN0YXR1czogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUZXh0dWFsIGRlc2NyaXB0aW9uIG9mIHJlc3BvbnNlIHN0YXR1cyBjb2RlLlxuICAgKlxuICAgKiBEbyBub3QgZGVwZW5kIG9uIHRoaXMuXG4gICAqL1xuICByZWFkb25seSBzdGF0dXNUZXh0OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFVSTCBvZiB0aGUgcmVzb3VyY2UgcmV0cmlldmVkLCBvciBudWxsIGlmIG5vdCBhdmFpbGFibGUuXG4gICAqL1xuICByZWFkb25seSB1cmw6IHN0cmluZ3xudWxsO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBzdGF0dXMgY29kZSBmYWxscyBpbiB0aGUgMnh4IHJhbmdlLlxuICAgKi9cbiAgcmVhZG9ubHkgb2s6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgdGhlIHJlc3BvbnNlLCBuYXJyb3dlZCB0byBlaXRoZXIgdGhlIGZ1bGwgcmVzcG9uc2Ugb3IgdGhlIGhlYWRlci5cbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICByZWFkb25seSB0eXBlITogSHR0cEV2ZW50VHlwZS5SZXNwb25zZXxIdHRwRXZlbnRUeXBlLlJlc3BvbnNlSGVhZGVyO1xuXG4gIC8qKlxuICAgKiBTdXBlci1jb25zdHJ1Y3RvciBmb3IgYWxsIHJlc3BvbnNlcy5cbiAgICpcbiAgICogVGhlIHNpbmdsZSBwYXJhbWV0ZXIgYWNjZXB0ZWQgaXMgYW4gaW5pdGlhbGl6YXRpb24gaGFzaC4gQW55IHByb3BlcnRpZXNcbiAgICogb2YgdGhlIHJlc3BvbnNlIHBhc3NlZCB0aGVyZSB3aWxsIG92ZXJyaWRlIHRoZSBkZWZhdWx0IHZhbHVlcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgaW5pdDoge1xuICAgICAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXG4gICAgICAgIHN0YXR1cz86IG51bWJlcixcbiAgICAgICAgc3RhdHVzVGV4dD86IHN0cmluZyxcbiAgICAgICAgdXJsPzogc3RyaW5nLFxuICAgICAgfSxcbiAgICAgIGRlZmF1bHRTdGF0dXM6IG51bWJlciA9IDIwMCwgZGVmYXVsdFN0YXR1c1RleHQ6IHN0cmluZyA9ICdPSycpIHtcbiAgICAvLyBJZiB0aGUgaGFzaCBoYXMgdmFsdWVzIHBhc3NlZCwgdXNlIHRoZW0gdG8gaW5pdGlhbGl6ZSB0aGUgcmVzcG9uc2UuXG4gICAgLy8gT3RoZXJ3aXNlIHVzZSB0aGUgZGVmYXVsdCB2YWx1ZXMuXG4gICAgdGhpcy5oZWFkZXJzID0gaW5pdC5oZWFkZXJzIHx8IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIHRoaXMuc3RhdHVzID0gaW5pdC5zdGF0dXMgIT09IHVuZGVmaW5lZCA/IGluaXQuc3RhdHVzIDogZGVmYXVsdFN0YXR1cztcbiAgICB0aGlzLnN0YXR1c1RleHQgPSBpbml0LnN0YXR1c1RleHQgfHwgZGVmYXVsdFN0YXR1c1RleHQ7XG4gICAgdGhpcy51cmwgPSBpbml0LnVybCB8fCBudWxsO1xuXG4gICAgLy8gQ2FjaGUgdGhlIG9rIHZhbHVlIHRvIGF2b2lkIGRlZmluaW5nIGEgZ2V0dGVyLlxuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDA7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHBhcnRpYWwgSFRUUCByZXNwb25zZSB3aGljaCBvbmx5IGluY2x1ZGVzIHRoZSBzdGF0dXMgYW5kIGhlYWRlciBkYXRhLFxuICogYnV0IG5vIHJlc3BvbnNlIGJvZHkuXG4gKlxuICogYEh0dHBIZWFkZXJSZXNwb25zZWAgaXMgYSBgSHR0cEV2ZW50YCBhdmFpbGFibGUgb24gdGhlIHJlc3BvbnNlXG4gKiBldmVudCBzdHJlYW0sIG9ubHkgd2hlbiBwcm9ncmVzcyBldmVudHMgYXJlIHJlcXVlc3RlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjbGFzcyBIdHRwSGVhZGVyUmVzcG9uc2UgZXh0ZW5kcyBIdHRwUmVzcG9uc2VCYXNlIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBgSHR0cEhlYWRlclJlc3BvbnNlYCB3aXRoIHRoZSBnaXZlbiBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5pdDoge1xuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcbiAgICBzdGF0dXM/OiBudW1iZXIsXG4gICAgc3RhdHVzVGV4dD86IHN0cmluZyxcbiAgICB1cmw/OiBzdHJpbmcsXG4gIH0gPSB7fSkge1xuICAgIHN1cGVyKGluaXQpO1xuICB9XG5cbiAgcmVhZG9ubHkgdHlwZTogSHR0cEV2ZW50VHlwZS5SZXNwb25zZUhlYWRlciA9IEh0dHBFdmVudFR5cGUuUmVzcG9uc2VIZWFkZXI7XG5cbiAgLyoqXG4gICAqIENvcHkgdGhpcyBgSHR0cEhlYWRlclJlc3BvbnNlYCwgb3ZlcnJpZGluZyBpdHMgY29udGVudHMgd2l0aCB0aGVcbiAgICogZ2l2ZW4gcGFyYW1ldGVyIGhhc2guXG4gICAqL1xuICBjbG9uZSh1cGRhdGU6IHtoZWFkZXJzPzogSHR0cEhlYWRlcnM7IHN0YXR1cz86IG51bWJlcjsgc3RhdHVzVGV4dD86IHN0cmluZzsgdXJsPzogc3RyaW5nO30gPSB7fSk6XG4gICAgICBIdHRwSGVhZGVyUmVzcG9uc2Uge1xuICAgIC8vIFBlcmZvcm0gYSBzdHJhaWdodGZvcndhcmQgaW5pdGlhbGl6YXRpb24gb2YgdGhlIG5ldyBIdHRwSGVhZGVyUmVzcG9uc2UsXG4gICAgLy8gb3ZlcnJpZGluZyB0aGUgY3VycmVudCBwYXJhbWV0ZXJzIHdpdGggbmV3IG9uZXMgaWYgZ2l2ZW4uXG4gICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVyUmVzcG9uc2Uoe1xuICAgICAgaGVhZGVyczogdXBkYXRlLmhlYWRlcnMgfHwgdGhpcy5oZWFkZXJzLFxuICAgICAgc3RhdHVzOiB1cGRhdGUuc3RhdHVzICE9PSB1bmRlZmluZWQgPyB1cGRhdGUuc3RhdHVzIDogdGhpcy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiB1cGRhdGUuc3RhdHVzVGV4dCB8fCB0aGlzLnN0YXR1c1RleHQsXG4gICAgICB1cmw6IHVwZGF0ZS51cmwgfHwgdGhpcy51cmwgfHwgdW5kZWZpbmVkLFxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQSBmdWxsIEhUVFAgcmVzcG9uc2UsIGluY2x1ZGluZyBhIHR5cGVkIHJlc3BvbnNlIGJvZHkgKHdoaWNoIG1heSBiZSBgbnVsbGBcbiAqIGlmIG9uZSB3YXMgbm90IHJldHVybmVkKS5cbiAqXG4gKiBgSHR0cFJlc3BvbnNlYCBpcyBhIGBIdHRwRXZlbnRgIGF2YWlsYWJsZSBvbiB0aGUgcmVzcG9uc2UgZXZlbnRcbiAqIHN0cmVhbS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjbGFzcyBIdHRwUmVzcG9uc2U8VD4gZXh0ZW5kcyBIdHRwUmVzcG9uc2VCYXNlIHtcbiAgLyoqXG4gICAqIFRoZSByZXNwb25zZSBib2R5LCBvciBgbnVsbGAgaWYgb25lIHdhcyBub3QgcmV0dXJuZWQuXG4gICAqL1xuICByZWFkb25seSBib2R5OiBUfG51bGw7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBgSHR0cFJlc3BvbnNlYC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGluaXQ6IHtcbiAgICBib2R5PzogVHxudWxsLFxuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgICBzdGF0dXM/OiBudW1iZXI7XG4gICAgc3RhdHVzVGV4dD86IHN0cmluZztcbiAgICB1cmw/OiBzdHJpbmc7XG4gIH0gPSB7fSkge1xuICAgIHN1cGVyKGluaXQpO1xuICAgIHRoaXMuYm9keSA9IGluaXQuYm9keSAhPT0gdW5kZWZpbmVkID8gaW5pdC5ib2R5IDogbnVsbDtcbiAgfVxuXG4gIHJlYWRvbmx5IHR5cGU6IEh0dHBFdmVudFR5cGUuUmVzcG9uc2UgPSBIdHRwRXZlbnRUeXBlLlJlc3BvbnNlO1xuXG4gIGNsb25lKCk6IEh0dHBSZXNwb25zZTxUPjtcbiAgY2xvbmUodXBkYXRlOiB7aGVhZGVycz86IEh0dHBIZWFkZXJzOyBzdGF0dXM/OiBudW1iZXI7IHN0YXR1c1RleHQ/OiBzdHJpbmc7IHVybD86IHN0cmluZzt9KTpcbiAgICAgIEh0dHBSZXNwb25zZTxUPjtcbiAgY2xvbmU8Vj4odXBkYXRlOiB7XG4gICAgYm9keT86IFZ8bnVsbCxcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4gICAgc3RhdHVzPzogbnVtYmVyO1xuICAgIHN0YXR1c1RleHQ/OiBzdHJpbmc7XG4gICAgdXJsPzogc3RyaW5nO1xuICB9KTogSHR0cFJlc3BvbnNlPFY+O1xuICBjbG9uZSh1cGRhdGU6IHtcbiAgICBib2R5PzogYW55fG51bGw7XG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xuICAgIHN0YXR1cz86IG51bWJlcjtcbiAgICBzdGF0dXNUZXh0Pzogc3RyaW5nO1xuICAgIHVybD86IHN0cmluZztcbiAgfSA9IHt9KTogSHR0cFJlc3BvbnNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgSHR0cFJlc3BvbnNlPGFueT4oe1xuICAgICAgYm9keTogKHVwZGF0ZS5ib2R5ICE9PSB1bmRlZmluZWQpID8gdXBkYXRlLmJvZHkgOiB0aGlzLmJvZHksXG4gICAgICBoZWFkZXJzOiB1cGRhdGUuaGVhZGVycyB8fCB0aGlzLmhlYWRlcnMsXG4gICAgICBzdGF0dXM6ICh1cGRhdGUuc3RhdHVzICE9PSB1bmRlZmluZWQpID8gdXBkYXRlLnN0YXR1cyA6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdXBkYXRlLnN0YXR1c1RleHQgfHwgdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgdXJsOiB1cGRhdGUudXJsIHx8IHRoaXMudXJsIHx8IHVuZGVmaW5lZCxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEEgcmVzcG9uc2UgdGhhdCByZXByZXNlbnRzIGFuIGVycm9yIG9yIGZhaWx1cmUsIGVpdGhlciBmcm9tIGFcbiAqIG5vbi1zdWNjZXNzZnVsIEhUVFAgc3RhdHVzLCBhbiBlcnJvciB3aGlsZSBleGVjdXRpbmcgdGhlIHJlcXVlc3QsXG4gKiBvciBzb21lIG90aGVyIGZhaWx1cmUgd2hpY2ggb2NjdXJyZWQgZHVyaW5nIHRoZSBwYXJzaW5nIG9mIHRoZSByZXNwb25zZS5cbiAqXG4gKiBBbnkgZXJyb3IgcmV0dXJuZWQgb24gdGhlIGBPYnNlcnZhYmxlYCByZXNwb25zZSBzdHJlYW0gd2lsbCBiZVxuICogd3JhcHBlZCBpbiBhbiBgSHR0cEVycm9yUmVzcG9uc2VgIHRvIHByb3ZpZGUgYWRkaXRpb25hbCBjb250ZXh0IGFib3V0XG4gKiB0aGUgc3RhdGUgb2YgdGhlIEhUVFAgbGF5ZXIgd2hlbiB0aGUgZXJyb3Igb2NjdXJyZWQuIFRoZSBlcnJvciBwcm9wZXJ0eVxuICogd2lsbCBjb250YWluIGVpdGhlciBhIHdyYXBwZWQgRXJyb3Igb2JqZWN0IG9yIHRoZSBlcnJvciByZXNwb25zZSByZXR1cm5lZFxuICogZnJvbSB0aGUgc2VydmVyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIEh0dHBFcnJvclJlc3BvbnNlIGV4dGVuZHMgSHR0cFJlc3BvbnNlQmFzZSBpbXBsZW1lbnRzIEVycm9yIHtcbiAgcmVhZG9ubHkgbmFtZSA9ICdIdHRwRXJyb3JSZXNwb25zZSc7XG4gIHJlYWRvbmx5IG1lc3NhZ2U6IHN0cmluZztcbiAgcmVhZG9ubHkgZXJyb3I6IGFueXxudWxsO1xuXG4gIC8qKlxuICAgKiBFcnJvcnMgYXJlIG5ldmVyIG9rYXksIGV2ZW4gd2hlbiB0aGUgc3RhdHVzIGNvZGUgaXMgaW4gdGhlIDJ4eCBzdWNjZXNzIHJhbmdlLlxuICAgKi9cbiAgcmVhZG9ubHkgb2sgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihpbml0OiB7XG4gICAgZXJyb3I/OiBhbnk7XG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xuICAgIHN0YXR1cz86IG51bWJlcjtcbiAgICBzdGF0dXNUZXh0Pzogc3RyaW5nO1xuICAgIHVybD86IHN0cmluZztcbiAgfSkge1xuICAgIC8vIEluaXRpYWxpemUgd2l0aCBhIGRlZmF1bHQgc3RhdHVzIG9mIDAgLyBVbmtub3duIEVycm9yLlxuICAgIHN1cGVyKGluaXQsIDAsICdVbmtub3duIEVycm9yJyk7XG5cbiAgICAvLyBJZiB0aGUgcmVzcG9uc2Ugd2FzIHN1Y2Nlc3NmdWwsIHRoZW4gdGhpcyB3YXMgYSBwYXJzZSBlcnJvci4gT3RoZXJ3aXNlLCBpdCB3YXNcbiAgICAvLyBhIHByb3RvY29sLWxldmVsIGZhaWx1cmUgb2Ygc29tZSBzb3J0LiBFaXRoZXIgdGhlIHJlcXVlc3QgZmFpbGVkIGluIHRyYW5zaXRcbiAgICAvLyBvciB0aGUgc2VydmVyIHJldHVybmVkIGFuIHVuc3VjY2Vzc2Z1bCBzdGF0dXMgY29kZS5cbiAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSBgSHR0cCBmYWlsdXJlIGR1cmluZyBwYXJzaW5nIGZvciAke2luaXQudXJsIHx8ICcodW5rbm93biB1cmwpJ31gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSBgSHR0cCBmYWlsdXJlIHJlc3BvbnNlIGZvciAke2luaXQudXJsIHx8ICcodW5rbm93biB1cmwpJ306ICR7aW5pdC5zdGF0dXN9ICR7XG4gICAgICAgICAgaW5pdC5zdGF0dXNUZXh0fWA7XG4gICAgfVxuICAgIHRoaXMuZXJyb3IgPSBpbml0LmVycm9yIHx8IG51bGw7XG4gIH1cbn1cbiJdfQ==