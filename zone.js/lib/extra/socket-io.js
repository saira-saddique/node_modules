"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('socketio', function (global, Zone, api) {
    Zone[Zone.__symbol__('socketio')] = function patchSocketIO(io) {
        // patch io.Socket.prototype event listener related method
        api.patchEventTarget(global, [io.Socket.prototype], {
            useG: false,
            chkDup: false,
            rt: true,
            diff: function (task, delegate) { return task.callback === delegate; }
        });
        // also patch io.Socket.prototype.on/off/removeListener/removeAllListeners
        io.Socket.prototype.on = io.Socket.prototype.addEventListener;
        io.Socket.prototype.off = io.Socket.prototype.removeListener =
            io.Socket.prototype.removeAllListeners = io.Socket.prototype.removeEventListener;
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvem9uZS5qcy9saWIvZXh0cmEvc29ja2V0LWlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFDLE1BQVcsRUFBRSxJQUFjLEVBQUUsR0FBaUI7SUFDMUUsSUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxTQUFTLGFBQWEsQ0FBQyxFQUFPO1FBQ3pFLDBEQUEwRDtRQUMxRCxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNsRCxJQUFJLEVBQUUsS0FBSztZQUNYLE1BQU0sRUFBRSxLQUFLO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixJQUFJLEVBQUUsVUFBQyxJQUFTLEVBQUUsUUFBYSxJQUFPLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzNFLENBQUMsQ0FBQztRQUNILDBFQUEwRTtRQUMxRSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7UUFDOUQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWM7WUFDeEQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUM7SUFDdkYsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5ab25lLl9fbG9hZF9wYXRjaCgnc29ja2V0aW8nLCAoZ2xvYmFsOiBhbnksIFpvbmU6IFpvbmVUeXBlLCBhcGk6IF9ab25lUHJpdmF0ZSkgPT4ge1xuICAoWm9uZSBhcyBhbnkpW1pvbmUuX19zeW1ib2xfXygnc29ja2V0aW8nKV0gPSBmdW5jdGlvbiBwYXRjaFNvY2tldElPKGlvOiBhbnkpIHtcbiAgICAvLyBwYXRjaCBpby5Tb2NrZXQucHJvdG90eXBlIGV2ZW50IGxpc3RlbmVyIHJlbGF0ZWQgbWV0aG9kXG4gICAgYXBpLnBhdGNoRXZlbnRUYXJnZXQoZ2xvYmFsLCBbaW8uU29ja2V0LnByb3RvdHlwZV0sIHtcbiAgICAgIHVzZUc6IGZhbHNlLFxuICAgICAgY2hrRHVwOiBmYWxzZSxcbiAgICAgIHJ0OiB0cnVlLFxuICAgICAgZGlmZjogKHRhc2s6IGFueSwgZGVsZWdhdGU6IGFueSkgPT4geyByZXR1cm4gdGFzay5jYWxsYmFjayA9PT0gZGVsZWdhdGU7IH1cbiAgICB9KTtcbiAgICAvLyBhbHNvIHBhdGNoIGlvLlNvY2tldC5wcm90b3R5cGUub24vb2ZmL3JlbW92ZUxpc3RlbmVyL3JlbW92ZUFsbExpc3RlbmVyc1xuICAgIGlvLlNvY2tldC5wcm90b3R5cGUub24gPSBpby5Tb2NrZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgaW8uU29ja2V0LnByb3RvdHlwZS5vZmYgPSBpby5Tb2NrZXQucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICAgICAgaW8uU29ja2V0LnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBpby5Tb2NrZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG4gIH07XG59KTtcbiJdfQ==