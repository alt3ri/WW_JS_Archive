"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCustomAlertValueChangeSpeed = void 0);
class FbCustomAlertValueChangeSpeed {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ZSh = !1),
      (this.eMh = 0);
  }
  static Create(t) {
    if (t) return new FbCustomAlertValueChangeSpeed(t);
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
exports.FbCustomAlertValueChangeSpeed = FbCustomAlertValueChangeSpeed;
//# sourceMappingURL=FbCustomAlertValueChangeSpeed.js.map
