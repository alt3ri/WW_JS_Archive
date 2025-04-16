"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTargetGearComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbAimPart_1 = require("./FbAimPart"),
  FbHitTimeScaleRatio_1 = require("./FbHitTimeScaleRatio"),
  FbSplineMove_1 = require("./FbSplineMove"),
  UnionHitBulletTypeHelper_1 = require("./UnionHitBulletTypeHelper"),
  UnionHitLogicTypeHelper_1 = require("./UnionHitLogicTypeHelper");
class FbTargetGearComponent {
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
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.zGh = !1),
      (this.JGh = !1),
      (this.ZGh = !1),
      (this.eOh = 0),
      (this.VUh = !1),
      (this.jUh = void 0),
      (this.tOh = !1),
      (this.iOh = void 0),
      (this.qRh = !1),
      (this.kRh = void 0),
      (this.FLh = !1),
      (this.NLh = 0);
  }
  static Create(t) {
    if (t) return new FbTargetGearComponent(t);
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
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get IsCycle() {
    return (
      this.zGh || ((this.zGh = !0), (this.JGh = this.FbDataInternal.isCycle())),
      this.JGh
    );
  }
  get CycleInterval() {
    return (
      this.ZGh ||
        ((this.ZGh = !0), (this.eOh = this.FbDataInternal.cycleInterval())),
      this.eOh
    );
  }
  get CycleStates() {
    if (!this.VUh) {
      (this.VUh = !0), (this.jUh = new Array());
      var i = this.FbDataInternal.cycleStatesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.jUh.push(this.FbDataInternal.cycleStates(t));
    }
    return this.jUh;
  }
  get HitLogicType() {
    var t, i;
    return (
      !this.tOh &&
        ((this.tOh = !0),
        (t = this.FbDataInternal.hitLogicTypeType()),
        (i =
          UnionHitLogicTypeHelper_1.UnionHitLogicTypeHelper.GetUnionHitLogicTypeObject(
            t,
          ))) &&
        (this.iOh =
          UnionHitLogicTypeHelper_1.UnionHitLogicTypeHelper.ReadUnionHitLogicType(
            t,
            this.FbDataInternal.hitLogicType(i),
          )),
      this.iOh
    );
  }
  get Patrol() {
    return (
      this.qRh ||
        ((this.qRh = !0),
        (this.kRh = FbSplineMove_1.FbSplineMove.Create(
          this.FbDataInternal.patrol(),
        ))),
      this.kRh
    );
  }
  get HitCd() {
    return (
      this.FLh || ((this.FLh = !0), (this.NLh = this.FbDataInternal.hitCd())),
      this.NLh
    );
  }
}
exports.FbTargetGearComponent = FbTargetGearComponent;
//# sourceMappingURL=FbTargetGearComponent.js.map
