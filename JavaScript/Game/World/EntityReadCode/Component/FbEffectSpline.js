"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEffectSpline = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCommonSplinePoint_1 = require("./FbCommonSplinePoint"),
  UnionEffectSplineCreateOptionHelper_1 = require("./UnionEffectSplineCreateOptionHelper");
class FbEffectSpline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.sUh = !1),
      (this.aUh = void 0),
      (this.h9h = !1),
      (this.l9h = void 0),
      (this.NEh = !1),
      (this.VEh = void 0);
  }
  static Create(t) {
    if (t) return new FbEffectSpline(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Effect() {
    return (
      this.sUh || ((this.sUh = !0), (this.aUh = this.FbDataInternal.effect())),
      this.aUh
    );
  }
  get CreateOption() {
    var t, e;
    return (
      !this.h9h &&
        ((this.h9h = !0),
        (t = this.FbDataInternal.createOptionType()),
        (e =
          UnionEffectSplineCreateOptionHelper_1.UnionEffectSplineCreateOptionHelper.GetUnionEffectSplineCreateOptionObject(
            t,
          ))) &&
        (this.l9h =
          UnionEffectSplineCreateOptionHelper_1.UnionEffectSplineCreateOptionHelper.ReadUnionEffectSplineCreateOption(
            t,
            this.FbDataInternal.createOption(e),
          )),
      this.l9h
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
            new fb_component_1.CommonSplinePoint(),
          );
          this.VEh.push(FbCommonSplinePoint_1.FbCommonSplinePoint.Create(i));
        }
    }
    return this.VEh;
  }
}
exports.FbEffectSpline = FbEffectSpline;
//# sourceMappingURL=FbEffectSpline.js.map
