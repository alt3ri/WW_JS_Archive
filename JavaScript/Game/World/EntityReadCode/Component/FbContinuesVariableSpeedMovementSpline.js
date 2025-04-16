"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbContinuesVariableSpeedMovementSpline = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbContinuesVariableSpeedSplinePoint_1 = require("./FbContinuesVariableSpeedSplinePoint"),
  FbTimePathConfig_1 = require("./FbTimePathConfig");
class FbContinuesVariableSpeedMovementSpline {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.e9h = !1),
      (this.t9h = 0),
      (this.i9h = !1),
      (this.r9h = void 0),
      (this.C11 = !1),
      (this.p11 = void 0),
      (this.NEh = !1),
      (this.VEh = void 0);
  }
  static Create(i) {
    if (i) return new FbContinuesVariableSpeedMovementSpline(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TransitionSpeed() {
    return (
      this.e9h ||
        ((this.e9h = !0), (this.t9h = this.FbDataInternal.transitionSpeed())),
      this.t9h
    );
  }
  get EntireTimePathConfig() {
    return (
      this.i9h ||
        ((this.i9h = !0),
        (this.r9h = FbTimePathConfig_1.FbTimePathConfig.Create(
          this.FbDataInternal.entireTimePathConfig(),
        ))),
      this.r9h
    );
  }
  get CircleMode() {
    return (
      this.C11 ||
        ((this.C11 = !0), (this.p11 = this.FbDataInternal.circleMode())),
      this.p11
    );
  }
  get Points() {
    if (!this.NEh) {
      (this.NEh = !0), (this.VEh = new Array());
      var t = this.FbDataInternal.pointsLength();
      if (t)
        for (let i = 0; i < t; ++i) {
          var e = this.FbDataInternal.points(
            i,
            new fb_component_1.ContinuesVariableSpeedSplinePoint(),
          );
          this.VEh.push(
            FbContinuesVariableSpeedSplinePoint_1.FbContinuesVariableSpeedSplinePoint.Create(
              e,
            ),
          );
        }
    }
    return this.VEh;
  }
}
exports.FbContinuesVariableSpeedMovementSpline =
  FbContinuesVariableSpeedMovementSpline;
//# sourceMappingURL=FbContinuesVariableSpeedMovementSpline.js.map
