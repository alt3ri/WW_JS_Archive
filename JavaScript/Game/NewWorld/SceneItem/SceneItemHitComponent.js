"use strict";
let SceneItemHitComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    let r;
    const o = arguments.length;
    let s =
      o < 3 ? e : n === null ? (n = Object.getOwnPropertyDescriptor(e, i)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(t, e, i, n);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (r = t[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(e, i, s) : r(e, i)) || s);
    return o > 3 && s && Object.defineProperty(e, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemHitComponent = void 0);
const UE = require("ue");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const BulletCollisionUtil_1 = require("../Bullet/BulletStaticMethod/BulletCollisionUtil");
const BulletUtil_1 = require("../Bullet/BulletUtil");
const SceneItemHitUtils_1 = require("./Util/SceneItemHitUtils");
class ComponentHitReg {
  constructor() {
    (this.ComponentHitConditionCheck = []),
      (this.ComponentHitBaseConfig = void 0);
  }
}
let SceneItemHitComponent =
  (SceneItemHitComponent_1 = class SceneItemHitComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Snn = void 0),
        (this.Hte = void 0),
        (this.Wfn = void 0),
        (this.Kfn = new Array()),
        (this.Qfn = new Map()),
        (this.Xfn = void 0),
        (this.$fn = void 0),
        (this.Yfn = void 0),
        (this.Jfn = Rotator_1.Rotator.Create()),
        (this.efn = 0);
    }
    OnStart() {
      return (
        (this.Snn = this.Entity.GetComponent(177)),
        (this.Wfn = this.Entity.GetComponent(115)),
        (this.Hte = this.Entity.GetComponent(182)),
        (this.efn = this.Entity.GetComponent(0).GetEntityOnlineInteractType()),
        !0
      );
    }
    zfn(t) {
      if (this.Snn.HasTag(-1431780499)) return !1;
      if (this.Wfn?.IsLocked) return !1;
      if (this.Entity.GetComponent(0)?.IsConcealed) return !1;
      let e = !0;
      if (this.Kfn.length > 0)
        for (const i of this.Kfn) if (!(e &&= i(t))) break;
      return e;
    }
    Zfn(t, e) {
      t = this.Qfn.get(t)?.ComponentHitConditionCheck;
      if (void 0 === t) return !0;
      let i = !0;
      if (t.length > 0) for (const n of t) if (!(i &&= n(e))) break;
      return i;
    }
    epn(t, e) {
      t = this.Qfn.get(t)?.ComponentHitBaseConfig?.HitBullet;
      return (
        !t ||
        SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchBulletType(
          t,
          e,
          this.Entity,
        )
      );
    }
    OnSceneItemHit(t, e) {
      if (
        (EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
          t,
        ),
        !LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
          this.efn,
          !1,
        ))
      )
        return !1;
      const i = EntitySystem_1.EntitySystem.Get(
        t.BulletEntityId,
      )?.GetBulletInfo();
      if (i) {
        if (this.Entity.GetComponent(146)?.ReboundBullet(t, i)) return !1;
        if (t.CalculateType !== 0) return !1;
        if (this.zfn(t)) {
          this.c6r(t), this.tpn(t, e), this.ipn(t), this.Lwr(t);
          for (const [n] of this.Qfn)
            this.epn(n, t) && this.Zfn(n, t) && this.opn(n, t);
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemEntityHit,
          ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnAnySceneItemEntityHit,
              this.Entity,
            );
        }
      }
      return !0;
    }
    GetPenetrationType() {
      return this.Entity.GetComponent(0).GetBaseInfo().Category
        .BulletPenetrationType;
    }
    c6r(t) {
      let e;
      const i = t.ReBulletData.Render.EffectOnHit.get(4);
      i &&
        i.length !== 0 &&
        ((e = new UE.Transform(
          t.HitEffectRotation.ToUeRotator(),
          t.HitPosition.ToUeVector(),
          Vector_1.Vector.OneVector,
        )),
        BulletCollisionUtil_1.BulletCollisionUtil.PlaySceneItemHitEffect(
          t.Attacker,
          i,
          e,
          t.ReBulletData.Render.AudioOnHit,
        ));
    }
    tpn(e, i) {
      const n = this.Entity.GetComponent(177);
      if (n) {
        let r =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorsNum(
            this.Hte.GetSceneInteractionLevelHandleId(),
          );
        let t = void 0;
        r && r > 0
          ? i.ValidProcessIndex === 1 &&
            (t =
              SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorTag(
                this.Hte.GetSceneInteractionLevelHandleId(),
                i.Actor,
              )?.TagId)
          : ((i = (r = EntitySystem_1.EntitySystem.Get(
              e.BulletEntityId,
            ).GetBulletInfo()).BulletDataMain.Base.BeHitEffect),
            (e = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
              r.Attacker,
              i,
            )),
            BulletUtil_1.BulletUtil.GetHitRotator(r, this.Hte, this.Jfn),
            (i = BulletUtil_1.BulletUtil.GetOverrideHitAnimByAngle(
              this.Hte,
              e?.被击动作,
              this.Jfn.Yaw,
            )),
            (t = this.rpn(i))),
          void 0 !== this.Yfn && (n.RemoveTag(this.Yfn), (this.Yfn = void 0)),
          void 0 !== t && (n.AddTag(t), (this.Yfn = t));
      }
    }
    ipn(t) {
      var e = t.ReBulletData.Base.BeHitEffect;
      var e = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
        t.Attacker,
        e,
      );
      e && this.Hte.UpdateHitInfo(t.HitPosition, e.地面受击速度);
    }
    opn(t, e) {
      t?.Valid &&
        (EventSystem_1.EventSystem.EmitWithTarget(
          t,
          EventDefine_1.EEventName.OnSceneItemHit,
        ),
        EventSystem_1.EventSystem.EmitWithTarget(
          t,
          EventDefine_1.EEventName.OnSceneItemHitByHitData,
          e,
        ));
    }
    Lwr(t) {
      this.npn(t), this.spn(t);
    }
    npn(t) {
      let e;
      let i = t.ReBulletData.TimeScale;
      const n = i.TimeScaleOnAttack;
      const r = this.Xfn?.ValueRatio ?? 1;
      const o = this.Xfn?.TimeRatio ?? 1;
      i.TimeScaleOnAttackIgnoreAttacker
        ? n.时间膨胀时长 > 0 &&
          ((e = EntitySystem_1.EntitySystem.Get(
            t.BulletEntityId,
          ).GetBulletInfo()),
          BulletUtil_1.BulletUtil.SetTimeScale(
            e,
            n.优先级,
            n.时间膨胀值 * r,
            n.时间膨胀变化曲线,
            n.时间膨胀时长 * o,
            1,
          ))
        : n.时间膨胀时长 > 0 &&
          (t.Attacker.GetComponent(107)?.SetTimeScale(
            n.优先级 - 1,
            n.时间膨胀值 * r,
            n.时间膨胀变化曲线,
            n.时间膨胀时长 * o,
            1,
          ),
          (e = i.CharacterCustomKeyTimeScale),
          StringUtils_1.StringUtils.IsEmpty(e) ||
            ((i =
              ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
                t.Attacker.Id,
                e,
                t.BulletId.toString(),
              )) &&
              EntitySystem_1.EntitySystem.Get(i)
                ?.GetComponent(107)
                ?.SetTimeScale(
                  n.优先级,
                  n.时间膨胀值 * r,
                  n.时间膨胀变化曲线,
                  n.时间膨胀时长 * o,
                  1,
                )));
    }
    spn(t) {
      let e, i;
      t.ReBulletData.Base.ContinuesCollision ||
        ((t = t.ReBulletData.TimeScale.TimeScaleOnHit),
        (e = this.$fn?.ValueRatio ?? 1),
        (i = this.$fn?.TimeRatio ?? 1),
        t.时间膨胀时长 > 0 &&
          this.Entity.GetComponent(107)?.SetTimeScale(
            t.优先级,
            t.时间膨胀值 * e,
            t.时间膨胀变化曲线,
            t.时间膨胀时长 * i,
            2,
          ));
    }
    AddHitCondition(t) {
      this.Kfn.push(t);
    }
    RemoveHitCondition(t) {
      t = this.Kfn.indexOf(t);
      t !== -1 && this.Kfn.splice(t, 1);
    }
    RegisterComponent(t, e) {
      let i;
      this.Qfn.has(t) ||
        (((i = new ComponentHitReg()).ComponentHitBaseConfig = e),
        this.Qfn.set(t, i),
        e?.AttackerHitTimeScaleRatio &&
          (this.Xfn = e.AttackerHitTimeScaleRatio),
        e?.VictimHitTimeScaleRatio && (this.$fn = e.VictimHitTimeScaleRatio));
    }
    AddComponentHitCondition(t, e) {
      let i;
      this.Qfn.has(t) || ((i = new ComponentHitReg()), this.Qfn.set(t, i)),
        this.Qfn.get(t).ComponentHitConditionCheck.push(e);
    }
    RemoveComponentHitCondition(t, e) {
      t = this.Qfn.get(t)?.ComponentHitConditionCheck;
      void 0 !== t && (e = t.indexOf(e)) !== -1 && t.splice(e, 1);
    }
    rpn(t) {
      return SceneItemHitComponent_1.apn.get(t);
    }
  });
(SceneItemHitComponent.apn = new Map([
  [8, 631236362],
  [1, -40693742],
  [9, 1688432695],
  [0, 178446985],
  [10, -1474770640],
  [3, -1876401816],
  [11, -350051159],
  [2, -2061161961],
])),
  (SceneItemHitComponent = SceneItemHitComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(138)],
      SceneItemHitComponent,
    )),
  (exports.SceneItemHitComponent = SceneItemHitComponent);
// # sourceMappingURL=SceneItemHitComponent.js.map
