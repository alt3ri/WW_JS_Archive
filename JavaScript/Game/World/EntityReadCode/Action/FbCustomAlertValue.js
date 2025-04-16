"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCustomAlertValue = void 0);
class FbCustomAlertValue {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ZSh = !1),
      (this.eMh = 0);
  }
  static Create(t) {
    if (t) return new FbCustomAlertValue(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CustomValue() {
    return (
      this.ZSh ||
        ((this.ZSh = !0), (this.eMh = this.FbDataInternal.customValue())),
      this.eMh
    );
  }
}
exports.FbCustomAlertValue = FbCustomAlertValue;
//# sourceMappingURL=FbCustomAlertValue.js.map
