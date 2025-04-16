"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbProjectileMotion = void 0);
const FbSpeedCurveMotion_1 = require("./FbSpeedCurveMotion");
class FbProjectileMotion {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.x2h = !1),
      (this.R2h = 0),
      (this.U2h = !1),
      (this.D2h = 0),
      (this.N2h = !1),
      (this.V2h = void 0),
      (this.j2h = !1),
      (this.H2h = void 0);
  }
  static Create(t) {
    if (t) return new FbProjectileMotion(t);
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
  get AngularVelocity() {
    return (
      this.U2h ||
        ((this.U2h = !0), (this.D2h = this.FbDataInternal.angularVelocity())),
      this.D2h
    );
  }
  get CameraShake() {
    return (
      this.N2h ||
        ((this.N2h = !0), (this.V2h = this.FbDataInternal.cameraShake())),
      this.V2h
    );
  }
  get MatchSpeedCurve() {
    return (
      this.j2h ||
        ((this.j2h = !0),
        (this.H2h = FbSpeedCurveMotion_1.FbSpeedCurveMotion.Create(
          this.FbDataInternal.matchSpeedCurve(),
        ))),
      this.H2h
    );
  }
}
exports.FbProjectileMotion = FbProjectileMotion;
//# sourceMappingURL=FbProjectileMotion.js.map
