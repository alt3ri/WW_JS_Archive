"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbThrowMotionLevitate = void 0);
const FbRenderTrajectoryConfig_1 = require("./FbRenderTrajectoryConfig");
class FbThrowMotionLevitate {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.x2h = !1),
      (this.R2h = 0),
      (this.w2h = !1),
      (this.P2h = void 0),
      (this.Q2h = !1),
      (this.K2h = 0),
      (this.$2h = !1),
      (this.X2h = 0),
      (this.O2h = !1),
      (this.F2h = void 0);
  }
  static Create(t) {
    if (t) return new FbThrowMotionLevitate(t);
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
  get MoveTime() {
    return (
      this.Q2h ||
        ((this.Q2h = !0), (this.K2h = this.FbDataInternal.moveTime())),
      this.K2h
    );
  }
  get RayRadius() {
    return (
      this.$2h ||
        ((this.$2h = !0), (this.X2h = this.FbDataInternal.rayRadius())),
      this.X2h
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
exports.FbThrowMotionLevitate = FbThrowMotionLevitate;
//# sourceMappingURL=FbThrowMotionLevitate.js.map
