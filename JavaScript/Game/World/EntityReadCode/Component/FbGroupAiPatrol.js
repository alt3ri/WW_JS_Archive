"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGroupAiPatrol = void 0);
class FbGroupAiPatrol {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.YXh = !1),
      (this.zXh = 0),
      (this.kuh = !1),
      (this.Guh = 0);
  }
  static Create(t) {
    if (t) return new FbGroupAiPatrol(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Leader() {
    return (
      this.YXh || ((this.YXh = !0), (this.zXh = this.FbDataInternal.leader())),
      this.zXh
    );
  }
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
}
exports.FbGroupAiPatrol = FbGroupAiPatrol;
//# sourceMappingURL=FbGroupAiPatrol.js.map
