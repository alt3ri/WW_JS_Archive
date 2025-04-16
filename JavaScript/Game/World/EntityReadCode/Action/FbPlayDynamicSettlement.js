"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayDynamicSettlement = void 0);
const UnionDynamicSettlementConfigHelper_1 = require("./UnionDynamicSettlementConfigHelper");
class FbPlayDynamicSettlement {
  constructor(e) {
    (this.FbDataInternal = e), (this.kAh = !1), (this.GAh = void 0);
  }
  static Create(e) {
    if (e) return new FbPlayDynamicSettlement(e);
  }
  get DynamicSettlementConfig() {
    var e, t;
    return (
      !this.kAh &&
        ((this.kAh = !0),
        (e = this.FbDataInternal.dynamicSettlementConfigType()),
        (t =
          UnionDynamicSettlementConfigHelper_1.UnionDynamicSettlementConfigHelper.GetUnionDynamicSettlementConfigObject(
            e,
          ))) &&
        (this.GAh =
          UnionDynamicSettlementConfigHelper_1.UnionDynamicSettlementConfigHelper.ReadUnionDynamicSettlementConfig(
            e,
            this.FbDataInternal.dynamicSettlementConfig(t),
          )),
      this.GAh
    );
  }
}
exports.FbPlayDynamicSettlement = FbPlayDynamicSettlement;
//# sourceMappingURL=FbPlayDynamicSettlement.js.map
