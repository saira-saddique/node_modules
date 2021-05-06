/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { makeParamDecorator } from '../util/decorators';
const ɵ0 = (token) => ({ token });
/**
 * Inject decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const Inject = makeParamDecorator('Inject', ɵ0);
/**
 * Optional decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const Optional = makeParamDecorator('Optional');
/**
 * Self decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const Self = makeParamDecorator('Self');
/**
 * `SkipSelf` decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const SkipSelf = makeParamDecorator('SkipSelf');
/**
 * Host decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const Host = makeParamDecorator('Host');
const ɵ1 = (attributeName) => ({ attributeName });
/**
 * Attribute decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const Attribute = makeParamDecorator('Attribute', ɵ1);
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztXQWlEYyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDO0FBTjdGOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFvQixrQkFBa0IsQ0FBQyxRQUFRLEtBQTRCLENBQUM7QUFxQy9GOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFzQixrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQXVDMUU7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQWtCLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBdUM5RDs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBc0Isa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7QUFrQzFFOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFrQixrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztXQXFEMUIsQ0FBQyxhQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLENBQUM7QUFQakY7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQ2xCLGtCQUFrQixDQUFDLFdBQVcsS0FBZ0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge21ha2VQYXJhbURlY29yYXRvcn0gZnJvbSAnLi4vdXRpbC9kZWNvcmF0b3JzJztcblxuXG5cbi8qKlxuICogVHlwZSBvZiB0aGUgSW5qZWN0IGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3REZWNvcmF0b3Ige1xuICAvKipcbiAgICogUGFyYW1ldGVyIGRlY29yYXRvciBvbiBhIGRlcGVuZGVuY3kgcGFyYW1ldGVyIG9mIGEgY2xhc3MgY29uc3RydWN0b3JcbiAgICogdGhhdCBzcGVjaWZpZXMgYSBjdXN0b20gcHJvdmlkZXIgb2YgdGhlIGRlcGVuZGVuY3kuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBzaG93cyBhIGNsYXNzIGNvbnN0cnVjdG9yIHRoYXQgc3BlY2lmaWVzIGFcbiAgICogY3VzdG9tIHByb3ZpZGVyIG9mIGEgZGVwZW5kZW5jeSB1c2luZyB0aGUgcGFyYW1ldGVyIGRlY29yYXRvci5cbiAgICpcbiAgICogV2hlbiBgQEluamVjdCgpYCBpcyBub3QgcHJlc2VudCwgdGhlIGluamVjdG9yIHVzZXMgdGhlIHR5cGUgYW5ub3RhdGlvbiBvZiB0aGVcbiAgICogcGFyYW1ldGVyIGFzIHRoZSBwcm92aWRlci5cbiAgICpcbiAgICogPGNvZGUtZXhhbXBsZSBwYXRoPVwiY29yZS9kaS90cy9tZXRhZGF0YV9zcGVjLnRzXCIgcmVnaW9uPVwiSW5qZWN0V2l0aG91dERlY29yYXRvclwiPlxuICAgKiA8L2NvZGUtZXhhbXBsZT5cbiAgICpcbiAgICogQHNlZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbilcbiAgICpcbiAgICovXG4gICh0b2tlbjogYW55KTogYW55O1xuICBuZXcodG9rZW46IGFueSk6IEluamVjdDtcbn1cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBJbmplY3QgbWV0YWRhdGEuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdCB7XG4gIC8qKlxuICAgKiBBIFtESSB0b2tlbl0oZ3VpZGUvZ2xvc3NhcnkjZGktdG9rZW4pIHRoYXQgbWFwcyB0byB0aGUgZGVwZW5kZW5jeSB0byBiZSBpbmplY3RlZC5cbiAgICovXG4gIHRva2VuOiBhbnk7XG59XG5cbi8qKlxuICogSW5qZWN0IGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICogQEFubm90YXRpb25cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IEluamVjdDogSW5qZWN0RGVjb3JhdG9yID0gbWFrZVBhcmFtRGVjb3JhdG9yKCdJbmplY3QnLCAodG9rZW46IGFueSkgPT4gKHt0b2tlbn0pKTtcblxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIE9wdGlvbmFsIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPcHRpb25hbERlY29yYXRvciB7XG4gIC8qKlxuICAgKiBQYXJhbWV0ZXIgZGVjb3JhdG9yIHRvIGJlIHVzZWQgb24gY29uc3RydWN0b3IgcGFyYW1ldGVycyxcbiAgICogd2hpY2ggbWFya3MgdGhlIHBhcmFtZXRlciBhcyBiZWluZyBhbiBvcHRpb25hbCBkZXBlbmRlbmN5LlxuICAgKiBUaGUgREkgZnJhbWV3b3JrIHByb3ZpZGVzIG51bGwgaWYgdGhlIGRlcGVuZGVuY3kgaXMgbm90IGZvdW5kLlxuICAgKlxuICAgKiBDYW4gYmUgdXNlZCB0b2dldGhlciB3aXRoIG90aGVyIHBhcmFtZXRlciBkZWNvcmF0b3JzXG4gICAqIHRoYXQgbW9kaWZ5IGhvdyBkZXBlbmRlbmN5IGluamVjdGlvbiBvcGVyYXRlcy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBjb2RlIGFsbG93cyB0aGUgcG9zc2liaWxpdHkgb2YgYSBudWxsIHJlc3VsdDpcbiAgICpcbiAgICogPGNvZGUtZXhhbXBsZSBwYXRoPVwiY29yZS9kaS90cy9tZXRhZGF0YV9zcGVjLnRzXCIgcmVnaW9uPVwiT3B0aW9uYWxcIj5cbiAgICogPC9jb2RlLWV4YW1wbGU+XG4gICAqXG4gICAqIEBzZWUgW1wiRGVwZW5kZW5jeSBJbmplY3Rpb24gR3VpZGVcIl0oZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24pLlxuICAgKi9cbiAgKCk6IGFueTtcbiAgbmV3KCk6IE9wdGlvbmFsO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIE9wdGlvbmFsIG1ldGFkYXRhLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPcHRpb25hbCB7fVxuXG4vKipcbiAqIE9wdGlvbmFsIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICogQEFubm90YXRpb25cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IE9wdGlvbmFsOiBPcHRpb25hbERlY29yYXRvciA9IG1ha2VQYXJhbURlY29yYXRvcignT3B0aW9uYWwnKTtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBTZWxmIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxmRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIFBhcmFtZXRlciBkZWNvcmF0b3IgdG8gYmUgdXNlZCBvbiBjb25zdHJ1Y3RvciBwYXJhbWV0ZXJzLFxuICAgKiB3aGljaCB0ZWxscyB0aGUgREkgZnJhbWV3b3JrIHRvIHN0YXJ0IGRlcGVuZGVuY3kgcmVzb2x1dGlvbiBmcm9tIHRoZSBsb2NhbCBpbmplY3Rvci5cbiAgICpcbiAgICogUmVzb2x1dGlvbiB3b3JrcyB1cHdhcmQgdGhyb3VnaCB0aGUgaW5qZWN0b3IgaGllcmFyY2h5LCBzbyB0aGUgY2hpbGRyZW5cbiAgICogb2YgdGhpcyBjbGFzcyBtdXN0IGNvbmZpZ3VyZSB0aGVpciBvd24gcHJvdmlkZXJzIG9yIGJlIHByZXBhcmVkIGZvciBhIG51bGwgcmVzdWx0LlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKlxuICAgKiBJbiB0aGUgZm9sbG93aW5nIGV4YW1wbGUsIHRoZSBkZXBlbmRlbmN5IGNhbiBiZSByZXNvbHZlZFxuICAgKiBieSB0aGUgbG9jYWwgaW5qZWN0b3Igd2hlbiBpbnN0YW50aWF0aW5nIHRoZSBjbGFzcyBpdHNlbGYsIGJ1dCBub3RcbiAgICogd2hlbiBpbnN0YW50aWF0aW5nIGEgY2hpbGQuXG4gICAqXG4gICAqIDxjb2RlLWV4YW1wbGUgcGF0aD1cImNvcmUvZGkvdHMvbWV0YWRhdGFfc3BlYy50c1wiIHJlZ2lvbj1cIlNlbGZcIj5cbiAgICogPC9jb2RlLWV4YW1wbGU+XG4gICAqXG4gICAqIEBzZWUgYFNraXBTZWxmYFxuICAgKiBAc2VlIGBPcHRpb25hbGBcbiAgICpcbiAgICovXG4gICgpOiBhbnk7XG4gIG5ldygpOiBTZWxmO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIFNlbGYgbWV0YWRhdGEuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNlbGYge31cblxuLyoqXG4gKiBTZWxmIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICogQEFubm90YXRpb25cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IFNlbGY6IFNlbGZEZWNvcmF0b3IgPSBtYWtlUGFyYW1EZWNvcmF0b3IoJ1NlbGYnKTtcblxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIGBTa2lwU2VsZmAgZGVjb3JhdG9yIC8gY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNraXBTZWxmRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIFBhcmFtZXRlciBkZWNvcmF0b3IgdG8gYmUgdXNlZCBvbiBjb25zdHJ1Y3RvciBwYXJhbWV0ZXJzLFxuICAgKiB3aGljaCB0ZWxscyB0aGUgREkgZnJhbWV3b3JrIHRvIHN0YXJ0IGRlcGVuZGVuY3kgcmVzb2x1dGlvbiBmcm9tIHRoZSBwYXJlbnQgaW5qZWN0b3IuXG4gICAqIFJlc29sdXRpb24gd29ya3MgdXB3YXJkIHRocm91Z2ggdGhlIGluamVjdG9yIGhpZXJhcmNoeSwgc28gdGhlIGxvY2FsIGluamVjdG9yXG4gICAqIGlzIG5vdCBjaGVja2VkIGZvciBhIHByb3ZpZGVyLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKlxuICAgKiBJbiB0aGUgZm9sbG93aW5nIGV4YW1wbGUsIHRoZSBkZXBlbmRlbmN5IGNhbiBiZSByZXNvbHZlZCB3aGVuXG4gICAqIGluc3RhbnRpYXRpbmcgYSBjaGlsZCwgYnV0IG5vdCB3aGVuIGluc3RhbnRpYXRpbmcgdGhlIGNsYXNzIGl0c2VsZi5cbiAgICpcbiAgICogPGNvZGUtZXhhbXBsZSBwYXRoPVwiY29yZS9kaS90cy9tZXRhZGF0YV9zcGVjLnRzXCIgcmVnaW9uPVwiU2tpcFNlbGZcIj5cbiAgICogPC9jb2RlLWV4YW1wbGU+XG4gICAqXG4gICAqIEBzZWUgW0RlcGVuZGVuY3kgSW5qZWN0aW9uIGd1aWRlXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbi1pbi1hY3Rpb24jc2tpcCkuXG4gICAqIEBzZWUgYFNlbGZgXG4gICAqIEBzZWUgYE9wdGlvbmFsYFxuICAgKlxuICAgKi9cbiAgKCk6IGFueTtcbiAgbmV3KCk6IFNraXBTZWxmO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIGBTa2lwU2VsZmAgbWV0YWRhdGEuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNraXBTZWxmIHt9XG5cbi8qKlxuICogYFNraXBTZWxmYCBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBTa2lwU2VsZjogU2tpcFNlbGZEZWNvcmF0b3IgPSBtYWtlUGFyYW1EZWNvcmF0b3IoJ1NraXBTZWxmJyk7XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgYEhvc3RgIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIb3N0RGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIFBhcmFtZXRlciBkZWNvcmF0b3Igb24gYSB2aWV3LXByb3ZpZGVyIHBhcmFtZXRlciBvZiBhIGNsYXNzIGNvbnN0cnVjdG9yXG4gICAqIHRoYXQgdGVsbHMgdGhlIERJIGZyYW1ld29yayB0byByZXNvbHZlIHRoZSB2aWV3IGJ5IGNoZWNraW5nIGluamVjdG9ycyBvZiBjaGlsZFxuICAgKiBlbGVtZW50cywgYW5kIHN0b3Agd2hlbiByZWFjaGluZyB0aGUgaG9zdCBlbGVtZW50IG9mIHRoZSBjdXJyZW50IGNvbXBvbmVudC5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBzaG93cyB1c2Ugd2l0aCB0aGUgYEBPcHRpb25hbGAgZGVjb3JhdG9yLCBhbmQgYWxsb3dzIGZvciBhIG51bGwgcmVzdWx0LlxuICAgKlxuICAgKiA8Y29kZS1leGFtcGxlIHBhdGg9XCJjb3JlL2RpL3RzL21ldGFkYXRhX3NwZWMudHNcIiByZWdpb249XCJIb3N0XCI+XG4gICAqIDwvY29kZS1leGFtcGxlPlxuICAgKlxuICAgKiBGb3IgYW4gZXh0ZW5kZWQgZXhhbXBsZSwgc2VlIFtcIkRlcGVuZGVuY3kgSW5qZWN0aW9uXG4gICAqIEd1aWRlXCJdKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uLWluLWFjdGlvbiNvcHRpb25hbCkuXG4gICAqL1xuICAoKTogYW55O1xuICBuZXcoKTogSG9zdDtcbn1cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBIb3N0IG1ldGFkYXRhLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIb3N0IHt9XG5cbi8qKlxuICogSG9zdCBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBIb3N0OiBIb3N0RGVjb3JhdG9yID0gbWFrZVBhcmFtRGVjb3JhdG9yKCdIb3N0Jyk7XG5cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBBdHRyaWJ1dGUgZGVjb3JhdG9yIC8gY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF0dHJpYnV0ZURlY29yYXRvciB7XG4gIC8qKlxuICAgKiBQYXJhbWV0ZXIgZGVjb3JhdG9yIGZvciBhIGRpcmVjdGl2ZSBjb25zdHJ1Y3RvciB0aGF0IGRlc2lnbmF0ZXNcbiAgICogYSBob3N0LWVsZW1lbnQgYXR0cmlidXRlIHdob3NlIHZhbHVlIGlzIGluamVjdGVkIGFzIGEgY29uc3RhbnQgc3RyaW5nIGxpdGVyYWwuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqXG4gICAqIFN1cHBvc2Ugd2UgaGF2ZSBhbiBgPGlucHV0PmAgZWxlbWVudCBhbmQgd2FudCB0byBrbm93IGl0cyBgdHlwZWAuXG4gICAqXG4gICAqIGBgYGh0bWxcbiAgICogPGlucHV0IHR5cGU9XCJ0ZXh0XCI+XG4gICAqIGBgYFxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgdXNlcyB0aGUgZGVjb3JhdG9yIHRvIGluamVjdCB0aGUgc3RyaW5nIGxpdGVyYWwgYHRleHRgIGluIGEgZGlyZWN0aXZlLlxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS90cy9tZXRhZGF0YS9tZXRhZGF0YS50cyByZWdpb249J2F0dHJpYnV0ZU1ldGFkYXRhJ31cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBleGFtcGxlIHVzZXMgdGhlIGRlY29yYXRvciBpbiBhIGNvbXBvbmVudCBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvdHMvbWV0YWRhdGEvbWV0YWRhdGEudHMgcmVnaW9uPSdhdHRyaWJ1dGVGYWN0b3J5J31cbiAgICpcbiAgICovXG4gIChuYW1lOiBzdHJpbmcpOiBhbnk7XG4gIG5ldyhuYW1lOiBzdHJpbmcpOiBBdHRyaWJ1dGU7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgQXR0cmlidXRlIG1ldGFkYXRhLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdHRyaWJ1dGUge1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB3aG9zZSB2YWx1ZSBjYW4gYmUgaW5qZWN0ZWQuXG4gICAqL1xuICBhdHRyaWJ1dGVOYW1lOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQXR0cmlidXRlIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICogQEFubm90YXRpb25cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IEF0dHJpYnV0ZTogQXR0cmlidXRlRGVjb3JhdG9yID1cbiAgICBtYWtlUGFyYW1EZWNvcmF0b3IoJ0F0dHJpYnV0ZScsIChhdHRyaWJ1dGVOYW1lPzogc3RyaW5nKSA9PiAoe2F0dHJpYnV0ZU5hbWV9KSk7XG4iXX0=