"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicShieldController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CampUtils_1 = require("../../Character/Common/Blueprint/Utils/CampUtils"),
  BulletActionInitHit_1 = require("../Action/BulletActionInitHit"),
  BulletHitCountUtil_1 = require("../BulletStaticMethod/BulletHitCountUtil"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletLogicController_1 = require("./BulletLogicController"),
  campTypeBitMask = [
    0,
    BulletActionInitHit_1.SELF_NUMBER,
    BulletActionInitHit_1.ENEMY_NUMBER,
    BulletActionInitHit_1.FRIEND_NUMBER,
    BulletActionInitHit_1.TEAM_NUMBER,
    BulletActionInitHit_1.SELF_NUMBER | BulletActionInitHit_1.ENEMY_NUMBER,
  ];
class BulletLogicShieldController extends BulletLogicController_1.BulletLogicController {
  constructor(t, i) {
    super(t, i),
      (this.a7o = void 0),
      (this.xSc = void 0),
      (this.USc = void 0),
      (this.DSc = void 0),
      (this.BSc = void 0),
      (this.GT1 = void 0),
      (this.FT1 = void 0),
      (this.NT1 = void 0);
    var e = t.NotDefenseBulletIdList;
    if (e && 0 < e.Num()) {
      this.xSc = new Array();
      for (let t = 0; t < e.Num(); ++t) this.xSc.push(e.Get(t));
    }
    var l = t.DefenseBulletIdList;
    if (l && 0 < l.Num()) {
      this.USc = new Array();
      for (let t = 0; t < l.Num(); ++t) this.USc.push(l.Get(t));
    }
    var r = t.AddBuffToEnemy;
    if (r && 0 < r.Num()) {
      this.DSc = new Array();
      for (let t = 0; t < r.Num(); ++t) this.DSc.push(r.Get(t));
    }
    var s = t.AddBuffToSelf;
    if (s && 0 < s.Num()) {
      this.BSc = new Array();
      for (let t = 0; t < s.Num(); ++t) this.BSc.push(s.Get(t));
    }
    var o = t.SelfCalcTypeArray,
      h = o?.Num() ?? 0;
    if (0 < h) {
      this.GT1 = new Array();
      for (let t = 0; t < h; ++t) this.GT1.push(o.Get(t));
    }
    var n = t.FriendCalcTypeArray,
      u = n?.Num() ?? 0;
    if (0 < u) {
      this.FT1 = new Array();
      for (let t = 0; t < u; ++t) this.FT1.push(n.Get(t));
    }
    var a = t.EnemyCalcTypeArray,
      f = a?.Num() ?? 0;
    if (0 < f) {
      this.NT1 = new Array();
      for (let t = 0; t < f; ++t) this.NT1.push(a.Get(t));
    }
  }
  OnInit() {
    (this.a7o = this.Bullet.GetBulletInfo()), (this.a7o.IsShield = !0);
  }
  BulletLogicAction(i) {
    if (this.CheckCanDefense(i)) {
      if (this.DSc) {
        var t = i.Attacker?.GetComponent(172),
          e = this.a7o.Attacker?.GetComponent(172);
        if (t && e)
          for (const o of this.DSc)
            t.AddBuff(Number(o), {
              InstigatorId: e.CreatureDataId,
              Level: this.a7o.SkillLevel,
              Reason: "ShieldDefense-AddBuffToEnemy",
              PreMessageId: this.a7o.ContextId,
            });
      }
      if (this.BSc) {
        var l = this.a7o.Attacker?.GetComponent(172);
        if (l)
          for (const h of this.BSc)
            l.AddBuff(Number(h), {
              InstigatorId: l.CreatureDataId,
              Level: this.a7o.SkillLevel,
              Reason: "ShieldDefense-AddBuffToSelf",
              PreMessageId: this.a7o.ContextId,
            });
      }
      var r = this.LogicController.DecreaseBulletHitCount;
      if (0 < r) {
        var s = this.a7o.Attacker;
        for (let t = 0; t < r; t++)
          BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(i, s);
      }
      BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(this.a7o, i.Attacker);
    }
  }
  CheckCanDefense(t) {
    if (
      this.LogicController.DefenseCanDodgeBullet &&
      !t.BulletDataMain?.Logic.CanDodge
    )
      return !1;
    var i = t.BulletRowName;
    if (this.USc && !this.USc.includes(i)) return !1;
    if (this.xSc && this.xSc.includes(i)) return !1;
    (i = t.CollisionInfo.DamageId),
      (i = i
        ? ModelManager_1.ModelManager.DamageModel.GetDamageConfigById(i)
        : void 0);
    let e = -1;
    if ((i && (e = i.CalculateType), t.AttackerId === this.a7o.AttackerId)) {
      if (
        !this.kSc(this.LogicController.SelfCampType, t.BulletCamp) ||
        !this.VT1(this.GT1, e)
      )
        return !1;
    } else {
      var i = this.a7o.AttackerCamp,
        l = t.AttackerCamp,
        i = CampUtils_1.CampUtils.GetCampRelationship(i, l);
      if (1 === i) {
        if (
          !this.kSc(this.LogicController.FriendCampType, t.BulletCamp) ||
          !this.VT1(this.FT1, e)
        )
          return !1;
      } else {
        if (2 !== i) return !1;
        if (
          !this.kSc(this.LogicController.EnemyCampType, t.BulletCamp) ||
          !this.VT1(this.NT1, e)
        )
          return !1;
      }
    }
    if (0 < this.LogicController.DefenseAngle) {
      (l = this.a7o.GetActorLocation()),
        (i = t.GetActorLocation()),
        (t = BulletPool_1.BulletPool.CreateVector());
      if ((i.Subtraction(l, t), (t.Z = 0), t.IsZero()))
        BulletPool_1.BulletPool.RecycleVector(t);
      else {
        t.Normalize();
        (i = BulletPool_1.BulletPool.CreateVector()),
          (l = (this.a7o.GetActorForward(i), i.DotProduct(t))),
          (t =
            (BulletPool_1.BulletPool.RecycleVector(t),
            BulletPool_1.BulletPool.RecycleVector(i),
            Math.cos(
              this.LogicController.DefenseAngle *
                MathUtils_1.MathUtils.DegToRad,
            )));
        if (l < t)
          return (
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Bullet",
                20,
                "攻击角度超出盾牌防御范围",
                ["Bullet", this.a7o?.BulletRowName],
                ["cosTwoBullet", l],
                ["ConfCos", t],
              ),
            !1
          );
      }
    }
    return !0;
  }
  kSc(t, i) {
    return 6 === t || (0 !== t && 0 != (i & campTypeBitMask[t]));
  }
  VT1(i, e) {
    if (!i) return !0;
    var l = i.length;
    for (let t = 0; t < l; t++) {
      var r = i[t];
      if (MathUtils_1.MathUtils.IsNearlyEqual(e, r)) return !0;
    }
    return !1;
  }
}
exports.BulletLogicShieldController = BulletLogicShieldController;
//# sourceMappingURL=BulletLogicShieldController.js.map
