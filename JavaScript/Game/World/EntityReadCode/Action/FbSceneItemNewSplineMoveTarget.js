"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSceneItemNewSplineMoveTarget = void 0);
class FbSceneItemNewSplineMoveTarget {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.zuh = !1),
      (this.Juh = !1);
  }
  static Create(t) {
    if (t) return new FbSceneItemNewSplineMoveTarget(t);
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
  get IsLookDir() {
    return (
      this.zuh ||
        ((this.zuh = !0), (this.Juh = this.FbDataInternal.isLookDir())),
      this.Juh
    );
  }
}
exports.FbSceneItemNewSplineMoveTarget = FbSceneItemNewSplineMoveTarget;
//# sourceMappingURL=FbSceneItemNewSplineMoveTarget.js.map
