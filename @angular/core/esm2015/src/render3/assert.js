/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDefined, assertEqual, assertNumber, throwError } from '../util/assert';
import { getComponentDef, getNgModuleDef } from './definition';
import { isLContainer, isLView } from './interfaces/type_checks';
import { HEADER_OFFSET, TVIEW } from './interfaces/view';
// [Assert functions do not constraint type when they are guarded by a truthy
// expression.](https://github.com/microsoft/TypeScript/issues/37295)
export function assertTNodeForLView(tNode, lView) {
    assertTNodeForTView(tNode, lView[TVIEW]);
}
export function assertTNodeForTView(tNode, tView) {
    assertDefined(tNode, 'TNode must be defined');
    tNode.hasOwnProperty('tView_') &&
        assertEqual(tNode.tView_, tView, 'This TNode does not belong to this TView.');
}
export function assertComponentType(actual, msg = 'Type passed in is not ComponentType, it does not have \'ɵcmp\' property.') {
    if (!getComponentDef(actual)) {
        throwError(msg);
    }
}
export function assertNgModuleType(actual, msg = 'Type passed in is not NgModuleType, it does not have \'ɵmod\' property.') {
    if (!getNgModuleDef(actual)) {
        throwError(msg);
    }
}
export function assertCurrentTNodeIsParent(isParent) {
    assertEqual(isParent, true, 'currentTNode should be a parent');
}
export function assertHasParent(tNode) {
    assertDefined(tNode, 'currentTNode should exist!');
    assertDefined(tNode.parent, 'currentTNode should have a parent');
}
export function assertDataNext(lView, index, arr) {
    if (arr == null)
        arr = lView;
    assertEqual(arr.length, index, `index ${index} expected to be at the end of arr (length ${arr.length})`);
}
export function assertLContainer(value) {
    assertDefined(value, 'LContainer must be defined');
    assertEqual(isLContainer(value), true, 'Expecting LContainer');
}
export function assertLViewOrUndefined(value) {
    value && assertEqual(isLView(value), true, 'Expecting LView or undefined or null');
}
export function assertLView(value) {
    assertDefined(value, 'LView must be defined');
    assertEqual(isLView(value), true, 'Expecting LView');
}
export function assertFirstCreatePass(tView, errMessage) {
    assertEqual(tView.firstCreatePass, true, errMessage || 'Should only be called in first create pass.');
}
export function assertFirstUpdatePass(tView, errMessage) {
    assertEqual(tView.firstUpdatePass, true, errMessage || 'Should only be called in first update pass.');
}
/**
 * This is a basic sanity check that an object is probably a directive def. DirectiveDef is
 * an interface, so we can't do a direct instanceof check.
 */
export function assertDirectiveDef(obj) {
    if (obj.type === undefined || obj.selectors == undefined || obj.inputs === undefined) {
        throwError(`Expected a DirectiveDef/ComponentDef and this object does not seem to have the expected shape.`);
    }
}
export function assertIndexInDeclRange(lView, index) {
    const tView = lView[1];
    assertBetween(HEADER_OFFSET, tView.bindingStartIndex, index);
}
export function assertIndexInVarsRange(lView, index) {
    const tView = lView[1];
    assertBetween(tView.bindingStartIndex, tView.i18nStartIndex, index);
}
export function assertIndexInI18nRange(lView, index) {
    const tView = lView[1];
    assertBetween(tView.i18nStartIndex, tView.expandoStartIndex, index);
}
export function assertIndexInExpandoRange(lView, index) {
    const tView = lView[1];
    assertBetween(tView.expandoStartIndex, lView.length, index);
}
export function assertBetween(lower, upper, index) {
    if (!(lower <= index && index < upper)) {
        throwError(`Index out of range (expecting ${lower} <= ${index} < ${upper})`);
    }
}
/**
 * This is a basic sanity check that the `injectorIndex` seems to point to what looks like a
 * NodeInjector data structure.
 *
 * @param lView `LView` which should be checked.
 * @param injectorIndex index into the `LView` where the `NodeInjector` is expected.
 */
