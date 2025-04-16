"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAirPassageSpline = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCommonSplinePoint_1 = require("./FbCommonSplinePoint");
class FbAirPassageSpline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.IHh = !1),
      (this.THh = void 0),
      (this.bHh = !1),
      (this.LHh = void 0),
      (this.AHh = !1),
      (this.xHh = void 0),
      (this.RHh = !1),
      (this.wHh = void 0),
      (this.PHh = !1),
      (this.UHh = 0),
      (this.DHh = !1),
      (this.BHh = 0),
      (this.qHh = !1),
      (this.kHh = 0),
      (this.GHh = !1),
      (this.OHh = 0),
      (this.FHh = !1),
      (this.NHh = 0),
      (this.DHl = !1),
      (this.BHl = 0),
      (this.NEh = !1),
      (this.VEh = void 0);
  }
  static Create(t) {
    if (t) return new FbAirPassageSpline(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MiddleLineEffect() {
    return (
      this.IHh ||
        ((this.IHh = !0), (this.THh = this.FbDataInternal.middleLineEffect())),
      this.THh
    );
  }
  get TailCircleEffect() {
    return (
      this.bHh ||
        ((this.bHh = !0), (this.LHh = this.FbDataInternal.tailCircleEffect())),
      this.LHh
    );
  }
  get MiddleCircleEffect() {
    return (
      this.AHh ||
        ((this.AHh = !0),
        (this.xHh = this.FbDataInternal.middleCircleEffect())),
      this.xHh
    );
  }
  get MiddleCircleOverlyingEffect() {
    return (
      this.RHh ||
        ((this.RHh = !0),
        (this.wHh = this.FbDataInternal.middleCircleOverlyingEffect())),
      this.wHh
    );
  }
  get MiddleCircleSpace() {
    return (
      this.PHh ||
        ((this.PHh = !0), (this.UHh = this.FbDataInternal.middleCircleSpace())),
      this.UHh
    );
  }
  get MiddleCircleRadius() {
    return (
      this.DHh ||
        ((this.DHh = !0),
        (this.BHh = this.FbDataInternal.middleCircleRadius())),
      this.BHh
    );
  }
  get MovableRadius() {
    return (
      this.qHh ||
        ((this.qHh = !0), (this.kHh = this.FbDataInternal.movableRadius())),
      this.kHh
    );
  }
  get Resistance() {
    return (
      this.GHh ||
        ((this.GHh = !0), (this.OHh = this.FbDataInternal.resistance())),
      this.OHh
    );
  }
  get SpeedLimit() {
    return (
      this.FHh ||
        ((this.FHh = !0), (this.NHh = this.FbDataInternal.speedLimit())),
      this.NHh
    );
  }
  get SprintSpeedLimit() {
    return (
      this.DHl ||
        ((this.DHl = !0), (this.BHl = this.FbDataInternal.sprintSpeedLimit())),
      this.BHl
    );
  }
  get Points() {
    if (!this.NEh) {
      (this.NEh = !0), (this.VEh = new Array());
      var i = this.FbDataInternal.pointsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.points(
            t,
            new fb_component_1.CommonSplinePoint(),
          );
          this.VEh.push(FbCommonSplinePoint_1.FbCommonSplinePoint.Create(s));
        }
    }
    return this.VEh;
  }
}
exports.FbAirPassageSpline = FbAirPassageSpline;
//# sourceMappingURL=FbAirPassageSpline.js.map
