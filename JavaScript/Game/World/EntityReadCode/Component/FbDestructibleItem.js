"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDestructibleItem = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbAimPart_1 = require("./FbAimPart"),
  FbDurabilityStateConfig_1 = require("./FbDurabilityStateConfig"),
  FbDurabilityWorn_1 = require("./FbDurabilityWorn"),
  FbElementDamage_1 = require("./FbElementDamage"),
  FbHitTimeScaleRatio_1 = require("./FbHitTimeScaleRatio"),
  FbSkillDamage_1 = require("./FbSkillDamage"),
  FbWeaponDamage_1 = require("./FbWeaponDamage"),
  UnionHitBulletTypeHelper_1 = require("./UnionHitBulletTypeHelper"),
  UnionMatchRoleOptionHelper_1 = require("../Match/UnionMatchRoleOptionHelper"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbDestructibleItem {
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
      (this.J2h = !1),
      (this.Z2h = 0),
      (this.e3h = !1),
      (this.t3h = 0),
      (this.i3h = !1),
      (this.r3h = void 0),
      (this.o3h = !1),
      (this.n3h = void 0),
      (this.s3h = !1),
      (this.a3h = void 0),
      (this.h3h = !1),
      (this.l3h = void 0),
      (this._3h = !1),
      (this.c3h = void 0),
      (this.u3h = !1),
      (this.d3h = void 0),
      (this.m3h = !1),
      (this.C3h = void 0),
      (this.qDh = !1),
      (this.PAe = void 0);
  }
  static Create(t) {
    if (t) return new FbDestructibleItem(t);
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
  get DurabilityId() {
    return (
      this.J2h ||
        ((this.J2h = !0), (this.Z2h = this.FbDataInternal.durabilityId())),
      this.Z2h
    );
  }
  get Durability() {
    return (
      this.e3h ||
        ((this.e3h = !0), (this.t3h = this.FbDataInternal.durability())),
      this.t3h
    );
  }
  get DurabilityWorn() {
    return (
      this.i3h ||
        ((this.i3h = !0),
        (this.r3h = FbDurabilityWorn_1.FbDurabilityWorn.Create(
          this.FbDataInternal.durabilityWorn(),
        ))),
      this.r3h
    );
  }
  get DurabilityStateConfig() {
    return (
      this.o3h ||
        ((this.o3h = !0),
        (this.n3h = FbDurabilityStateConfig_1.FbDurabilityStateConfig.Create(
          this.FbDataInternal.durabilityStateConfig(),
        ))),
      this.n3h
    );
  }
  get HitPoint() {
    return (
      this.s3h ||
        ((this.s3h = !0),
        (this.a3h = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.hitPoint(),
        ))),
      this.a3h
    );
  }
  get DestructionActions() {
    if (!this.h3h) {
      (this.h3h = !0), (this.l3h = new Array());
      var i = this.FbDataInternal.destructionActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.destructionActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.l3h.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
    }
    return this.l3h;
  }
  get SkillDamage() {
    return (
      this._3h ||
        ((this._3h = !0),
        (this.c3h = FbSkillDamage_1.FbSkillDamage.Create(
          this.FbDataInternal.skillDamage(),
        ))),
      this.c3h
    );
  }
  get ElementDamage() {
    return (
      this.u3h ||
        ((this.u3h = !0),
        (this.d3h = FbElementDamage_1.FbElementDamage.Create(
          this.FbDataInternal.elementDamage(),
        ))),
      this.d3h
    );
  }
  get WeaponDamage() {
    return (
      this.m3h ||
        ((this.m3h = !0),
        (this.C3h = FbWeaponDamage_1.FbWeaponDamage.Create(
          this.FbDataInternal.weaponDamage(),
        ))),
      this.C3h
    );
  }
  get MatchRoleOption() {
    if (!this.qDh) {
      (this.qDh = !0), (this.PAe = new Array());
      var i = this.FbDataInternal.matchRoleOptionLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.matchRoleOptionType(t),
            s =
              UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.GetUnionMatchRoleOptionObject(
                e,
              );
          s &&
            void 0 !==
              (e =
                UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.ReadUnionMatchRoleOption(
                  e,
                  this.FbDataInternal.matchRoleOption(t, s),
                )) &&
            this.PAe.push(e);
        }
    }
    return this.PAe;
  }
}
exports.FbDestructibleItem = FbDestructibleItem;
//# sourceMappingURL=FbDestructibleItem.js.map
