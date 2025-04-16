"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbStopNewMoveWithSplineAtTargetPoint = void 0);
class FbStopNewMoveWithSplineAtTargetPoint {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.e11 = !1),
      (this.t11 = 0);
  }
  static Create(t) {
    if (t) return new FbStopNewMoveWithSplineAtTargetPoint(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PointId() {
    return (
      this.e11 || ((this.e11 = !0), (this.t11 = this.FbDataInternal.pointId())),
      this.t11
    );
  }
}
exports.FbStopNewMoveWithSplineAtTargetPoint =
  FbStopNewMoveWithSplineAtTargetPoint;
//# sourceMappingURL=FbStopNewMoveWithSplineAtTargetPoint.js.map
