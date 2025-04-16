"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTriggerRangeStartCondition = void 0);
class FbTriggerRangeStartCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.M_h = !1),
      (this.E_h = 0);
  }
  static Create(t) {
    if (t) return new FbTriggerRangeStartCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Range() {
    return (
      this.M_h || ((this.M_h = !0), (this.E_h = this.FbDataInternal.range())),
      this.E_h
    );
  }
}
exports.FbTriggerRangeStartCondition = FbTriggerRangeStartCondition;
//# sourceMappingURL=FbTriggerRangeStartCondition.js.map
