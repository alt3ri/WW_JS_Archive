"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbQuantityRefillCondition = void 0);
class FbQuantityRefillCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Zqh = !1),
      (this.ekh = 0),
      (this.h1_ = !1),
      (this.l1_ = 0);
  }
  static Create(t) {
    if (t) return new FbQuantityRefillCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Quantity() {
    return (
      this.Zqh ||
        ((this.Zqh = !0), (this.ekh = this.FbDataInternal.quantity())),
      this.ekh
    );
  }
  get DelayRefill() {
    return (
      this.h1_ ||
        ((this.h1_ = !0), (this.l1_ = this.FbDataInternal.delayRefill())),
      this.l1_
    );
  }
}
exports.FbQuantityRefillCondition = FbQuantityRefillCondition;
//# sourceMappingURL=FbQuantityRefillCondition.js.map
