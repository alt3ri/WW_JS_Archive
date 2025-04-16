"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbParkourSpline = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbParkourSplinePoint_1 = require("./FbParkourSplinePoint");
class FbParkourSpline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.y9h = !1),
      (this.S9h = !1),
      (this.M9h = !1),
      (this.E9h = 0),
      (this.I9h = !1),
      (this.T9h = void 0),
      (this.b9h = !1),
      (this.L9h = void 0),
      (this.A9h = !1),
      (this.x9h = void 0),
      (this.R9h = !1),
      (this.w9h = void 0),
      (this.NEh = !1),
      (this.VEh = void 0);
  }
  static Create(t) {
    if (t) return new FbParkourSpline(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get IsRequireToEnd() {
    return (
      this.y9h ||
        ((this.y9h = !0), (this.S9h = this.FbDataInternal.isRequireToEnd())),
      this.S9h
    );
  }
  get CheckPointsRequire() {
    return (
      this.M9h ||
        ((this.M9h = !0),
        (this.E9h = this.FbDataInternal.checkPointsRequire())),
      this.E9h
    );
  }
  get CheckPointResource() {
    return (
      this.I9h ||
        ((this.I9h = !0),
        (this.T9h = this.FbDataInternal.checkPointResource())),
      this.T9h
    );
  }
  get CheckPointsDestroyRes() {
    return (
      this.b9h ||
        ((this.b9h = !0),
        (this.L9h = this.FbDataInternal.checkPointsDestroyRes())),
      this.L9h
    );
  }
  get StartResource() {
    return (
      this.A9h ||
        ((this.A9h = !0), (this.x9h = this.FbDataInternal.startResource())),
      this.x9h
    );
  }
  get EndResource() {
    return (
      this.R9h ||
        ((this.R9h = !0), (this.w9h = this.FbDataInternal.endResource())),
      this.w9h
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
            new fb_component_1.ParkourSplinePoint(),
          );
          this.VEh.push(FbParkourSplinePoint_1.FbParkourSplinePoint.Create(s));
        }
    }
    return this.VEh;
  }
}
exports.FbParkourSpline = FbParkourSpline;
//# sourceMappingURL=FbParkourSpline.js.map
