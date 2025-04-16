"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionQteTypeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbSingleBtnQte_1 = require("./FbSingleBtnQte");
class UnionQteTypeHelper {
  static GetUnionQteTypeObject(e) {
    if (e === fb_component_1.UnionQteType.SingleBtnQte)
      return new fb_component_1.SingleBtnQte();
  }
  static ReadUnionQteType(e, t) {
    return void 0 !== t && e === fb_component_1.UnionQteType.SingleBtnQte
      ? FbSingleBtnQte_1.FbSingleBtnQte.Create(t)
      : void 0;
  }
}
exports.UnionQteTypeHelper = UnionQteTypeHelper;
//# sourceMappingURL=UnionQteTypeHelper.js.map
