"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCommonTipTriggerDelegation = void 0);
class FbCommonTipTriggerDelegation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._yh = !1),
      (this.cyh = void 0),
      (this.uyh = !1),
      (this.dyh = void 0);
  }
  static Create(t) {
    if (t) return new FbCommonTipTriggerDelegation(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TidMainText() {
    return (
      this._yh ||
        ((this._yh = !0), (this.cyh = this.FbDataInternal.tidMainText())),
      this.cyh
    );
  }
  get TidSubText() {
    return (
      this.uyh ||
        ((this.uyh = !0), (this.dyh = this.FbDataInternal.tidSubText())),
      this.dyh
    );
  }
}
exports.FbCommonTipTriggerDelegation = FbCommonTipTriggerDelegation;
//# sourceMappingURL=FbCommonTipTriggerDelegation.js.map
