"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAddOrSubAlertValue = void 0);
class FbAddOrSubAlertValue {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.zSh = !1),
      (this.JSh = 0);
  }
  static Create(t) {
    if (t) return new FbAddOrSubAlertValue(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get DeltaValue() {
    return (
      this.zSh ||
        ((this.zSh = !0), (this.JSh = this.FbDataInternal.deltaValue())),
      this.JSh
    );
  }
}
exports.FbAddOrSubAlertValue = FbAddOrSubAlertValue;
//# sourceMappingURL=FbAddOrSubAlertValue.js.map
