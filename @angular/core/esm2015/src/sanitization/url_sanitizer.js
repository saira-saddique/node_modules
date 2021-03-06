/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isDevMode } from '../util/is_dev_mode';
/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * This regular expression matches a subset of URLs that will not cause script
 * execution if used in URL context within a HTML document. Specifically, this
 * regular expression matches if (comment from here on and regex copied from
 * Soy's EscapingConventions):
 * (1) Either an allowed protocol (http, https, mailto or ftp).
 * (2) or no protocol.  A protocol must be followed by a colon. The below
 *     allows that by allowing colons only after one of the characters [/?#].
 *     A colon after a hash (#) must be in the fragment.
 *     Otherwise, a colon after a (?) must be in a query.
 *     Otherwise, a colon after a single solidus (/) must be in a path.
 *     Otherwise, a colon after a double solidus (//) must be in the authority
 *     (before port).
 *
 * The pattern disallows &, used in HTML entity declarations before
 * one of the characters in [/?#]. This disallows HTML entities used in the
 * protocol name, which should never happen, e.g. "h&#116;tp" for "http".
 * It also disallows HTML entities in the first path part of a relative path,
 * e.g. "foo&lt;bar/baz".  Our existing escaping functions should not produce
 * that. More importantly, it disallows masking of a colon,
 * e.g. "javascript&#58;...".
 *
 * This regular expression was taken from the Closure sanitization library.
 */
const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
/* A pattern that matches safe srcset values */
const SAFE_SRCSET_PATTERN = /^(?:(?:https?|file):|[^&:/?#]*(?:[/?#]|$))/gi;
/** A pattern that matches safe data URLs. Only matches image, video and audio types. */
const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
export function _sanitizeUrl(url) {
    url = String(url);
    if (url.match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN))
        return url;
    if (isDevMode()) {
        console.warn(`WARNING: sanitizing unsafe URL value ${url} (see http://g.co/ng/security#xss)`);
    }
    return 'unsafe:' + url;
}
export function sanitizeSrcset(srcset) {
    srcset = String(srcset);
    return srcset.split(',').map((srcset) => _sanitizeUrl(srcset.trim())).join(', ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3Nhbml0aXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3Nhbml0aXphdGlvbi91cmxfc2FuaXRpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sZ0JBQWdCLEdBQUcsaUVBQWlFLENBQUM7QUFFM0YsK0NBQStDO0FBQy9DLE1BQU0sbUJBQW1CLEdBQUcsOENBQThDLENBQUM7QUFFM0Usd0ZBQXdGO0FBQ3hGLE1BQU0sZ0JBQWdCLEdBQ2xCLHNJQUFzSSxDQUFDO0FBRTNJLE1BQU0sVUFBVSxZQUFZLENBQUMsR0FBVztJQUN0QyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7UUFBRSxPQUFPLEdBQUcsQ0FBQztJQUUzRSxJQUFJLFNBQVMsRUFBRSxFQUFFO1FBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsR0FBRyxvQ0FBb0MsQ0FBQyxDQUFDO0tBQy9GO0lBRUQsT0FBTyxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBQ3pCLENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLE1BQWM7SUFDM0MsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2lzRGV2TW9kZX0gZnJvbSAnLi4vdXRpbC9pc19kZXZfbW9kZSc7XG5cbi8qKlxuICogQSBwYXR0ZXJuIHRoYXQgcmVjb2duaXplcyBhIGNvbW1vbmx5IHVzZWZ1bCBzdWJzZXQgb2YgVVJMcyB0aGF0IGFyZSBzYWZlLlxuICpcbiAqIFRoaXMgcmVndWxhciBleHByZXNzaW9uIG1hdGNoZXMgYSBzdWJzZXQgb2YgVVJMcyB0aGF0IHdpbGwgbm90IGNhdXNlIHNjcmlwdFxuICogZXhlY3V0aW9uIGlmIHVzZWQgaW4gVVJMIGNvbnRleHQgd2l0aGluIGEgSFRNTCBkb2N1bWVudC4gU3BlY2lmaWNhbGx5LCB0aGlzXG4gKiByZWd1bGFyIGV4cHJlc3Npb24gbWF0Y2hlcyBpZiAoY29tbWVudCBmcm9tIGhlcmUgb24gYW5kIHJlZ2V4IGNvcGllZCBmcm9tXG4gKiBTb3kncyBFc2NhcGluZ0NvbnZlbnRpb25zKTpcbiAqICgxKSBFaXRoZXIgYW4gYWxsb3dlZCBwcm90b2NvbCAoaHR0cCwgaHR0cHMsIG1haWx0byBvciBmdHApLlxuICogKDIpIG9yIG5vIHByb3RvY29sLiAgQSBwcm90b2NvbCBtdXN0IGJlIGZvbGxvd2VkIGJ5IGEgY29sb24uIFRoZSBiZWxvd1xuICogICAgIGFsbG93cyB0aGF0IGJ5IGFsbG93aW5nIGNvbG9ucyBvbmx5IGFmdGVyIG9uZSBvZiB0aGUgY2hhcmFjdGVycyBbLz8jXS5cbiAqICAgICBBIGNvbG9uIGFmdGVyIGEgaGFzaCAoIykgbXVzdCBiZSBpbiB0aGUgZnJhZ21lbnQuXG4gKiAgICAgT3RoZXJ3aXNlLCBhIGNvbG9uIGFmdGVyIGEgKD8pIG11c3QgYmUgaW4gYSBxdWVyeS5cbiAqICAgICBPdGhlcndpc2UsIGEgY29sb24gYWZ0ZXIgYSBzaW5nbGUgc29saWR1cyAoLykgbXVzdCBiZSBpbiBhIHBhdGguXG4gKiAgICAgT3RoZXJ3aXNlLCBhIGNvbG9uIGFmdGVyIGEgZG91YmxlIHNvbGlkdXMgKC8vKSBtdXN0IGJlIGluIHRoZSBhdXRob3JpdHlcbiAqICAgICAoYmVmb3JlIHBvcnQpLlxuICpcbiAqIFRoZSBwYXR0ZXJuIGRpc2FsbG93cyAmLCB1c2VkIGluIEhUTUwgZW50aXR5IGRlY2xhcmF0aW9ucyBiZWZvcmVcbiAqIG9uZSBvZiB0aGUgY2hhcmFjdGVycyBpbiBbLz8jXS4gVGhpcyBkaXNhbGxvd3MgSFRNTCBlbnRpdGllcyB1c2VkIGluIHRoZVxuICogcHJvdG9jb2wgbmFtZSwgd2hpY2ggc2hvdWxkIG5ldmVyIGhhcHBlbiwgZS5nLiBcImgmIzExNjt0cFwiIGZvciBcImh0dHBcIi5cbiAqIEl0IGFsc28gZGlzYWxsb3dzIEhUTUwgZW50aXRpZXMgaW4gdGhlIGZpcnN0IHBhdGggcGFydCBvZiBhIHJlbGF0aXZlIHBhdGgsXG4gKiBlLmcuIFwiZm9vJmx0O2Jhci9iYXpcIi4gIE91ciBleGlzdGluZyBlc2NhcGluZyBmdW5jdGlvbnMgc2hvdWxkIG5vdCBwcm9kdWNlXG4gKiB0aGF0LiBNb3JlIGltcG9ydGFudGx5LCBpdCBkaXNhbGxvd3MgbWFza2luZyBvZiBhIGNvbG9uLFxuICogZS5nLiBcImphdmFzY3JpcHQmIzU4Oy4uLlwiLlxuICpcbiAqIFRoaXMgcmVndWxhciBleHByZXNzaW9uIHdhcyB0YWtlbiBmcm9tIHRoZSBDbG9zdXJlIHNhbml0aXphdGlvbiBsaWJyYXJ5LlxuICovXG5jb25zdCBTQUZFX1VSTF9QQVRURVJOID0gL14oPzooPzpodHRwcz98bWFpbHRvfGZ0cHx0ZWx8ZmlsZXxzbXMpOnxbXiY6Lz8jXSooPzpbLz8jXXwkKSkvZ2k7XG5cbi8qIEEgcGF0dGVybiB0aGF0IG1hdGNoZXMgc2FmZSBzcmNzZXQgdmFsdWVzICovXG5jb25zdCBTQUZFX1NSQ1NFVF9QQVRURVJOID0gL14oPzooPzpodHRwcz98ZmlsZSk6fFteJjovPyNdKig/OlsvPyNdfCQpKS9naTtcblxuLyoqIEEgcGF0dGVybiB0aGF0IG1hdGNoZXMgc2FmZSBkYXRhIFVSTHMuIE9ubHkgbWF0Y2hlcyBpbWFnZSwgdmlkZW8gYW5kIGF1ZGlvIHR5cGVzLiAqL1xuY29uc3QgREFUQV9VUkxfUEFUVEVSTiA9XG4gICAgL15kYXRhOig/OmltYWdlXFwvKD86Ym1wfGdpZnxqcGVnfGpwZ3xwbmd8dGlmZnx3ZWJwKXx2aWRlb1xcLyg/Om1wZWd8bXA0fG9nZ3x3ZWJtKXxhdWRpb1xcLyg/Om1wM3xvZ2F8b2dnfG9wdXMpKTtiYXNlNjQsW2EtejAtOStcXC9dKz0qJC9pO1xuXG5leHBvcnQgZnVuY3Rpb24gX3Nhbml0aXplVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgdXJsID0gU3RyaW5nKHVybCk7XG4gIGlmICh1cmwubWF0Y2goU0FGRV9VUkxfUEFUVEVSTikgfHwgdXJsLm1hdGNoKERBVEFfVVJMX1BBVFRFUk4pKSByZXR1cm4gdXJsO1xuXG4gIGlmIChpc0Rldk1vZGUoKSkge1xuICAgIGNvbnNvbGUud2FybihgV0FSTklORzogc2FuaXRpemluZyB1bnNhZmUgVVJMIHZhbHVlICR7dXJsfSAoc2VlIGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5I3hzcylgKTtcbiAgfVxuXG4gIHJldHVybiAndW5zYWZlOicgKyB1cmw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVNyY3NldChzcmNzZXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHNyY3NldCA9IFN0cmluZyhzcmNzZXQpO1xuICByZXR1cm4gc3Jjc2V0LnNwbGl0KCcsJykubWFwKChzcmNzZXQpID0+IF9zYW5pdGl6ZVVybChzcmNzZXQudHJpbSgpKSkuam9pbignLCAnKTtcbn1cbiJdfQ==