"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbButterflySpline = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbButterflySplinePoint_1 = require("./FbButterflySplinePoint");
class FbButterflySpline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.NEh = !1),
      (this.VEh = void 0);
  }
  static Create(t) {
    if (t) return new FbButterflySpline(t);
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
      var e = this.FbDataInternal.pointsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.points(
            t,
            new fb_component_1.ButterflySplinePoint(),
          );
          this.VEh.push(
            FbButterflySplinePoint_1.FbButterflySplinePoint.Create(i),
          );
        }
    }
    return this.VEh;
  }
}
exports.FbButterflySpline = FbButterflySpline;
//# sourceMappingURL=FbButterflySpline.js.map
