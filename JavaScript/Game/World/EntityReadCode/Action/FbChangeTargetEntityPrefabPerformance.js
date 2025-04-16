"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeTargetEntityPrefabPerformance = void 0);
class FbChangeTargetEntityPrefabPerformance {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.gLh = !1),
      (this.fLh = void 0);
  }
  static Create(t) {
    if (t) return new FbChangeTargetEntityPrefabPerformance(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get PerformanceTag() {
    return (
      this.gLh ||
        ((this.gLh = !0), (this.fLh = this.FbDataInternal.performanceTag())),
      this.fLh
    );
  }
}
exports.FbChangeTargetEntityPrefabPerformance =
  FbChangeTargetEntityPrefabPerformance;
//# sourceMappingURL=FbChangeTargetEntityPrefabPerformance.js.map
