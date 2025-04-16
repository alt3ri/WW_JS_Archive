"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCommonSpline = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCommonSplinePoint_1 = require("./FbCommonSplinePoint");
class FbCommonSpline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.NEh = !1),
      (this.VEh = void 0);
  }
  static Create(t) {
    if (t) return new FbCommonSpline(t);
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
            new fb_component_1.CommonSplinePoint(),
          );
          this.VEh.push(FbCommonSplinePoint_1.FbCommonSplinePoint.Create(e));
        }
    }
    return this.VEh;
  }
}
exports.FbCommonSpline = FbCommonSpline;
//# sourceMappingURL=FbCommonSpline.js.map
