/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { autoRegisterModuleById } from '../render3/definition';
import { stringify } from '../util/stringify';
/**
 * Map of module-id to the corresponding NgModule.
 * - In pre Ivy we track NgModuleFactory,
 * - In post Ivy we track the NgModuleType
 */
const modules = new Map();
/**
 * Registers a loaded module. Should only be called from generated NgModuleFactory code.
 * @publicApi
 */
export function registerModuleFactory(id, factory) {
    const existing = modules.get(id);
    assertSameOrNotExisting(id, existing && existing.moduleType, factory.moduleType);
    modules.set(id, factory);
}
function assertSameOrNotExisting(id, type, incoming) {
    if (type && type !== incoming) {
        throw new Error(`Duplicate module registered for ${id} - ${stringify(type)} vs ${stringify(type.name)}`);
    }
}
export function registerNgModuleType(ngModuleType) {
    if (ngModuleType.ɵmod.id !== null) {
        const id = ngModuleType.ɵmod.id;
        const existing = modules.get(id);
        assertSameOrNotExisting(id, existing, ngModuleType);
        modules.set(id, ngModuleType);
    }
    let imports = ngModuleType.ɵmod.imports;
    if (imports instanceof Function) {
        imports = imports();
    }
    if (imports) {
        imports.forEach(i => registerNgModuleType(i));
    }
}
export function clearModulesForTest() {
    modules.clear();
}
export function getRegisteredNgModuleType(id) {
    return modules.get(id) || autoRegisterModuleById[id];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlX2ZhY3RvcnlfcmVnaXN0cmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbGlua2VyL25nX21vZHVsZV9mYWN0b3J5X3JlZ2lzdHJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFJSCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUU3RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFLNUM7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxFQUE2QyxDQUFDO0FBRXJFOzs7R0FHRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxFQUFVLEVBQUUsT0FBNkI7SUFDN0UsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQXlCLENBQUM7SUFDekQsdUJBQXVCLENBQUMsRUFBRSxFQUFFLFFBQVEsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FBQyxFQUFVLEVBQUUsSUFBb0IsRUFBRSxRQUFtQjtJQUNwRixJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQ1gsbUNBQW1DLEVBQUUsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDOUY7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFlBQTBCO0lBQzdELElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2pDLE1BQU0sRUFBRSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUF3QixDQUFDO1FBQ3hELHVCQUF1QixDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDL0I7SUFFRCxJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QyxJQUFJLE9BQU8sWUFBWSxRQUFRLEVBQUU7UUFDL0IsT0FBTyxHQUFHLE9BQU8sRUFBRSxDQUFDO0tBQ3JCO0lBQ0QsSUFBSSxPQUFPLEVBQUU7UUFDWCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsQ0FBaUIsQ0FBQyxDQUFDLENBQUM7S0FDL0Q7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQjtJQUNqQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDbEIsQ0FBQztBQUVELE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxFQUFVO0lBQ2xELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN2RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge2F1dG9SZWdpc3Rlck1vZHVsZUJ5SWR9IGZyb20gJy4uL3JlbmRlcjMvZGVmaW5pdGlvbic7XG5pbXBvcnQge05nTW9kdWxlVHlwZX0gZnJvbSAnLi4vcmVuZGVyMy9uZ19tb2R1bGVfcmVmJztcbmltcG9ydCB7c3RyaW5naWZ5fSBmcm9tICcuLi91dGlsL3N0cmluZ2lmeSc7XG5cbmltcG9ydCB7TmdNb2R1bGVGYWN0b3J5fSBmcm9tICcuL25nX21vZHVsZV9mYWN0b3J5JztcblxuXG4vKipcbiAqIE1hcCBvZiBtb2R1bGUtaWQgdG8gdGhlIGNvcnJlc3BvbmRpbmcgTmdNb2R1bGUuXG4gKiAtIEluIHByZSBJdnkgd2UgdHJhY2sgTmdNb2R1bGVGYWN0b3J5LFxuICogLSBJbiBwb3N0IEl2eSB3ZSB0cmFjayB0aGUgTmdNb2R1bGVUeXBlXG4gKi9cbmNvbnN0IG1vZHVsZXMgPSBuZXcgTWFwPHN0cmluZywgTmdNb2R1bGVGYWN0b3J5PGFueT58TmdNb2R1bGVUeXBlPigpO1xuXG4vKipcbiAqIFJlZ2lzdGVycyBhIGxvYWRlZCBtb2R1bGUuIFNob3VsZCBvbmx5IGJlIGNhbGxlZCBmcm9tIGdlbmVyYXRlZCBOZ01vZHVsZUZhY3RvcnkgY29kZS5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTW9kdWxlRmFjdG9yeShpZDogc3RyaW5nLCBmYWN0b3J5OiBOZ01vZHVsZUZhY3Rvcnk8YW55Pikge1xuICBjb25zdCBleGlzdGluZyA9IG1vZHVsZXMuZ2V0KGlkKSBhcyBOZ01vZHVsZUZhY3Rvcnk8YW55PjtcbiAgYXNzZXJ0U2FtZU9yTm90RXhpc3RpbmcoaWQsIGV4aXN0aW5nICYmIGV4aXN0aW5nLm1vZHVsZVR5cGUsIGZhY3RvcnkubW9kdWxlVHlwZSk7XG4gIG1vZHVsZXMuc2V0KGlkLCBmYWN0b3J5KTtcbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2FtZU9yTm90RXhpc3RpbmcoaWQ6IHN0cmluZywgdHlwZTogVHlwZTxhbnk+fG51bGwsIGluY29taW5nOiBUeXBlPGFueT4pOiB2b2lkIHtcbiAgaWYgKHR5cGUgJiYgdHlwZSAhPT0gaW5jb21pbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBEdXBsaWNhdGUgbW9kdWxlIHJlZ2lzdGVyZWQgZm9yICR7aWR9IC0gJHtzdHJpbmdpZnkodHlwZSl9IHZzICR7c3RyaW5naWZ5KHR5cGUubmFtZSl9YCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTmdNb2R1bGVUeXBlKG5nTW9kdWxlVHlwZTogTmdNb2R1bGVUeXBlKSB7XG4gIGlmIChuZ01vZHVsZVR5cGUuybVtb2QuaWQgIT09IG51bGwpIHtcbiAgICBjb25zdCBpZCA9IG5nTW9kdWxlVHlwZS7JtW1vZC5pZDtcbiAgICBjb25zdCBleGlzdGluZyA9IG1vZHVsZXMuZ2V0KGlkKSBhcyBOZ01vZHVsZVR5cGUgfCBudWxsO1xuICAgIGFzc2VydFNhbWVPck5vdEV4aXN0aW5nKGlkLCBleGlzdGluZywgbmdNb2R1bGVUeXBlKTtcbiAgICBtb2R1bGVzLnNldChpZCwgbmdNb2R1bGVUeXBlKTtcbiAgfVxuXG4gIGxldCBpbXBvcnRzID0gbmdNb2R1bGVUeXBlLsm1bW9kLmltcG9ydHM7XG4gIGlmIChpbXBvcnRzIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICBpbXBvcnRzID0gaW1wb3J0cygpO1xuICB9XG4gIGlmIChpbXBvcnRzKSB7XG4gICAgaW1wb3J0cy5mb3JFYWNoKGkgPT4gcmVnaXN0ZXJOZ01vZHVsZVR5cGUoaSBhcyBOZ01vZHVsZVR5cGUpKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJNb2R1bGVzRm9yVGVzdCgpOiB2b2lkIHtcbiAgbW9kdWxlcy5jbGVhcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVnaXN0ZXJlZE5nTW9kdWxlVHlwZShpZDogc3RyaW5nKSB7XG4gIHJldHVybiBtb2R1bGVzLmdldChpZCkgfHwgYXV0b1JlZ2lzdGVyTW9kdWxlQnlJZFtpZF07XG59XG4iXX0=