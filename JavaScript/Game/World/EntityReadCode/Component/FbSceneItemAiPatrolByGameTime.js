"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSceneItemAiPatrolByGameTime = void 0);
class FbSceneItemAiPatrolByGameTime {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.DYh = !1),
      (this.a$o = 0);
  }
  static Create(t) {
    if (t) return new FbSceneItemAiPatrolByGameTime(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Spline() {
    return (
      this.DYh || ((this.DYh = !0), (this.a$o = this.FbDataInternal.spline())),
      this.a$o
    );
  }
}
exports.FbSceneItemAiPatrolByGameTime = FbSceneItemAiPatrolByGameTime;
//# sourceMappingURL=FbSceneItemAiPatrolByGameTime.js.map
