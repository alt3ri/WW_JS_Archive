"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeSelfEntityPrefabPerformance = void 0);
class FbChangeSelfEntityPrefabPerformance {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.gLh = !1),
      (this.fLh = void 0);
  }
  static Create(t) {
    if (t) return new FbChangeSelfEntityPrefabPerformance(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
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
exports.FbChangeSelfEntityPrefabPerformance =
  FbChangeSelfEntityPrefabPerformance;
//# sourceMappingURL=FbChangeSelfEntityPrefabPerformance.js.map
