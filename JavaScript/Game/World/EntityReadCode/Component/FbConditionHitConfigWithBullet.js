"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbConditionHitConfigWithBullet = void 0);
const UnionHitBulletTypeHelper_1 = require("./UnionHitBulletTypeHelper"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbConditionHitConfigWithBullet {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ich = !1),
      (this.rch = void 0),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this.ZQ_ = !1),
      (this.eK_ = void 0);
  }
  static Create(t) {
    if (t) return new FbConditionHitConfigWithBullet(t);
  }
  get Conditions() {
    return (
      this.ich ||
        ((this.ich = !0),
        (this.rch = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.conditions(),
        ))),
      this.rch
    );
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get HitBullets() {
    var t, i;
    return (
      !this.ZQ_ &&
        ((this.ZQ_ = !0),
        (t = this.FbDataInternal.hitBulletsType()),
        (i =
          UnionHitBulletTypeHelper_1.UnionHitBulletTypeHelper.GetUnionHitBulletTypeObject(
            t,
          ))) &&
        (this.eK_ =
          UnionHitBulletTypeHelper_1.UnionHitBulletTypeHelper.ReadUnionHitBulletType(
            t,
            this.FbDataInternal.hitBullets(i),
          )),
      this.eK_
    );
  }
}
exports.FbConditionHitConfigWithBullet = FbConditionHitConfigWithBullet;
//# sourceMappingURL=FbConditionHitConfigWithBullet.js.map
