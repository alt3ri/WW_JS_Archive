"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBulletCfg = void 0);
const UnionBulletCreateConditionHelper_1 = require("./UnionBulletCreateConditionHelper");
class FbBulletCfg {
  constructor(t) {
    (this.FbDataInternal = t), (this.g2h = !1), (this.f2h = void 0);
  }
  static Create(t) {
    if (t) return new FbBulletCfg(t);
  }
  get CreateConditions() {
    if (!this.g2h) {
      (this.g2h = !0), (this.f2h = new Array());
      var e = this.FbDataInternal.createConditionsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.createConditionsType(t),
            r =
              UnionBulletCreateConditionHelper_1.UnionBulletCreateConditionHelper.GetUnionBulletCreateConditionObject(
                i,
              );
          r &&
            void 0 !==
              (i =
                UnionBulletCreateConditionHelper_1.UnionBulletCreateConditionHelper.ReadUnionBulletCreateCondition(
                  i,
                  this.FbDataInternal.createConditions(t, r),
                )) &&
            this.f2h.push(i);
        }
    }
    return this.f2h;
  }
}
exports.FbBulletCfg = FbBulletCfg;
//# sourceMappingURL=FbBulletCfg.js.map
