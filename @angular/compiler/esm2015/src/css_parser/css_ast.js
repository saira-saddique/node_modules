/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CssToken, CssTokenType } from './css_lexer';
export var BlockType;
(function (BlockType) {
    BlockType[BlockType["Import"] = 0] = "Import";
    BlockType[BlockType["Charset"] = 1] = "Charset";
    BlockType[BlockType["Namespace"] = 2] = "Namespace";
    BlockType[BlockType["Supports"] = 3] = "Supports";
    BlockType[BlockType["Keyframes"] = 4] = "Keyframes";
    BlockType[BlockType["MediaQuery"] = 5] = "MediaQuery";
    BlockType[BlockType["Selector"] = 6] = "Selector";
    BlockType[BlockType["FontFace"] = 7] = "FontFace";
    BlockType[BlockType["Page"] = 8] = "Page";
    BlockType[BlockType["Document"] = 9] = "Document";
    BlockType[BlockType["Viewport"] = 10] = "Viewport";
    BlockType[BlockType["Unsupported"] = 11] = "Unsupported";
})(BlockType || (BlockType = {}));
export class CssAst {
    constructor(location) {
        this.location = location;
    }
    get start() {
        return this.location.start;
    }
    get end() {
        return this.location.end;
    }
}
export class CssStyleValueAst extends CssAst {
    constructor(location, tokens, strValue) {
        super(location);
        this.tokens = tokens;
        this.strValue = strValue;
    }
    visit(visitor, context) {
        return visitor.visitCssValue(this);
    }
}
export class CssRuleAst extends CssAst {
    constructor(location) {
        super(location);
    }
}
export class CssBlockRuleAst extends CssRuleAst {
    constructor(location, type, block, name = null) {
        super(location);
        this.location = location;
        this.type = type;
        this.block = block;
        this.name = name;
    }
    visit(visitor, context) {
        return visitor.visitCssBlock(this.block, context);
    }
}
export class CssKeyframeRuleAst extends CssBlockRuleAst {
    constructor(location, name, block) {
        super(location, BlockType.Keyframes, block, name);
    }
    visit(visitor, context) {
        return visitor.visitCssKeyframeRule(this, context);
    }
}
export class CssKeyframeDefinitionAst extends CssBlockRuleAst {
    constructor(location, steps, block) {
        super(location, BlockType.Keyframes, block, mergeTokens(steps, ','));
        this.steps = steps;
    }
    visit(visitor, context) {
        return visitor.visitCssKeyframeDefinition(this, context);
    }
}
export class CssBlockDefinitionRuleAst extends CssBlockRuleAst {
    constructor(location, strValue, type, query, block) {
        super(location, type, block);
        this.strValue = strValue;
        this.query = query;
        const firstCssToken = query.tokens[0];
        this.name = new CssToken(firstCssToken.index, firstCssToken.column, firstCssToken.line, CssTokenType.Identifier, this.strValue);
    }
    visit(visitor, context) {
        return visitor.visitCssBlock(this.block, context);
    }
}
export class CssMediaQueryRuleAst extends CssBlockDefinitionRuleAst {
    constructor(location, strValue, query, block) {
        super(location, strValue, BlockType.MediaQuery, query, block);
    }
    visit(visitor, context) {
        return visitor.visitCssMediaQueryRule(this, context);
    }
}
export class CssAtRulePredicateAst extends CssAst {
    constructor(location, strValue, tokens) {
        super(location);
        this.strValue = strValue;
        this.tokens = tokens;
    }
    visit(visitor, context) {
        return visitor.visitCssAtRulePredicate(this, context);
    }
}
export class CssInlineRuleAst extends CssRuleAst {
    constructor(location, type, value) {
        super(location);
        this.type = type;
        this.value = value;
    }
    visit(visitor, context) {
        return visitor.visitCssInlineRule(this, context);
    }
}
export class CssSelectorRuleAst extends CssBlockRuleAst {
    constructor(location, selectors, block) {
        super(location, BlockType.Selector, block);
        this.selectors = selectors;
        this.strValue = selectors.map(selector => selector.strValue).join(',');
    }
    visit(visitor, context) {
        return visitor.visitCssSelectorRule(this, context);
    }
}
export class CssDefinitionAst extends CssAst {
    constructor(location, property, value) {
        super(location);
        this.property = property;
        this.value = value;
    }
    visit(visitor, context) {
        return visitor.visitCssDefinition(this, context);
    }
}
export class CssSelectorPartAst extends CssAst {
    constructor(location) {
        super(location);
    }
}
export class CssSelectorAst extends CssSelectorPartAst {
    constructor(location, selectorParts) {
        super(location);
        this.selectorParts = selectorParts;
        this.strValue = selectorParts.map(part => part.strValue).join('');
    }
    visit(visitor, context) {
        return visitor.visitCssSelector(this, context);
    }
}
export class CssSimpleSelectorAst extends CssSelectorPartAst {
    constructor(location, tokens, strValue, pseudoSelectors, operator) {
        super(location);
        this.tokens = tokens;
        this.strValue = strValue;
        this.pseudoSelectors = pseudoSelectors;
        this.operator = operator;
    }
    visit(visitor, context) {
        return visitor.visitCssSimpleSelector(this, context);
    }
}
export class CssPseudoSelectorAst extends CssSelectorPartAst {
    constructor(location, strValue, name, tokens, innerSelectors) {
        super(location);
        this.strValue = strValue;
        this.name = name;
        this.tokens = tokens;
        this.innerSelectors = innerSelectors;
    }
    visit(visitor, context) {
        return visitor.visitCssPseudoSelector(this, context);
    }
}
export class CssBlockAst extends CssAst {
    constructor(location, entries) {
        super(location);
        this.entries = entries;
    }
    visit(visitor, context) {
        return visitor.visitCssBlock(this, context);
    }
}
/*
 a style block is different from a standard block because it contains
 css prop:value definitions. A regular block can contain a list of Ast entries.
 */
