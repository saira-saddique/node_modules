/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { identifierName } from './compile_metadata';
import { Identifiers } from './identifiers';
import * as o from './output/output_ast';
import { convertValueToOutputAst } from './output/value_util';
function mapEntry(key, value) {
    return { key, value, quoted: false };
}
export class InjectableCompiler {
    constructor(reflector, alwaysGenerateDef) {
        this.reflector = reflector;
        this.alwaysGenerateDef = alwaysGenerateDef;
        this.tokenInjector = reflector.resolveExternalReference(Identifiers.Injector);
    }
    depsArray(deps, ctx) {
        return deps.map(dep => {
            let token = dep;
            let args = [token];
            let flags = 0 /* Default */;
            if (Array.isArray(dep)) {
                for (let i = 0; i < dep.length; i++) {
                    const v = dep[i];
                    if (v) {
                        if (v.ngMetadataName === 'Optional') {
                            flags |= 8 /* Optional */;
                        }
                        else if (v.ngMetadataName === 'SkipSelf') {
                            flags |= 4 /* SkipSelf */;
                        }
                        else if (v.ngMetadataName === 'Self') {
                            flags |= 2 /* Self */;
                        }
                        else if (v.ngMetadataName === 'Inject') {
                            token = v.token;
                        }
                        else {
                            token = v;
                        }
                    }
                }
            }
            let tokenExpr;
            if (typeof token === 'string') {
                tokenExpr = o.literal(token);
            }
            else if (token === this.tokenInjector) {
                tokenExpr = o.importExpr(Identifiers.INJECTOR);
            }
            else {
                tokenExpr = ctx.importExpr(token);
            }
            if (flags !== 0 /* Default */) {
                args = [tokenExpr, o.literal(flags)];
            }
            else {
                args = [tokenExpr];
            }
            return o.importExpr(Identifiers.inject).callFn(args);
        });
    }
    factoryFor(injectable, ctx) {
        let retValue;
        if (injectable.useExisting) {
            retValue = o.importExpr(Identifiers.inject).callFn([ctx.importExpr(injectable.useExisting)]);
        }
        else if (injectable.useFactory) {
            const deps = injectable.deps || [];
            if (deps.length > 0) {
                retValue = ctx.importExpr(injectable.useFactory).callFn(this.depsArray(deps, ctx));
            }
            else {
                return ctx.importExpr(injectable.useFactory);
            }
        }
        else if (injectable.useValue) {
            retValue = convertValueToOutputAst(ctx, injectable.useValue);
        }
        else {
            const clazz = injectable.useClass || injectable.symbol;
            const depArgs = this.depsArray(this.reflector.parameters(clazz), ctx);
            retValue = new o.InstantiateExpr(ctx.importExpr(clazz), depArgs);
        }
        return o.fn([], [new o.ReturnStatement(retValue)], undefined, undefined, injectable.symbol.name + '_Factory');
    }
    injectableDef(injectable, ctx) {
        let providedIn = o.NULL_EXPR;
        if (injectable.providedIn !== undefined) {
            if (injectable.providedIn === null) {
                providedIn = o.NULL_EXPR;
            }
            else if (typeof injectable.providedIn === 'string') {
                providedIn = o.literal(injectable.providedIn);
            }
            else {
                providedIn = ctx.importExpr(injectable.providedIn);
            }
        }
        const def = [
            mapEntry('factory', this.factoryFor(injectable, ctx)),
            mapEntry('token', ctx.importExpr(injectable.type.reference)),
            mapEntry('providedIn', providedIn),
        ];
        return o.importExpr(Identifiers.ɵɵdefineInjectable).callFn([o.literalMap(def)]);
    }
    compile(injectable, ctx) {
        if (this.alwaysGenerateDef || injectable.providedIn !== undefined) {
            const className = identifierName(injectable.type);
            const clazz = new o.ClassStmt(className, null, [
                new o.ClassField('ɵprov', o.INFERRED_TYPE, [o.StmtModifier.Static], this.injectableDef(injectable, ctx)),
            ], [], new o.ClassMethod(null, [], []), []);
            ctx.statements.push(clazz);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0YWJsZV9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9pbmplY3RhYmxlX2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBOEUsY0FBYyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFHL0gsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEtBQUssQ0FBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBYTVELFNBQVMsUUFBUSxDQUFDLEdBQVcsRUFBRSxLQUFtQjtJQUNoRCxPQUFPLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7QUFDckMsQ0FBQztBQUVELE1BQU0sT0FBTyxrQkFBa0I7SUFFN0IsWUFBb0IsU0FBMkIsRUFBVSxpQkFBMEI7UUFBL0QsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQVM7UUFDakYsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsd0JBQXdCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFTyxTQUFTLENBQUMsSUFBVyxFQUFFLEdBQWtCO1FBQy9DLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNwQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDaEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixJQUFJLEtBQUssa0JBQW1DLENBQUM7WUFDN0MsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMs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QUNuQyxDQUFDO1FBQ0YsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxPQUFPLENBQUMsVUFBcUMsRUFBRSxHQUFrQjtRQUMvRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxVQUFVLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUNqRSxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO1lBQ25ELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDekIsU0FBUyxFQUFFLElBQUksRUFDZjtnQkFDRSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQ1osT0FBTyxFQUFFLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUNqRCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN6QyxFQUNELEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3QyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1N0YXRpY1N5bWJvbH0gZnJvbSAnLi9hb3Qvc3RhdGljX3N5bWJvbCc7XG5pbXBvcnQge0NvbXBpbGVJbmplY3RhYmxlTWV0YWRhdGEsIENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhLCBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSwgaWRlbnRpZmllck5hbWV9IGZyb20gJy4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge0NvbXBpbGVSZWZsZWN0b3J9IGZyb20gJy4vY29tcGlsZV9yZWZsZWN0b3InO1xuaW1wb3J0IHtJbmplY3RGbGFncywgTm9kZUZsYWdzfSBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHtJZGVudGlmaWVyc30gZnJvbSAnLi9pZGVudGlmaWVycyc7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtjb252ZXJ0VmFsdWVUb091dHB1dEFzdH0gZnJvbSAnLi9vdXRwdXQvdmFsdWVfdXRpbCc7XG5pbXBvcnQge3R5cGVTb3VyY2VTcGFufSBmcm9tICcuL3BhcnNlX3V0aWwnO1xuaW1wb3J0IHtOZ01vZHVsZVByb3ZpZGVyQW5hbHl6ZXJ9IGZyb20gJy4vcHJvdmlkZXJfYW5hbHl6ZXInO1xuaW1wb3J0IHtPdXRwdXRDb250ZXh0fSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJQcm92aWRlckRlZiwgZGVwRGVmLCBwcm92aWRlckRlZn0gZnJvbSAnLi92aWV3X2NvbXBpbGVyL3Byb3ZpZGVyX2NvbXBpbGVyJztcblxudHlwZSBNYXBFbnRyeSA9IHtcbiAga2V5OiBzdHJpbmcsXG4gIHF1b3RlZDogYm9vbGVhbixcbiAgdmFsdWU6IG8uRXhwcmVzc2lvblxufTtcbnR5cGUgTWFwTGl0ZXJhbCA9IE1hcEVudHJ5W107XG5cbmZ1bmN0aW9uIG1hcEVudHJ5KGtleTogc3RyaW5nLCB2YWx1ZTogby5FeHByZXNzaW9uKTogTWFwRW50cnkge1xuICByZXR1cm4ge2tleSwgdmFsdWUsIHF1b3RlZDogZmFsc2V9O1xufVxuXG5leHBvcnQgY2xhc3MgSW5qZWN0YWJsZUNvbXBpbGVyIHtcbiAgcHJpdmF0ZSB0b2tlbkluamVjdG9yOiBTdGF0aWNTeW1ib2w7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmbGVjdG9yOiBDb21waWxlUmVmbGVjdG9yLCBwcml2YXRlIGFsd2F5c0dlbmVyYXRlRGVmOiBib29sZWFuKSB7XG4gICAgdGhpcy50b2tlbkluamVjdG9yID0gcmVmbGVjdG9yLnJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShJZGVudGlmaWVycy5JbmplY3Rvcik7XG4gIH1cblxuICBwcml2YXRlIGRlcHNBcnJheShkZXBzOiBhbnlbXSwgY3R4OiBPdXRwdXRDb250ZXh0KTogby5FeHByZXNzaW9uW10ge1xuICAgIHJldHVybiBkZXBzLm1hcChkZXAgPT4ge1xuICAgICAgbGV0IHRva2VuID0gZGVwO1xuICAgICAgbGV0IGFyZ3MgPSBbdG9rZW5dO1xuICAgICAgbGV0IGZsYWdzOiBJbmplY3RGbGFncyA9IEluamVjdEZsYWdzLkRlZmF1bHQ7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkZXApKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgdiA9IGRlcFtpXTtcbiAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgaWYgKHYubmdNZXRhZGF0YU5hbWUgPT09ICdPcHRpb25hbCcpIHtcbiAgICAgICAgICAgICAgZmxhZ3MgfD0gSW5qZWN0RmxhZ3MuT3B0aW9uYWw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHYubmdNZXRhZGF0YU5hbWUgPT09ICdTa2lwU2VsZicpIHtcbiAgICAgICAgICAgICAgZmxhZ3MgfD0gSW5qZWN0RmxhZ3MuU2tpcFNlbGY7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHYubmdNZXRhZGF0YU5hbWUgPT09ICdTZWxmJykge1xuICAgICAgICAgICAgICBmbGFncyB8PSBJbmplY3RGbGFncy5TZWxmO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2Lm5nTWV0YWRhdGFOYW1lID09PSAnSW5qZWN0Jykge1xuICAgICAgICAgICAgICB0b2tlbiA9IHYudG9rZW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0b2tlbiA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCB0b2tlbkV4cHI6IG8uRXhwcmVzc2lvbjtcbiAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRva2VuRXhwciA9IG8ubGl0ZXJhbCh0b2tlbik7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuID09PSB0aGlzLnRva2VuSW5qZWN0b3IpIHtcbiAgICAgICAgdG9rZW5FeHByID0gby5pbXBvcnRFeHByKElkZW50aWZpZXJzLklOSkVDVE9SKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRva2VuRXhwciA9IGN0eC5pbXBvcnRFeHByKHRva2VuKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZsYWdzICE9PSBJbmplY3RGbGFncy5EZWZhdWx0KSB7XG4gICAgICAgIGFyZ3MgPSBbdG9rZW5FeHByLCBvLmxpdGVyYWwoZmxhZ3MpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZ3MgPSBbdG9rZW5FeHByXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvLmltcG9ydEV4cHIoSWRlbnRpZmllcnMuaW5qZWN0KS5jYWxsRm4oYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICBmYWN0b3J5Rm9yKGluamVjdGFibGU6IENvbXBpbGVJbmplY3RhYmxlTWV0YWRhdGEsIGN0eDogT3V0cHV0Q29udGV4dCk6IG8uRXhwcmVzc2lvbiB7XG4gICAgbGV0IHJldFZhbHVlOiBvLkV4cHJlc3Npb247XG4gICAgaWYgKGluamVjdGFibGUudXNlRXhpc3RpbmcpIHtcbiAgICAgIHJldFZhbHVlID0gby5pbXBvcnRFeHByKElkZW50aWZpZXJzLmluamVjdCkuY2FsbEZuKFtjdHguaW1wb3J0RXhwcihpbmplY3RhYmxlLnVzZUV4aXN0aW5nKV0pO1xuICAgIH0gZWxzZSBpZiAoaW5qZWN0YWJsZS51c2VGYWN0b3J5KSB7XG4gICAgICBjb25zdCBkZXBzID0gaW5qZWN0YWJsZS5kZXBzIHx8IFtdO1xuICAgICAgaWYgKGRlcHMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXRWYWx1ZSA9IGN0eC5pbXBvcnRFeHByKGluamVjdGFibGUudXNlRmFjdG9yeSkuY2FsbEZuKHRoaXMuZGVwc0FycmF5KGRlcHMsIGN0eCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGN0eC5pbXBvcnRFeHByKGluamVjdGFibGUudXNlRmFjdG9yeSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpbmplY3RhYmxlLnVzZVZhbHVlKSB7XG4gICAgICByZXRWYWx1ZSA9IGNvbnZlcnRWYWx1ZVRvT3V0cHV0QXN0KGN0eCwgaW5qZWN0YWJsZS51c2VWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNsYXp6ID0gaW5qZWN0YWJsZS51c2VDbGFzcyB8fCBpbmplY3RhYmxlLnN5bWJvbDtcbiAgICAgIGNvbnN0IGRlcEFyZ3MgPSB0aGlzLmRlcHNBcnJheSh0aGlzLnJlZmxlY3Rvci5wYXJhbWV0ZXJzKGNsYXp6KSwgY3R4KTtcbiAgICAgIHJldFZhbHVlID0gbmV3IG8uSW5zdGFudGlhdGVFeHByKGN0eC5pbXBvcnRFeHByKGNsYXp6KSwgZGVwQXJncyk7XG4gICAgfVxuICAgIHJldHVybiBvLmZuKFxuICAgICAgICBbXSwgW25ldyBvLlJldHVyblN0YXRlbWVudChyZXRWYWx1ZSldLCB1bmRlZmluZWQsIHVuZGVmaW5lZCxcbiAgICAgICAgaW5qZWN0YWJsZS5zeW1ib2wubmFtZSArICdfRmFjdG9yeScpO1xuICB9XG5cbiAgaW5qZWN0YWJsZURlZihpbmplY3RhYmxlOiBDb21waWxlSW5qZWN0YWJsZU1ldGFkYXRhLCBjdHg6IE91dHB1dENvbnRleHQpOiBvLkV4cHJlc3Npb24ge1xuICAgIGxldCBwcm92aWRlZEluOiBvLkV4cHJlc3Npb24gPSBvLk5VTExfRVhQUjtcbiAgICBpZiAoaW5qZWN0YWJsZS5wcm92aWRlZEluICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChpbmplY3RhYmxlLnByb3ZpZGVkSW4gPT09IG51bGwpIHtcbiAgICAgICAgcHJvdmlkZWRJbiA9IG8uTlVMTF9FWFBSO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW5qZWN0YWJsZS5wcm92aWRlZEluID09PSAnc3RyaW5nJykge1xuICAgICAgICBwcm92aWRlZEluID0gby5saXRlcmFsKGluamVjdGFibGUucHJvdmlkZWRJbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm92aWRlZEluID0gY3R4LmltcG9ydEV4cHIoaW5qZWN0YWJsZS5wcm92aWRlZEluKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgZGVmOiBNYXBMaXRlcmFsID0gW1xuICAgICAgbWFwRW50cnkoJ2ZhY3RvcnknLCB0aGlzLmZhY3RvcnlGb3IoaW5qZWN0YWJsZSwgY3R4KSksXG4gICAgICBtYXBFbnRyeSgndG9rZW4nLCBjdHguaW1wb3J0RXhwcihpbmplY3RhYmxlLnR5cGUucmVmZXJlbmNlKSksXG4gICAgICBtYXBFbnRyeSgncHJvdmlkZWRJbicsIHByb3ZpZGVkSW4pLFxuICAgIF07XG4gICAgcmV0dXJuIG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy7Jtcm1ZGVmaW5lSW5qZWN0YWJsZSkuY2FsbEZuKFtvLmxpdGVyYWxNYXAoZGVmKV0pO1xuICB9XG5cbiAgY29tcGlsZShpbmplY3RhYmxlOiBDb21waWxlSW5qZWN0YWJsZU1ldGFkYXRhLCBjdHg6IE91dHB1dENvbnRleHQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hbHdheXNHZW5lcmF0ZURlZiB8fCBpbmplY3RhYmxlLnByb3ZpZGVkSW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gaWRlbnRpZmllck5hbWUoaW5qZWN0YWJsZS50eXBlKSE7XG4gICAgICBjb25zdCBjbGF6eiA9IG5ldyBvLkNsYXNzU3RtdChcbiAgICAgICAgICBjbGFzc05hbWUsIG51bGwsXG4gICAgICAgICAgW1xuICAgICAgICAgICAgbmV3IG8uQ2xhc3NGaWVsZChcbiAgICAgICAgICAgICAgICAnybVwcm92Jywgby5JTkZFUlJFRF9UWVBFLCBbby5TdG10TW9kaWZpZXIuU3RhdGljXSxcbiAgICAgICAgICAgICAgICB0aGlzLmluamVjdGFibGVEZWYoaW5qZWN0YWJsZSwgY3R4KSksXG4gICAgICAgICAgXSxcbiAgICAgICAgICBbXSwgbmV3IG8uQ2xhc3NNZXRob2QobnVsbCwgW10sIFtdKSwgW10pO1xuICAgICAgY3R4LnN0YXRlbWVudHMucHVzaChjbGF6eik7XG4gICAgfVxuICB9XG59XG4iXX0=