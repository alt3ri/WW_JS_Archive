"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCircumnutation = void 0);
const FbRenderTrajectoryConfig_1 = require("./FbRenderTrajectoryConfig");
class FbCircumnutation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.x2h = !1),
      (this.R2h = 0),
      (this.w2h = !1),
      (this.P2h = void 0),
      (this.tdh = !1),
      (this.idh = void 0),
      (this.U2h = !1),
      (this.D2h = 0),
      (this.B2h = !1),
      (this.q2h = 0),
      (this.k2h = !1),
      (this.G2h = void 0),
      (this.O2h = !1),
      (this.F2h = void 0);
  }
  static Create(t) {
    if (t) return new FbCircumnutation(t);
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
  get Direction() {
    return (
      this.tdh ||
        ((this.tdh = !0), (this.idh = this.FbDataInternal.direction())),
      this.idh
    );
  }
  get AngularVelocity() {
    return (
      this.U2h ||
        ((this.U2h = !0), (this.D2h = this.FbDataInternal.angularVelocity())),
      this.D2h
    );
  }
  get RotationSpeed() {
    return (
      this.B2h ||
        ((this.B2h = !0), (this.q2h = this.FbDataInternal.rotationSpeed())),
      this.q2h
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
  get RenderTrajectoryConfig() {
    return (
      this.O2h ||
        ((this.O2h = !0),
        (this.F2h = FbRenderTrajectoryConfig_1.FbRenderTrajectoryConfig.Create(
          this.FbDataInternal.renderTrajectoryConfig(),
        ))),
      this.F2h
    );
  }
}
exports.FbCircumnutation = FbCircumnutation;
//# sourceMappingURL=FbCircumnutation.js.map
