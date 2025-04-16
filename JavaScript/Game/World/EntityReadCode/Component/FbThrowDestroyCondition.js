"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbThrowDestroyCondition = void 0);
class FbThrowDestroyCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Gfh = !1),
      (this.Ofh = 0);
  }
  static Create(t) {
    if (t) return new FbThrowDestroyCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get DelayTime() {
    return (
      this.Gfh ||
        ((this.Gfh = !0), (this.Ofh = this.FbDataInternal.delayTime())),
      this.Ofh
    );
  }
}
exports.FbThrowDestroyCondition = FbThrowDestroyCondition;
//# sourceMappingURL=FbThrowDestroyCondition.js.map
