"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionInhaledPerResultTypeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbInhaledChangeSelfState_1 = require("./FbInhaledChangeSelfState"),
  FbInhaledDestroySelf_1 = require("./FbInhaledDestroySelf");
class UnionInhaledPerResultTypeHelper {
  static GetUnionInhaledPerResultTypeObject(e) {
    switch (e) {
      case fb_component_1.UnionInhaledPerResultType.InhaledChangeSelfState:
        return new fb_component_1.InhaledChangeSelfState();
      case fb_component_1.UnionInhaledPerResultType.InhaledDestroySelf:
        return new fb_component_1.InhaledDestroySelf();
      default:
        return;
    }
  }
  static ReadUnionInhaledPerResultType(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_component_1.UnionInhaledPerResultType.InhaledChangeSelfState:
          return FbInhaledChangeSelfState_1.FbInhaledChangeSelfState.Create(n);
        case fb_component_1.UnionInhaledPerResultType.InhaledDestroySelf:
          return FbInhaledDestroySelf_1.FbInhaledDestroySelf.Create(n);
        default:
          return;
      }
  }
}
exports.UnionInhaledPerResultTypeHelper = UnionInhaledPerResultTypeHelper;
//# sourceMappingURL=UnionInhaledPerResultTypeHelper.js.map
