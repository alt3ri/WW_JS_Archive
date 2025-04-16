"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcNewSplineMoveTarget = void 0);
class FbNpcNewSplineMoveTarget {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ioc = !1),
      (this.roc = 0);
  }
  static Create(t) {
    if (t) return new FbNpcNewSplineMoveTarget(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get NpcId() {
    return (
      this.ioc || ((this.ioc = !0), (this.roc = this.FbDataInternal.npcId())),
      this.roc
    );
  }
}
exports.FbNpcNewSplineMoveTarget = FbNpcNewSplineMoveTarget;
//# sourceMappingURL=FbNpcNewSplineMoveTarget.js.map
