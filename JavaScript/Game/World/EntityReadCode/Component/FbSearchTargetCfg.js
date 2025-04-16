"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSearchTargetCfg = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEntityAngleWeight_1 = require("./FbEntityAngleWeight"),
  FbEntityCategoryWeight_1 = require("./FbEntityCategoryWeight");
class FbSearchTargetCfg {
  constructor(t) {
    (this.FbDataInternal = t),
      (this._2h = !1),
      (this.c2h = void 0),
      (this.u2h = !1),
      (this.d2h = void 0),
      (this.Kn_ = !1),
      (this.$n_ = !1);
  }
  static Create(t) {
    if (t) return new FbSearchTargetCfg(t);
  }
  get AngleWeight() {
    if (!this._2h) {
      (this._2h = !0), (this.c2h = new Array());
      var e = this.FbDataInternal.angleWeightLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.angleWeight(
            t,
            new fb_component_1.EntityAngleWeight(),
          );
          this.c2h.push(FbEntityAngleWeight_1.FbEntityAngleWeight.Create(i));
        }
    }
    return this.c2h;
  }
  get LockConditions() {
    if (!this.u2h) {
      (this.u2h = !0), (this.d2h = new Array());
      var e = this.FbDataInternal.lockConditionsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.lockConditions(
            t,
            new fb_component_1.EntityCategoryWeight(),
          );
          this.d2h.push(
            FbEntityCategoryWeight_1.FbEntityCategoryWeight.Create(i),
          );
        }
    }
    return this.d2h;
  }
  get IgnoreDistanceWeight() {
    return (
      this.Kn_ ||
        ((this.Kn_ = !0),
        (this.$n_ = this.FbDataInternal.ignoreDistanceWeight())),
      this.$n_
    );
  }
}
exports.FbSearchTargetCfg = FbSearchTargetCfg;
//# sourceMappingURL=FbSearchTargetCfg.js.map