export class CssStylesBlockAst extends CssBlockAst {
    constructor(location, definitions) {
        super(location, definitions);
        this.definitions = definitions;
    }
    visit(visitor, context) {
        return visitor.visitCssStylesBlock(this, context);
    }
}
export class CssStyleSheetAst extends CssAst {
    constructor(location, rules) {
        super(location);
        this.rules = rules;
    }
    visit(visitor, context) {
        return visitor.visitCssStyleSheet(this, context);
    }
}
export class CssUnknownRuleAst extends CssRuleAst {
    constructor(location, ruleName, tokens) {
        super(location);
        this.ruleName = ruleName;
        this.tokens = tokens;
    }
    visit(visitor, context) {
        return visitor.visitCssUnknownRule(this, context);
    }
}
export class CssUnknownTokenListAst extends CssRuleAst {
    constructor(location, name, tokens) {
        super(location);
        this.name = name;
        this.tokens = tokens;
    }
    visit(visitor, context) {
        return visitor.visitCssUnknownTokenList(this, context);
    }
}
export function mergeTokens(tokens, separator = '') {
    const mainToken = tokens[0];
    let str = mainToken.strValue;
    for (let i = 1; i < tokens.length; i++) {
        str += separator + tokens[i].strValue;
    }
    return new CssToken(mainToken.index, mainToken.column, mainToken.line, mainToken.type, str);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX2FzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9jc3NfcGFyc2VyL2Nzc19hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBSUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFbkQsTUFBTSxDQUFOLElBQVksU0FhWDtBQWJELFdBQVksU0FBUztJQUNuQiw2Q0FBTSxDQUFBO0lBQ04sK0NBQU8sQ0FBQTtJQUNQLG1EQUFTLENBQUE7SUFDVCxpREFBUSxDQUFBO0lBQ1IsbURBQVMsQ0FBQTtJQUNULHFEQUFVLENBQUE7SUFDVixpREFBUSxDQUFBO0lBQ1IsaURBQVEsQ0FBQTtJQUNSLHlDQUFJLENBQUE7SUFDSixpREFBUSxDQUFBO0lBQ1Isa0RBQVEsQ0FBQTtJQUNSLHdEQUFXLENBQUE7QUFDYixDQUFDLEVBYlcsU0FBUyxLQUFULFNBQVMsUUFhcEI7QUFxQkQsTUFBTSxPQUFnQixNQUFNO0lBQzFCLFlBQW1CLFFBQXlCO1FBQXpCLGFBQVEsR0FBUixRQUFRLENBQWlCO0lBQUcsQ0FBQztJQUNoRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0lBQzNCLENBQUM7Q0FFRjtBQUVELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxNQUFNO0lBQzFDLFlBQVksUUFBeUIsRUFBUyxNQUFrQixFQUFTLFFBQWdCO1FBQ3ZGLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUQ0QixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtJQUV6RixDQUFDO0lBQ0QsS0FBSyxDQUFDLE9BQXNCLEVBQUUsT0FBYTtRQUN6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QUFPLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDRjtBQUVELE1BQU0sVUFBVSxXQUFXLENBQUMsTUFBa0IsRUFBRSxZQUFvQixFQUFFO0lBQ3BFLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLEdBQUcsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztLQUN2QztJQUVELE9BQU8sSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM5RixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGFyc2VMb2NhdGlvbiwgUGFyc2VTb3VyY2VTcGFufSBmcm9tICcuLi9wYXJzZV91dGlsJztcblxuaW1wb3J0IHtDc3NUb2tlbiwgQ3NzVG9rZW5UeXBlfSBmcm9tICcuL2Nzc19sZXhlcic7XG5cbmV4cG9ydCBlbnVtIEJsb2NrVHlwZSB7XG4gIEltcG9ydCxcbiAgQ2hhcnNldCxcbiAgTmFtZXNwYWNlLFxuICBTdXBwb3J0cyxcbiAgS2V5ZnJhbWVzLFxuICBNZWRpYVF1ZXJ5LFxuICBTZWxlY3RvcixcbiAgRm9udEZhY2UsXG4gIFBhZ2UsXG4gIERvY3VtZW50LFxuICBWaWV3cG9ydCxcbiAgVW5zdXBwb3J0ZWRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDc3NBc3RWaXNpdG9yIHtcbiAgdmlzaXRDc3NWYWx1ZShhc3Q6IENzc1N0eWxlVmFsdWVBc3QsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q3NzSW5saW5lUnVsZShhc3Q6IENzc0lubGluZVJ1bGVBc3QsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q3NzQXRSdWxlUHJlZGljYXRlKGFzdDogQ3NzQXRSdWxlUHJlZGljYXRlQXN0LCBjb250ZXh0PzogYW55KTogYW55O1xuICB2aXNpdENzc0tleWZyYW1lUnVsZShhc3Q6IENzc0tleWZyYW1lUnVsZUFzdCwgY29udGV4dD86IGFueSk6IGFueTtcbiAgdmlzaXRDc3NLZXlmcmFtZURlZmluaXRpb24oYXN0OiBDc3NLZXlmcmFtZURlZmluaXRpb25Bc3QsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q3NzTWVkaWFRdWVyeVJ1bGUoYXN0OiBDc3NNZWRpYVF1ZXJ5UnVsZUFzdCwgY29udGV4dD86IGFueSk6IGFueTtcbiAgdmlzaXRDc3NTZWxlY3RvclJ1bGUoYXN0OiBDc3NTZWxlY3RvclJ1bGVBc3QsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q3NzU2VsZWN0b3IoYXN0OiBDc3NTZWxlY3RvckFzdCwgY29udGV4dD86IGFueSk6IGFueTtcbiAgdmlzaXRDc3NTaW1wbGVTZWxlY3Rvcihhc3Q6IENzc1NpbXBsZVNlbGVjdG9yQXN0LCBjb250ZXh0PzogYW55KTogYW55O1xuICB2aXNpdENzc1BzZXVkb1NlbGVjdG9yKGFzdDogQ3NzUHNldWRvU2VsZWN0b3JBc3QsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q3NzRGVmaW5pdGlvbihhc3Q6IENzc0RlZmluaXRpb25Bc3QsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q3NzQmxvY2soYXN0OiBDc3NCbG9ja0FzdCwgY29udGV4dD86IGFueSk6IGFueTtcbiAgdmlzaXRDc3NTdHlsZXNCbG9jayhhc3Q6IENzc1N0eWxlc0Jsb2NrQXN0LCBjb250ZXh0PzogYW55KTogYW55O1xuICB2aXNpdENzc1N0eWxlU2hlZXQoYXN0OiBDc3NTdHlsZVNoZWV0QXN0LCBjb250ZXh0PzogYW55KTogYW55O1xuICB2aXNpdENzc1Vua25vd25SdWxlKGFzdDogQ3NzVW5rbm93blJ1bGVBc3QsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q3NzVW5rbm93blRva2VuTGlzdChhc3Q6IENzc1Vua25vd25Ub2tlbkxpc3RBc3QsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDc3NBc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9jYXRpb246IFBhcnNlU291cmNlU3Bhbikge31cbiAgZ2V0IHN0YXJ0KCk6IFBhcnNlTG9jYXRpb24ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0aW9uLnN0YXJ0O1xuICB9XG4gIGdldCBlbmQoKTogUGFyc2VMb2NhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRpb24uZW5kO1xuICB9XG4gIGFic3RyYWN0IHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NTdHlsZVZhbHVlQXN0IGV4dGVuZHMgQ3NzQXN0IHtcbiAgY29uc3RydWN0b3IobG9jYXRpb246IFBhcnNlU291cmNlU3BhbiwgcHVibGljIHRva2VuczogQ3NzVG9rZW5bXSwgcHVibGljIHN0clZhbHVlOiBzdHJpbmcpIHtcbiAgICBzdXBlcihsb2NhdGlvbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQXN0VmlzaXRvciwgY29udGV4dD86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDc3NWYWx1ZSh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ3NzUnVsZUFzdCBleHRlbmRzIENzc0FzdCB7XG4gIGNvbnN0cnVjdG9yKGxvY2F0aW9uOiBQYXJzZVNvdXJjZVNwYW4pIHtcbiAgICBzdXBlcihsb2NhdGlvbik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc0Jsb2NrUnVsZUFzdCBleHRlbmRzIENzc1J1bGVBc3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgdHlwZTogQmxvY2tUeXBlLCBwdWJsaWMgYmxvY2s6IENzc0Jsb2NrQXN0LFxuICAgICAgcHVibGljIG5hbWU6IENzc1Rva2VufG51bGwgPSBudWxsKSB7XG4gICAgc3VwZXIobG9jYXRpb24pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzQmxvY2sodGhpcy5ibG9jaywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc0tleWZyYW1lUnVsZUFzdCBleHRlbmRzIENzc0Jsb2NrUnVsZUFzdCB7XG4gIGNvbnN0cnVjdG9yKGxvY2F0aW9uOiBQYXJzZVNvdXJjZVNwYW4sIG5hbWU6IENzc1Rva2VuLCBibG9jazogQ3NzQmxvY2tBc3QpIHtcbiAgICBzdXBlcihsb2NhdGlvbiwgQmxvY2tUeXBlLktleWZyYW1lcywgYmxvY2ssIG5hbWUpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzS2V5ZnJhbWVSdWxlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NLZXlmcmFtZURlZmluaXRpb25Bc3QgZXh0ZW5kcyBDc3NCbG9ja1J1bGVBc3Qge1xuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgc3RlcHM6IENzc1Rva2VuW10sIGJsb2NrOiBDc3NCbG9ja0FzdCkge1xuICAgIHN1cGVyKGxvY2F0aW9uLCBCbG9ja1R5cGUuS2V5ZnJhbWVzLCBibG9jaywgbWVyZ2VUb2tlbnMoc3RlcHMsICcsJykpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzS2V5ZnJhbWVEZWZpbml0aW9uKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NCbG9ja0RlZmluaXRpb25SdWxlQXN0IGV4dGVuZHMgQ3NzQmxvY2tSdWxlQXN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZywgdHlwZTogQmxvY2tUeXBlLFxuICAgICAgcHVibGljIHF1ZXJ5OiBDc3NBdFJ1bGVQcmVkaWNhdGVBc3QsIGJsb2NrOiBDc3NCbG9ja0FzdCkge1xuICAgIHN1cGVyKGxvY2F0aW9uLCB0eXBlLCBibG9jayk7XG4gICAgY29uc3QgZmlyc3RDc3NUb2tlbjogQ3NzVG9rZW4gPSBxdWVyeS50b2tlbnNbMF07XG4gICAgdGhpcy5uYW1lID0gbmV3IENzc1Rva2VuKFxuICAgICAgICBmaXJzdENzc1Rva2VuLmluZGV4LCBmaXJzdENzc1Rva2VuLmNvbHVtbiwgZmlyc3RDc3NUb2tlbi5saW5lLCBDc3NUb2tlblR5cGUuSWRlbnRpZmllcixcbiAgICAgICAgdGhpcy5zdHJWYWx1ZSk7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQXN0VmlzaXRvciwgY29udGV4dD86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDc3NCbG9jayh0aGlzLmJsb2NrLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzTWVkaWFRdWVyeVJ1bGVBc3QgZXh0ZW5kcyBDc3NCbG9ja0RlZmluaXRpb25SdWxlQXN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBzdHJWYWx1ZTogc3RyaW5nLCBxdWVyeTogQ3NzQXRSdWxlUHJlZGljYXRlQXN0LFxuICAgICAgYmxvY2s6IENzc0Jsb2NrQXN0KSB7XG4gICAgc3VwZXIobG9jYXRpb24sIHN0clZhbHVlLCBCbG9ja1R5cGUuTWVkaWFRdWVyeSwgcXVlcnksIGJsb2NrKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBc3RWaXNpdG9yLCBjb250ZXh0PzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENzc01lZGlhUXVlcnlSdWxlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NBdFJ1bGVQcmVkaWNhdGVBc3QgZXh0ZW5kcyBDc3NBc3Qge1xuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZywgcHVibGljIHRva2VuczogQ3NzVG9rZW5bXSkge1xuICAgIHN1cGVyKGxvY2F0aW9uKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBc3RWaXNpdG9yLCBjb250ZXh0PzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENzc0F0UnVsZVByZWRpY2F0ZSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzSW5saW5lUnVsZUFzdCBleHRlbmRzIENzc1J1bGVBc3Qge1xuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgdHlwZTogQmxvY2tUeXBlLCBwdWJsaWMgdmFsdWU6IENzc1N0eWxlVmFsdWVBc3QpIHtcbiAgICBzdXBlcihsb2NhdGlvbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQXN0VmlzaXRvciwgY29udGV4dD86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDc3NJbmxpbmVSdWxlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NTZWxlY3RvclJ1bGVBc3QgZXh0ZW5kcyBDc3NCbG9ja1J1bGVBc3Qge1xuICBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgc2VsZWN0b3JzOiBDc3NTZWxlY3RvckFzdFtdLCBibG9jazogQ3NzQmxvY2tBc3QpIHtcbiAgICBzdXBlcihsb2NhdGlvbiwgQmxvY2tUeXBlLlNlbGVjdG9yLCBibG9jayk7XG4gICAgdGhpcy5zdHJWYWx1ZSA9IHNlbGVjdG9ycy5tYXAoc2VsZWN0b3IgPT4gc2VsZWN0b3Iuc3RyVmFsdWUpLmpvaW4oJywnKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBc3RWaXNpdG9yLCBjb250ZXh0PzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENzc1NlbGVjdG9yUnVsZSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzRGVmaW5pdGlvbkFzdCBleHRlbmRzIENzc0FzdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgbG9jYXRpb246IFBhcnNlU291cmNlU3BhbiwgcHVibGljIHByb3BlcnR5OiBDc3NUb2tlbiwgcHVibGljIHZhbHVlOiBDc3NTdHlsZVZhbHVlQXN0KSB7XG4gICAgc3VwZXIobG9jYXRpb24pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzRGVmaW5pdGlvbih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ3NzU2VsZWN0b3JQYXJ0QXN0IGV4dGVuZHMgQ3NzQXN0IHtcbiAgY29uc3RydWN0b3IobG9jYXRpb246IFBhcnNlU291cmNlU3Bhbikge1xuICAgIHN1cGVyKGxvY2F0aW9uKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzU2VsZWN0b3JBc3QgZXh0ZW5kcyBDc3NTZWxlY3RvclBhcnRBc3Qge1xuICBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZztcbiAgY29uc3RydWN0b3IobG9jYXRpb246IFBhcnNlU291cmNlU3BhbiwgcHVibGljIHNlbGVjdG9yUGFydHM6IENzc1NpbXBsZVNlbGVjdG9yQXN0W10pIHtcbiAgICBzdXBlcihsb2NhdGlvbik7XG4gICAgdGhpcy5zdHJWYWx1ZSA9IHNlbGVjdG9yUGFydHMubWFwKHBhcnQgPT4gcGFydC5zdHJWYWx1ZSkuam9pbignJyk7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQXN0VmlzaXRvciwgY29udGV4dD86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDc3NTZWxlY3Rvcih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzU2ltcGxlU2VsZWN0b3JBc3QgZXh0ZW5kcyBDc3NTZWxlY3RvclBhcnRBc3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIGxvY2F0aW9uOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyB0b2tlbnM6IENzc1Rva2VuW10sIHB1YmxpYyBzdHJWYWx1ZTogc3RyaW5nLFxuICAgICAgcHVibGljIHBzZXVkb1NlbGVjdG9yczogQ3NzUHNldWRvU2VsZWN0b3JBc3RbXSwgcHVibGljIG9wZXJhdG9yOiBDc3NUb2tlbikge1xuICAgIHN1cGVyKGxvY2F0aW9uKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBc3RWaXNpdG9yLCBjb250ZXh0PzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENzc1NpbXBsZVNlbGVjdG9yKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NQc2V1ZG9TZWxlY3RvckFzdCBleHRlbmRzIENzc1NlbGVjdG9yUGFydEFzdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgbG9jYXRpb246IFBhcnNlU291cmNlU3BhbiwgcHVibGljIHN0clZhbHVlOiBzdHJpbmcsIHB1YmxpYyBuYW1lOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgdG9rZW5zOiBDc3NUb2tlbltdLCBwdWJsaWMgaW5uZXJTZWxlY3RvcnM6IENzc1NlbGVjdG9yQXN0W10pIHtcbiAgICBzdXBlcihsb2NhdGlvbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQXN0VmlzaXRvciwgY29udGV4dD86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDc3NQc2V1ZG9TZWxlY3Rvcih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzQmxvY2tBc3QgZXh0ZW5kcyBDc3NBc3Qge1xuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgZW50cmllczogQ3NzQXN0W10pIHtcbiAgICBzdXBlcihsb2NhdGlvbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQXN0VmlzaXRvciwgY29udGV4dD86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDc3NCbG9jayh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG4vKlxuIGEgc3R5bGUgYmxvY2sgaXMgZGlmZmVyZW50IGZyb20gYSBzdGFuZGFyZCBibG9jayBiZWNhdXNlIGl0IGNvbnRhaW5zXG4gY3NzIHByb3A6dmFsdWUgZGVmaW5pdGlvbnMuIEEgcmVndWxhciBibG9jayBjYW4gY29udGFpbiBhIGxpc3Qgb2YgQXN0IGVudHJpZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDc3NTdHlsZXNCbG9ja0FzdCBleHRlbmRzIENzc0Jsb2NrQXN0IHtcbiAgY29uc3RydWN0b3IobG9jYXRpb246IFBhcnNlU291cmNlU3BhbiwgcHVibGljIGRlZmluaXRpb25zOiBDc3NEZWZpbml0aW9uQXN0W10pIHtcbiAgICBzdXBlcihsb2NhdGlvbiwgZGVmaW5pdGlvbnMpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzU3R5bGVzQmxvY2sodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc1N0eWxlU2hlZXRBc3QgZXh0ZW5kcyBDc3NBc3Qge1xuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgcnVsZXM6IENzc0FzdFtdKSB7XG4gICAgc3VwZXIobG9jYXRpb24pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzU3R5bGVTaGVldCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzVW5rbm93blJ1bGVBc3QgZXh0ZW5kcyBDc3NSdWxlQXN0IHtcbiAgY29uc3RydWN0b3IobG9jYXRpb246IFBhcnNlU291cmNlU3BhbiwgcHVibGljIHJ1bGVOYW1lOiBzdHJpbmcsIHB1YmxpYyB0b2tlbnM6IENzc1Rva2VuW10pIHtcbiAgICBzdXBlcihsb2NhdGlvbik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQXN0VmlzaXRvciwgY29udGV4dD86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDc3NVbmtub3duUnVsZSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzVW5rbm93blRva2VuTGlzdEFzdCBleHRlbmRzIENzc1J1bGVBc3Qge1xuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgdG9rZW5zOiBDc3NUb2tlbltdKSB7XG4gICAgc3VwZXIobG9jYXRpb24pO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FzdFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q3NzVW5rbm93blRva2VuTGlzdCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VUb2tlbnModG9rZW5zOiBDc3NUb2tlbltdLCBzZXBhcmF0b3I6IHN0cmluZyA9ICcnKTogQ3NzVG9rZW4ge1xuICBjb25zdCBtYWluVG9rZW4gPSB0b2tlbnNbMF07XG4gIGxldCBzdHIgPSBtYWluVG9rZW4uc3RyVmFsdWU7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgc3RyICs9IHNlcGFyYXRvciArIHRva2Vuc1tpXS5zdHJWYWx1ZTtcbiAgfVxuXG4gIHJldHVybiBuZXcgQ3NzVG9rZW4obWFpblRva2VuLmluZGV4LCBtYWluVG9rZW4uY29sdW1uLCBtYWluVG9rZW4ubGluZSwgbWFpblRva2VuLnR5cGUsIHN0cik7XG59XG4iXX0=