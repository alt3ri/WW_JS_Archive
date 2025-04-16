"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPasserbyNpcSourceHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbPasserbyNpcTemplateSource_1 = require("./FbPasserbyNpcTemplateSource");
class UnionPasserbyNpcSourceHelper {
  static GetUnionPasserbyNpcSourceObject(e) {
    if (e === fb_component_1.UnionPasserbyNpcSource.PasserbyNpcTemplateSource)
      return new fb_component_1.PasserbyNpcTemplateSource();
  }
  static ReadUnionPasserbyNpcSource(e, o) {
    return void 0 !== o &&
      e === fb_component_1.UnionPasserbyNpcSource.PasserbyNpcTemplateSource
      ? FbPasserbyNpcTemplateSource_1.FbPasserbyNpcTemplateSource.Create(o)
      : void 0;
  }
}
exports.UnionPasserbyNpcSourceHelper = UnionPasserbyNpcSourceHelper;
//# sourceMappingURL=UnionPasserbyNpcSourceHelper.js.map
