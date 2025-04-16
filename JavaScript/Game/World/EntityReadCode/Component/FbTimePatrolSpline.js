"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTimePatrolSpline = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbTimePatrolSplinePoint_1 = require("./FbTimePatrolSplinePoint");
class FbTimePatrolSpline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.NEh = !1),
      (this.VEh = void 0);
  }
  static Create(t) {
    if (t) return new FbTimePatrolSpline(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Points() {
    if (!this.NEh) {
      (this.NEh = !0), (this.VEh = new Array());
      var i = this.FbDataInternal.pointsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.points(
            t,
            new fb_component_1.TimePatrolSplinePoint(),
          );
          this.VEh.push(
            FbTimePatrolSplinePoint_1.FbTimePatrolSplinePoint.Create(e),
          );
        }
    }
    return this.VEh;
  }
}
exports.FbTimePatrolSpline = FbTimePatrolSpline;
//# sourceMappingURL=FbTimePatrolSpline.js.map
