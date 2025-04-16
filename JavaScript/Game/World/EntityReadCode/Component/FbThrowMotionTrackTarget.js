"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbThrowMotionTrackTarget = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbThrowMotionTrackTarget {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.x2h = !1),
      (this.R2h = 0),
      (this.w2h = !1),
      (this.P2h = void 0),
      (this.Y2h = !1),
      (this.z2h = void 0),
      (this.U2h = !1),
      (this.D2h = 0),
      (this.k2h = !1),
      (this.G2h = void 0);
  }
  static Create(t) {
    if (t) return new FbThrowMotionTrackTarget(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Velocity() {
    return (
      this.x2h ||
        ((this.x2h = !0), (this.R2h = this.FbDataInternal.velocity())),
      this.R2h
    );
  }
  get VelocityCurve() {
    return (
      this.w2h ||
        ((this.w2h = !0), (this.P2h = this.FbDataInternal.velocityCurve())),
      this.P2h
    );
  }
  get VelocityOffset() {
    return (
      this.Y2h ||
        ((this.Y2h = !0),
        (this.z2h = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.velocityOffset(),
        ))),
      this.z2h
    );
  }
  get AngularVelocity() {
    return (
      this.U2h ||
        ((this.U2h = !0), (this.D2h = this.FbDataInternal.angularVelocity())),
      this.D2h
    );
  }
  get AngularVelocityCurve() {
    return (
      this.k2h ||
        ((this.k2h = !0),
        (this.G2h = this.FbDataInternal.angularVelocityCurve())),
      this.G2h
    );
  }
}
exports.FbThrowMotionTrackTarget = FbThrowMotionTrackTarget;
//# sourceMappingURL=FbThrowMotionTrackTarget.js.map
