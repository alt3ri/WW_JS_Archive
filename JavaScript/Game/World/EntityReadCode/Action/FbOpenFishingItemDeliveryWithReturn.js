"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenFishingItemDeliveryWithReturn = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbOpenFishingItemDeliveryWithReturn {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.TJl = !1),
      (this.bJl = 0),
      (this.mxh = !1),
      (this.Cxh = void 0);
  }
  static Create(t) {
    if (t) return new FbOpenFishingItemDeliveryWithReturn(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PresetId() {
    return (
      this.TJl ||
        ((this.TJl = !0), (this.bJl = this.FbDataInternal.presetId())),
      this.bJl
    );
  }
  get ReturnVar() {
    var t, e;
    return (
      !this.mxh &&
        ((this.mxh = !0),
        (t = this.FbDataInternal.returnVarType()),
        (e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.Cxh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.returnVar(e),
        )),
      this.Cxh
    );
  }
}
exports.FbOpenFishingItemDeliveryWithReturn =
  FbOpenFishingItemDeliveryWithReturn;
//# sourceMappingURL=FbOpenFishingItemDeliveryWithReturn.js.map
