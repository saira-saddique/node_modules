"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9uZS5hcGkuZXh0ZW5zaW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3pvbmUuanMvbGliL3pvbmUuYXBpLmV4dGVuc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBBZGRpdGlvbmFsIGBFdmVudFRhcmdldGAgbWV0aG9kcyBhZGRlZCBieSBgWm9uZS5qc2AuXG4gKlxuICogMS4gcmVtb3ZlQWxsTGlzdGVuZXJzLCByZW1vdmUgYWxsIGV2ZW50IGxpc3RlbmVycyBvZiB0aGUgZ2l2ZW4gZXZlbnQgbmFtZS5cbiAqIDIuIGV2ZW50TGlzdGVuZXJzLCBnZXQgYWxsIGV2ZW50IGxpc3RlbmVycyBvZiB0aGUgZ2l2ZW4gZXZlbnQgbmFtZS5cbiAqL1xuaW50ZXJmYWNlIEV2ZW50VGFyZ2V0IHtcbiAgLyoqXG4gICAqXG4gICAqIFJlbW92ZSBhbGwgZXZlbnQgbGlzdGVuZXJzIGJ5IG5hbWUgZm9yIHRoaXMgZXZlbnQgdGFyZ2V0LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBvcHRpb25hbCBiZWNhdXNlIGl0IG1heSBub3QgYmUgYXZhaWxhYmxlIGlmIHlvdSB1c2UgYG5vb3Agem9uZWAgd2hlblxuICAgKiBib290c3RyYXBwaW5nIEFuZ3VsYXIgYXBwbGljYXRpb24gb3IgZGlzYWJsZSB0aGUgYEV2ZW50VGFyZ2V0YCBtb25rZXkgcGF0Y2ggYnkgYHpvbmUuanNgLlxuICAgKlxuICAgKiBJZiB0aGUgYGV2ZW50TmFtZWAgaXMgcHJvdmlkZWQsIHdpbGwgcmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBvZiB0aGF0IG5hbWUuXG4gICAqIElmIHRoZSBgZXZlbnROYW1lYCBpcyBub3QgcHJvdmlkZWQsIHdpbGwgcmVtb3ZlIGFsbCBldmVudCBsaXN0ZW5lcnMgYXNzb2NpYXRlZCB3aXRoXG4gICAqIGBFdmVudFRhcmdldGAuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudE5hbWUgdGhlIG5hbWUgb2YgdGhlIGV2ZW50LCBzdWNoIGFzIGBjbGlja2AuIFRoaXMgcGFyYW1ldGVyIGlzIG9wdGlvbmFsLlxuICAgKi9cbiAgcmVtb3ZlQWxsTGlzdGVuZXJzPyhldmVudE5hbWU/OiBzdHJpbmcpOiB2b2lkO1xuICAvKipcbiAgICpcbiAgICogUmV0cmlldmUgYWxsIGV2ZW50IGxpc3RlbmVycyBieSBuYW1lLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBvcHRpb25hbCBiZWNhdXNlIGl0IG1heSBub3QgYmUgYXZhaWxhYmxlIGlmIHlvdSB1c2UgYG5vb3Agem9uZWAgd2hlblxuICAgKiBib290c3RyYXBwaW5nIEFuZ3VsYXIgYXBwbGljYXRpb24gb3IgZGlzYWJsZSB0aGUgYEV2ZW50VGFyZ2V0YCBtb25rZXkgcGF0Y2ggYnkgYHpvbmUuanNgLlxuICAgKlxuICAgKiBJZiB0aGUgYGV2ZW50TmFtZWAgaXMgcHJvdmlkZWQsIHdpbGwgcmV0dXJuIGFuIGFycmF5IG9mIGV2ZW50IGhhbmRsZXJzIG9yIGV2ZW50IGxpc3RlbmVyXG4gICAqIG9iamVjdHMgb2YgdGhlIGdpdmVuIGV2ZW50LlxuICAgKiBJZiB0aGUgYGV2ZW50TmFtZWAgaXMgbm90IHByb3ZpZGVkLCB3aWxsIHJldHVybiBhbGwgbGlzdGVuZXJzLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnROYW1lIHRoZSBuYW1lIG9mIHRoZSBldmVudCwgc3VjaCBhcyBjbGljay4gVGhpcyBwYXJhbWV0ZXIgaXMgb3B0aW9uYWwuXG4gICAqL1xuICBldmVudExpc3RlbmVycz8oZXZlbnROYW1lPzogc3RyaW5nKTogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdFtdO1xufVxuIl19