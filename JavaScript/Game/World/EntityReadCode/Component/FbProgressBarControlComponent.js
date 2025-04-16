"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbProgressBarControlComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbAimPart_1 = require("./FbAimPart"),
  FbHitTimeScaleRatio_1 = require("./FbHitTimeScaleRatio"),
  UnionHitBulletTypeHelper_1 = require("./UnionHitBulletTypeHelper"),
  UnionProgressBarControlHelper_1 = require("./UnionProgressBarControlHelper");
class FbProgressBarControlComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.jGh = !1),
      (this.HGh = void 0),
      (this.WGh = !1),
      (this.QGh = void 0),
      (this.KGh = !1),
      (this.$Gh = void 0),
      (this.XGh = !1),
      (this.YGh = void 0),
      (this.rWh = !1),
      (this.oWh = void 0);
  }
  static Create(t) {
    if (t) return new FbProgressBarControlComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get HitBullet() {
    var t, i;
    return (
      !this.jGh &&
        ((this.jGh = !0),
        (t = this.FbDataInternal.hitBulletType()),
        (i =
          UnionHitBulletTypeHelper_1.UnionHitBulletTypeHelper.GetUnionHitBulletTypeObject(
            t,
          ))) &&
        (this.HGh =
          UnionHitBulletTypeHelper_1.UnionHitBulletTypeHelper.ReadUnionHitBulletType(
            t,
            this.FbDataInternal.hitBullet(i),
          )),
      this.HGh
    );
  }
  get AttackerHitTimeScaleRatio() {
    return (
      this.WGh ||
        ((this.WGh = !0),
        (this.QGh = FbHitTimeScaleRatio_1.FbHitTimeScaleRatio.Create(
          this.FbDataInternal.attackerHitTimeScaleRatio(),
        ))),
      this.QGh
    );
  }
  get VictimHitTimeScaleRatio() {
    return (
      this.KGh ||
        ((this.KGh = !0),
        (this.$Gh = FbHitTimeScaleRatio_1.FbHitTimeScaleRatio.Create(
          this.FbDataInternal.victimHitTimeScaleRatio(),
        ))),
      this.$Gh
    );
  }
  get AimParts() {
    if (!this.XGh) {
      (this.XGh = !0), (this.YGh = new Array());
      var i = this.FbDataInternal.aimPartsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.aimParts(t, new fb_component_1.AimPart());
          this.YGh.push(FbAimPart_1.FbAimPart.Create(e));
        }
    }
    return this.YGh;
  }
  get Control() {
    var t, i;
    return (
      !this.rWh &&
        ((this.rWh = !0),
        (t = this.FbDataInternal.controlType()),
        (i =
          UnionProgressBarControlHelper_1.UnionProgressBarControlHelper.GetUnionProgressBarControlObject(
            t,
          ))) &&
        (this.oWh =
          UnionProgressBarControlHelper_1.UnionProgressBarControlHelper.ReadUnionProgressBarControl(
            t,
            this.FbDataInternal.control(i),
          )),
      this.oWh
    );
  }
}
exports.FbProgressBarControlComponent = FbProgressBarControlComponent;
//# sourceMappingURL=FbProgressBarControlComponent.js.map