export function assertNodeInjector(lView, injectorIndex) {
    assertIndexInExpandoRange(lView, injectorIndex);
    assertIndexInExpandoRange(lView, injectorIndex + 8 /* PARENT */);
    assertNumber(lView[injectorIndex + 0], 'injectorIndex should point to a bloom filter');
    assertNumber(lView[injectorIndex + 1], 'injectorIndex should point to a bloom filter');
    assertNumber(lView[injectorIndex + 2], 'injectorIndex should point to a bloom filter');
    assertNumber(lView[injectorIndex + 3], 'injectorIndex should point to a bloom filter');
    assertNumber(lView[injectorIndex + 4], 'injectorIndex should point to a bloom filter');
    assertNumber(lView[injectorIndex + 5], 'injectorIndex should point to a bloom filter');
    assertNumber(lView[injectorIndex + 6], 'injectorIndex should point to a bloom filter');
    assertNumber(lView[injectorIndex + 7], 'injectorIndex should point to a bloom filter');
    assertNumber(lView[injectorIndex + 8 /* PARENT */], 'injectorIndex should point to parent injector');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9hc3NlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BGLE9BQU8sRUFBQyxlQUFlLEVBQUUsY0FBYyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBSzdELE9BQU8sRUFBQyxZQUFZLEVBQUUsT0FBTyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBUyxLQUFLLEVBQVEsTUFBTSxtQkFBbUIsQ0FBQztBQUdyRSw2RUFBNkU7QUFDN0UscUVBQXFFO0FBR3JFLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxLQUFZLEVBQUUsS0FBWTtJQUM1RCxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxLQUFZLEVBQUUsS0FBWTtJQUM1RCxhQUFhLENBQUMsS0FBSyxFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDOUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7UUFDMUIsV0FBVyxDQUNOLEtBQWdDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFDL0MsMkNBQTJDLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUMvQixNQUFXLEVBQ1gsTUFBYywwRUFBMEU7SUFDMUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUM1QixVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakI7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLGtCQUFrQixDQUM5QixNQUFXLEVBQ1gsTUFB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Q0FBQyxDQUFDO0lBQ3ZGLFlBQVksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxFQUFFLDhDQUE4QyxDQUFDLENBQUM7SUFDdkYsWUFBWSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEVBQUUsOENBQThDLENBQUMsQ0FBQztJQUN2RixZQUFZLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsRUFBRSw4Q0FBOEMsQ0FBQyxDQUFDO0lBQ3ZGLFlBQVksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxFQUFFLDhDQUE4QyxDQUFDLENBQUM7SUFDdkYsWUFBWSxDQUNSLEtBQUssQ0FBQyxhQUFhLGlCQUE0QixDQUFDLEVBQ2hELCtDQUErQyxDQUFDLENBQUM7QUFDdkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2Fzc2VydERlZmluZWQsIGFzc2VydEVxdWFsLCBhc3NlcnROdW1iZXIsIHRocm93RXJyb3J9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7Z2V0Q29tcG9uZW50RGVmLCBnZXROZ01vZHVsZURlZn0gZnJvbSAnLi9kZWZpbml0aW9uJztcbmltcG9ydCB7TENvbnRhaW5lcn0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbnRhaW5lcic7XG5pbXBvcnQge0RpcmVjdGl2ZURlZn0gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtOb2RlSW5qZWN0b3JPZmZzZXR9IGZyb20gJy4vaW50ZXJmYWNlcy9pbmplY3Rvcic7XG5pbXBvcnQge1ROb2RlfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge2lzTENvbnRhaW5lciwgaXNMVmlld30gZnJvbSAnLi9pbnRlcmZhY2VzL3R5cGVfY2hlY2tzJztcbmltcG9ydCB7SEVBREVSX09GRlNFVCwgTFZpZXcsIFRWSUVXLCBUVmlld30gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuXG5cbi8vIFtBc3NlcnQgZnVuY3Rpb25zIGRvIG5vdCBjb25zdHJhaW50IHR5cGUgd2hlbiB0aGV5IGFyZSBndWFyZGVkIGJ5IGEgdHJ1dGh5XG4vLyBleHByZXNzaW9uLl0oaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8zNzI5NSlcblxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0VE5vZGVGb3JMVmlldyh0Tm9kZTogVE5vZGUsIGxWaWV3OiBMVmlldykge1xuICBhc3NlcnRUTm9kZUZvclRWaWV3KHROb2RlLCBsVmlld1tUVklFV10pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0VE5vZGVGb3JUVmlldyh0Tm9kZTogVE5vZGUsIHRWaWV3OiBUVmlldykge1xuICBhc3NlcnREZWZpbmVkKHROb2RlLCAnVE5vZGUgbXVzdCBiZSBkZWZpbmVkJyk7XG4gIHROb2RlLmhhc093blByb3BlcnR5KCd0Vmlld18nKSAmJlxuICAgICAgYXNzZXJ0RXF1YWwoXG4gICAgICAgICAgKHROb2RlIGFzIGFueSBhcyB7dFZpZXdfOiBUVmlld30pLnRWaWV3XywgdFZpZXcsXG4gICAgICAgICAgJ1RoaXMgVE5vZGUgZG9lcyBub3QgYmVsb25nIHRvIHRoaXMgVFZpZXcuJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRDb21wb25lbnRUeXBlKFxuICAgIGFjdHVhbDogYW55LFxuICAgIG1zZzogc3RyaW5nID0gJ1R5cGUgcGFzc2VkIGluIGlzIG5vdCBDb21wb25lbnRUeXBlLCBpdCBkb2VzIG5vdCBoYXZlIFxcJ8m1Y21wXFwnIHByb3BlcnR5LicpIHtcbiAgaWYgKCFnZXRDb21wb25lbnREZWYoYWN0dWFsKSkge1xuICAgIHRocm93RXJyb3IobXNnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0TmdNb2R1bGVUeXBlKFxuICAgIGFjdHVhbDogYW55LFxuICAgIG1zZzogc3RyaW5nID0gJ1R5cGUgcGFzc2VkIGluIGlzIG5vdCBOZ01vZHVsZVR5cGUsIGl0IGRvZXMgbm90IGhhdmUgXFwnybVtb2RcXCcgcHJvcGVydHkuJykge1xuICBpZiAoIWdldE5nTW9kdWxlRGVmKGFjdHVhbCkpIHtcbiAgICB0aHJvd0Vycm9yKG1zZyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydEN1cnJlbnRUTm9kZUlzUGFyZW50KGlzUGFyZW50OiBib29sZWFuKSB7XG4gIGFzc2VydEVxdWFsKGlzUGFyZW50LCB0cnVlLCAnY3VycmVudFROb2RlIHNob3VsZCBiZSBhIHBhcmVudCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0SGFzUGFyZW50KHROb2RlOiBUTm9kZXxudWxsKSB7XG4gIGFzc2VydERlZmluZWQodE5vZGUsICdjdXJyZW50VE5vZGUgc2hvdWxkIGV4aXN0IScpO1xuICBhc3NlcnREZWZpbmVkKHROb2RlIS5wYXJlbnQsICdjdXJyZW50VE5vZGUgc2hvdWxkIGhhdmUgYSBwYXJlbnQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydERhdGFOZXh0KGxWaWV3OiBMVmlldywgaW5kZXg6IG51bWJlciwgYXJyPzogYW55W10pIHtcbiAgaWYgKGFyciA9PSBudWxsKSBhcnIgPSBsVmlldztcbiAgYXNzZXJ0RXF1YWwoXG4gICAgICBhcnIubGVuZ3RoLCBpbmRleCwgYGluZGV4ICR7aW5kZXh9IGV4cGVjdGVkIHRvIGJlIGF0IHRoZSBlbmQgb2YgYXJyIChsZW5ndGggJHthcnIubGVuZ3RofSlgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydExDb250YWluZXIodmFsdWU6IGFueSk6IGFzc2VydHMgdmFsdWUgaXMgTENvbnRhaW5lciB7XG4gIGFzc2VydERlZmluZWQodmFsdWUsICdMQ29udGFpbmVyIG11c3QgYmUgZGVmaW5lZCcpO1xuICBhc3NlcnRFcXVhbChpc0xDb250YWluZXIodmFsdWUpLCB0cnVlLCAnRXhwZWN0aW5nIExDb250YWluZXInKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydExWaWV3T3JVbmRlZmluZWQodmFsdWU6IGFueSk6IGFzc2VydHMgdmFsdWUgaXMgTFZpZXd8bnVsbHx1bmRlZmluZWQge1xuICB2YWx1ZSAmJiBhc3NlcnRFcXVhbChpc0xWaWV3KHZhbHVlKSwgdHJ1ZSwgJ0V4cGVjdGluZyBMVmlldyBvciB1bmRlZmluZWQgb3IgbnVsbCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0TFZpZXcodmFsdWU6IGFueSk6IGFzc2VydHMgdmFsdWUgaXMgTFZpZXcge1xuICBhc3NlcnREZWZpbmVkKHZhbHVlLCAnTFZpZXcgbXVzdCBiZSBkZWZpbmVkJyk7XG4gIGFzc2VydEVxdWFsKGlzTFZpZXcodmFsdWUpLCB0cnVlLCAnRXhwZWN0aW5nIExWaWV3Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRGaXJzdENyZWF0ZVBhc3ModFZpZXc6IFRWaWV3LCBlcnJNZXNzYWdlPzogc3RyaW5nKSB7XG4gIGFzc2VydEVxdWFsKFxuICAgICAgdFZpZXcuZmlyc3RDcmVhdGVQYXNzLCB0cnVlLCBlcnJNZXNzYWdlIHx8ICdTaG91bGQgb25seSBiZSBjYWxsZWQgaW4gZmlyc3QgY3JlYXRlIHBhc3MuJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRGaXJzdFVwZGF0ZVBhc3ModFZpZXc6IFRWaWV3LCBlcnJNZXNzYWdlPzogc3RyaW5nKSB7XG4gIGFzc2VydEVxdWFsKFxuICAgICAgdFZpZXcuZmlyc3RVcGRhdGVQYXNzLCB0cnVlLCBlcnJNZXNzYWdlIHx8ICdTaG91bGQgb25seSBiZSBjYWxsZWQgaW4gZmlyc3QgdXBkYXRlIHBhc3MuJyk7XG59XG5cbi8qKlxuICogVGhpcyBpcyBhIGJhc2ljIHNhbml0eSBjaGVjayB0aGF0IGFuIG9iamVjdCBpcyBwcm9iYWJseSBhIGRpcmVjdGl2ZSBkZWYuIERpcmVjdGl2ZURlZiBpc1xuICogYW4gaW50ZXJmYWNlLCBzbyB3ZSBjYW4ndCBkbyBhIGRpcmVjdCBpbnN0YW5jZW9mIGNoZWNrLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0RGlyZWN0aXZlRGVmPFQ+KG9iajogYW55KTogYXNzZXJ0cyBvYmogaXMgRGlyZWN0aXZlRGVmPFQ+IHtcbiAgaWYgKG9iai50eXBlID09PSB1bmRlZmluZWQgfHwgb2JqLnNlbGVjdG9ycyA9PSB1bmRlZmluZWQgfHwgb2JqLmlucHV0cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3dFcnJvcihcbiAgICAgICAgYEV4cGVjdGVkIGEgRGlyZWN0aXZlRGVmL0NvbXBvbmVudERlZiBhbmQgdGhpcyBvYmplY3QgZG9lcyBub3Qgc2VlbSB0byBoYXZlIHRoZSBleHBlY3RlZCBzaGFwZS5gKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0SW5kZXhJbkRlY2xSYW5nZShsVmlldzogTFZpZXcsIGluZGV4OiBudW1iZXIpIHtcbiAgY29uc3QgdFZpZXcgPSBsVmlld1sxXTtcbiAgYXNzZXJ0QmV0d2VlbihIRUFERVJfT0ZGU0VULCB0Vmlldy5iaW5kaW5nU3RhcnRJbmRleCwgaW5kZXgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0SW5kZXhJblZhcnNSYW5nZShsVmlldzogTFZpZXcsIGluZGV4OiBudW1iZXIpIHtcbiAgY29uc3QgdFZpZXcgPSBsVmlld1sxXTtcbiAgYXNzZXJ0QmV0d2VlbihcbiAgICAgIHRWaWV3LmJpbmRpbmdTdGFydEluZGV4LCAodFZpZXcgYXMgYW55IGFzIHtpMThuU3RhcnRJbmRleDogbnVtYmVyfSkuaTE4blN0YXJ0SW5kZXgsIGluZGV4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydEluZGV4SW5JMThuUmFuZ2UobFZpZXc6IExWaWV3LCBpbmRleDogbnVtYmVyKSB7XG4gIGNvbnN0IHRWaWV3ID0gbFZpZXdbMV07XG4gIGFzc2VydEJldHdlZW4oXG4gICAgICAodFZpZXcgYXMgYW55IGFzIHtpMThuU3RhcnRJbmRleDogbnVtYmVyfSkuaTE4blN0YXJ0SW5kZXgsIHRWaWV3LmV4cGFuZG9TdGFydEluZGV4LCBpbmRleCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRJbmRleEluRXhwYW5kb1JhbmdlKGxWaWV3OiBMVmlldywgaW5kZXg6IG51bWJlcikge1xuICBjb25zdCB0VmlldyA9IGxWaWV3WzFdO1xuICBhc3NlcnRCZXR3ZWVuKHRWaWV3LmV4cGFuZG9TdGFydEluZGV4LCBsVmlldy5sZW5ndGgsIGluZGV4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydEJldHdlZW4obG93ZXI6IG51bWJlciwgdXBwZXI6IG51bWJlciwgaW5kZXg6IG51bWJlcikge1xuICBpZiAoIShsb3dlciA8PSBpbmRleCAmJiBpbmRleCA8IHVwcGVyKSkge1xuICAgIHRocm93RXJyb3IoYEluZGV4IG91dCBvZiByYW5nZSAoZXhwZWN0aW5nICR7bG93ZXJ9IDw9ICR7aW5kZXh9IDwgJHt1cHBlcn0pYCk7XG4gIH1cbn1cblxuXG4vKipcbiAqIFRoaXMgaXMgYSBiYXNpYyBzYW5pdHkgY2hlY2sgdGhhdCB0aGUgYGluamVjdG9ySW5kZXhgIHNlZW1zIHRvIHBvaW50IHRvIHdoYXQgbG9va3MgbGlrZSBhXG4gKiBOb2RlSW5qZWN0b3IgZGF0YSBzdHJ1Y3R1cmUuXG4gKlxuICogQHBhcmFtIGxWaWV3IGBMVmlld2Agd2hpY2ggc2hvdWxkIGJlIGNoZWNrZWQuXG4gKiBAcGFyYW0gaW5qZWN0b3JJbmRleCBpbmRleCBpbnRvIHRoZSBgTFZpZXdgIHdoZXJlIHRoZSBgTm9kZUluamVjdG9yYCBpcyBleHBlY3RlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydE5vZGVJbmplY3RvcihsVmlldzogTFZpZXcsIGluamVjdG9ySW5kZXg6IG51bWJlcikge1xuICBhc3NlcnRJbmRleEluRXhwYW5kb1JhbmdlKGxWaWV3LCBpbmplY3RvckluZGV4KTtcbiAgYXNzZXJ0SW5kZXhJbkV4cGFuZG9SYW5nZShsVmlldywgaW5qZWN0b3JJbmRleCArIE5vZGVJbmplY3Rvck9mZnNldC5QQVJFTlQpO1xuICBhc3NlcnROdW1iZXIobFZpZXdbaW5qZWN0b3JJbmRleCArIDBdLCAnaW5qZWN0b3JJbmRleCBzaG91bGQgcG9pbnQgdG8gYSBibG9vbSBmaWx0ZXInKTtcbiAgYXNzZXJ0TnVtYmVyKGxWaWV3W2luamVjdG9ySW5kZXggKyAxXSwgJ2luamVjdG9ySW5kZXggc2hvdWxkIHBvaW50IHRvIGEgYmxvb20gZmlsdGVyJyk7XG4gIGFzc2VydE51bWJlcihsVmlld1tpbmplY3RvckluZGV4ICsgMl0sICdpbmplY3RvckluZGV4IHNob3VsZCBwb2ludCB0byBhIGJsb29tIGZpbHRlcicpO1xuICBhc3NlcnROdW1iZXIobFZpZXdbaW5qZWN0b3JJbmRleCArIDNdLCAnaW5qZWN0b3JJbmRleCBzaG91bGQgcG9pbnQgdG8gYSBibG9vbSBmaWx0ZXInKTtcbiAgYXNzZXJ0TnVtYmVyKGxWaWV3W2luamVjdG9ySW5kZXggKyA0XSwgJ2luamVjdG9ySW5kZXggc2hvdWxkIHBvaW50IHRvIGEgYmxvb20gZmlsdGVyJyk7XG4gIGFzc2VydE51bWJlcihsVmlld1tpbmplY3RvckluZGV4ICsgNV0sICdpbmplY3RvckluZGV4IHNob3VsZCBwb2ludCB0byBhIGJsb29tIGZpbHRlcicpO1xuICBhc3NlcnROdW1iZXIobFZpZXdbaW5qZWN0b3JJbmRleCArIDZdLCAnaW5qZWN0b3JJbmRleCBzaG91bGQgcG9pbnQgdG8gYSBibG9vbSBmaWx0ZXInKTtcbiAgYXNzZXJ0TnVtYmVyKGxWaWV3W2luamVjdG9ySW5kZXggKyA3XSwgJ2luamVjdG9ySW5kZXggc2hvdWxkIHBvaW50IHRvIGEgYmxvb20gZmlsdGVyJyk7XG4gIGFzc2VydE51bWJlcihcbiAgICAgIGxWaWV3W2luamVjdG9ySW5kZXggKyBOb2RlSW5qZWN0b3JPZmZzZXQuUEFSRU5UXSxcbiAgICAgICdpbmplY3RvckluZGV4IHNob3VsZCBwb2ludCB0byBwYXJlbnQgaW5qZWN0b3InKTtcbn1cbiJdfQ==