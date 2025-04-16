"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayAbilityVisionMorph = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  CollisionUtils_1 = require("../../../../../../../Core/Utils/CollisionUtils"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  BulletController_1 = require("../../../../../Bullet/BulletController"),
  RoleAudioController_1 = require("../../../../Role/RoleAudioController"),
  GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase"),
  GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
class GameplayAbilityVisionMorph extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
  constructor() {
    super(...arguments),
      (this.MZo = void 0),
      (this.oMt = void 0),
      (this.VisionActorComponent = void 0),
      (this.NVc = void 0),
      (this.VisionBuffComponent = void 0),
      (this.fAr = void 0),
      (this.TSa = void 0),
      (this.VisionSkillComponent = void 0),
      (this.XZo = void 0),
      (this.VVc = void 0),
      (this.rta = void 0),
      (this.ota = void 0),
      (this.pAr = !1),
      (this.vAr = !1),
      (this.zZo = !1),
      (this.ZZo = !1),
      (this.kQo = 0);
  }
  OnCreate() {
    this.VVc = this.GameplayTagComponent.ListenForTagAddOrRemove(
      GameplayAbilityVisionMisc_1.stealthTag,
      (i, t) => {
        t
          ? this.NVc?.AddTag(GameplayAbilityVisionMisc_1.stealthTag)
          : this.NVc?.RemoveTag(GameplayAbilityVisionMisc_1.stealthTag);
      },
    );
  }
  OnDestroy() {
    this.eer(),
      this.VisionSkillComponent?.OnVisionAbilityDestroy(),
      this.VVc?.EndTask();
  }
  OnTick(i) {
    var t, s, e;
    this.zZo &&
      ((t =
        this.VisionActorComponent.ScaledHalfHeight -
        this.ActorComponent.ScaledHalfHeight),
      (s = GameplayAbilityVisionMisc_1.tempVector1).DeepCopy(
        this.VisionActorComponent.ActorLocationProxy,
      ),
      (e = GameplayAbilityVisionMisc_1.tempVector2),
      this.MoveComponent.GravityUp.Multiply(t, e),
      s.SubtractionEqual(e),
      this.Wxr(this.ActorComponent.ActorLocationProxy, s)
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Battle",
              28,
              "变身OnTick过程穿墙，需打断幻象变身技能",
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.VisionMorphInterrupt,
          ),
          this.SkillComponent.EndSkill(
            this.SkillComponent.CurrentSkill?.SkillId ?? 0,
            "GameplayAbilityVisionMorph.IsHit",
          ))
        : (this.ActorComponent.SetActorLocationAndRotation(
            s.ToUeVector(),
            this.VisionActorComponent.ActorRotation,
            "GameplayAbilityVisionMorph.OnTick",
            !1,
          ),
          this.ZZo &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Battle",
                28,
                "GameplayAbilityVisionMorph.OnTick设置位置",
                ["人的位置", this.ActorComponent.ActorLocationProxy],
                ["幻象的位置", this.VisionActorComponent.ActorLocationProxy],
              ),
            (this.ZZo = !1))));
  }
  OnActivateAbility() {
    return !(
      this.pAr ||
      !this.AU() ||
      ((this.pAr = !0),
      this.oMt.空中能否释放 || this.SkillComponent.PlaySkillMontage(0, "", 0),
      this.aZo(!1),
      this.GameplayTagComponent.AddTag(
        GameplayAbilityVisionMisc_1.invincibleTag,
      ),
      this.BuffComponent.RemoveBuff(
        GameplayAbilityVisionMisc_1.ROLE_DODGE_FORBID_BUFF_ID,
        -1,
        "幻象变身技能激活时移除角色禁止闪避的Buff",
      ),
      this.CueComponent.AddCue(GameplayAbilityVisionMisc_1.ROLE_HIDE_CUE_ID, {
        Sync: !0,
        Instant: !0,
      }),
      (this.rta = TimerSystem_1.TimerSystem.Delay(() => {
        this.ier(!0);
      }, GameplayAbilityVisionMisc_1.CHARACTER_HIDDEN_DELAY)),
      this.oer(),
      0)
    );
  }
  OnEndAbility() {
    return (
      this.pAr &&
        ((this.pAr = !1),
        this.ner(!1),
        this.GameplayTagComponent.RemoveTag(
          GameplayAbilityVisionMisc_1.invincibleTag,
        ),
        this.GameplayTagComponent.RemoveTag(
          GameplayAbilityVisionMisc_1.morphTag,
        )),
      !0
    );
  }
  OnChangeVision() {
    this.VisionSkillComponent?.ExitMultiSkillState(), (this.NVc = void 0);
  }
  HandlePress(i, t) {
    return (
      !!this.VisionSkillComponent && this.VisionSkillComponent.HandlePress(i, t)
    );
  }
  AU() {
    return (
      (this.MZo = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        this.VisionComponent.Entity,
        Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
      )),
      !!this.MZo.IsInit &&
        !(
          (this.NeedNoActive() && this.MZo.Entity.Active) ||
          (this.NeedNoAi() && this.MZo.Entity.GetComponent(46)?.IsEnabled()
            ? (CombatLog_1.CombatLog.Error(
                "Skill",
                this.MZo.Entity,
                "变身幻象不能配置AI，请检查一下AI配置",
              ),
              1)
            : ((this.oMt = PhantomUtil_1.PhantomUtil.GetVisionData(
                this.VisionComponent.GetVisionId(),
              )),
              (this.VisionActorComponent = this.MZo.Entity.GetComponent(3)),
              (this.NVc = this.MZo.Entity.GetComponent(203)),
              (this.VisionBuffComponent = this.MZo.Entity.GetComponent(172)),
              (this.fAr = this.MZo.Entity.GetComponent(21)),
              (this.TSa = this.MZo.Entity.GetComponent(176)),
              (this.VisionSkillComponent = this.MZo.Entity.GetComponent(41)),
              this.VisionSkillComponent.InitVisionSkill(this.EntityHandle, !0),
              0))
        )
    );
  }
  aZo(i) {
    CollisionUtils_1.CollisionUtils.SetCollisionResponseToPawn(
      this.VisionActorComponent.Actor.CapsuleComponent,
      2,
      i ? 2 : 0,
    ),
      this.VisionActorComponent.Actor.CapsuleComponent.IgnoreActorWhenMoving(
        this.ActorComponent.Actor,
        !i,
      ),
      this.ActorComponent.Actor.CapsuleComponent.IgnoreActorWhenMoving(
        this.VisionActorComponent.Actor,
        !i,
      );
  }
  oer() {
    (this.vAr = !0),
      this.TSa.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy),
      this.SetVisionEnable(!0);
    var i = GameplayAbilityVisionMisc_1.tempVector1,
      i =
        (this.MoveComponent.GravityUp.Multiply(
          this.VisionActorComponent.ScaledHalfHeight -
            this.ActorComponent.ScaledHalfHeight,
          i,
        ),
        this.VisionActorComponent.SetActorLocationAndRotation(
          this.ActorComponent.ActorLocation.op_Addition(i.ToUeVector()),
          this.ActorComponent.ActorRotation,
          "幻象变身出现位置",
          !1,
        ),
        (this.ZZo = !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Battle",
            28,
            "GameplayAbilityVisionMorph.MorphBegin设置位置",
            ["人的位置", this.ActorComponent.ActorLocationProxy],
            ["幻象的位置", this.VisionActorComponent.ActorLocationProxy],
          ),
        (this.zZo = !0),
        this.GameplayTagComponent.AddTag(GameplayAbilityVisionMisc_1.morphTag),
        this.XZo ||
          (this.XZo = this.GameplayTagComponent.ListenForTagAddOrRemove(
            GameplayAbilityVisionMisc_1.morphTag,
            (i, t) => {
              t || this.ner(!0);
            },
          )),
        this.VisionBuffComponent.AddBuff(
          GameplayAbilityVisionMisc_1.VISION_APPEAR_BUFF_ID,
          {
            InstigatorId: this.VisionBuffComponent.CreatureDataId,
            Reason: "开始幻象变身时幻象自身的材质和粒子",
          },
        ),
        this.oMt.技能ID);
    0 < i &&
      (this.VisionSkillComponent.BeginSkill(i, {
        Target: this.SkillComponent.SkillTarget?.Entity,
        SocketName: this.SkillComponent.SkillTargetSocket,
        Reason: "VisionSkill.BeginSkill",
        CheckMultiSkill: !0,
      }),
      (this.SkillComponent.SkillTarget = this.VisionSkillComponent.SkillTarget),
      (this.SkillComponent.SkillTargetSocket =
        this.VisionSkillComponent.SkillTargetSocket)),
      RoleAudioController_1.RoleAudioController.PlayRoleAudio(
        this.Entity,
        2001,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.VisionMorphBegin,
        this.MZo,
        this.EntityHandle,
      );
  }
  ner(i) {
    var t;
    this.vAr &&
      ((this.vAr = !1),
      this.eer(),
      this.NZo(),
      this.ier(!1),
      this.MoveComponent.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy),
      (t = this.rer()),
      i &&
        ((i = () => {
          this.SkillComponent.EndSkill(
            this.SkillComponent.CurrentSkill?.SkillId ?? 0,
            "GameplayAbilityVisionMorph.MorphEnd",
          );
        }),
        t ? this.SkillComponent.PlaySkillMontage(1, "", 0, i) : i()),
      this.VisionSkillComponent.OnMorphEnd(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.VisionMorphEnd,
        this.EntityHandle,
        this.MZo,
      ));
  }
  ier(i) {
    var t, s;
    i ||
      (this.CueComponent.AddCue(
        GameplayAbilityVisionMisc_1.ROLE_APPEAR_CUE_ID,
        { Sync: !0, Instant: !0 },
      ),
      (t = this.ActorComponent.ActorRotation),
      (s = this.VisionActorComponent.ActorRotation),
      (s = new UE.Rotator(t.Pitch, s.Yaw, t.Roll)),
      this.ActorComponent.SetActorRotation(s, "GameplayAbilityVisionMorph")),
      ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(
        this.Entity,
        !i,
        !0,
        !i,
        "幻象变身技能隐藏角色",
        !0,
      );
  }
  eer() {
    (this.zZo = !1),
      this.XZo && (this.XZo.EndTask(), (this.XZo = void 0)),
      this.rta &&
        TimerSystem_1.TimerSystem.Has(this.rta) &&
        (TimerSystem_1.TimerSystem.Remove(this.rta), (this.rta = void 0));
  }
  rer() {
    var i = (0, GameplayAbilityVisionMisc_1.getLineTrace)(),
      t = this.ActorComponent.ActorLocationProxy,
      s = this.ActorComponent.ScaledHalfHeight + 20,
      e = GameplayAbilityVisionMisc_1.tempVector1,
      s =
        (this.MoveComponent.GravityDirect.Multiply(s, e),
        e.AdditionEqual(t),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, e),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          i,
          "GameplayAbilityVisionMorph.FixMovementMode",
        ));
    return !(!s || !i.HitResult.bBlockingHit);
  }
  NZo() {
    (this.ota = TimerSystem_1.TimerSystem.Delay(() => {
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Battle", 28, "幻象消失材质没有正常结束，被保底"),
        this.iba();
    }, GameplayAbilityVisionMisc_1.VISION_HIDDEN_DELAY)),
      this.fAr?.AddCue(GameplayAbilityVisionMisc_1.MORPH_PARTICLE_CUE_ID, {
        Sync: !0,
        Instant: !0,
      }),
      (this.kQo = this.fAr.AddCue(GameplayAbilityVisionMisc_1.MATERIAL_CUE_ID, {
        EndCallback: () => {
          TimerSystem_1.TimerSystem.Has(this.ota) &&
            (TimerSystem_1.TimerSystem.Remove(this.ota), this.iba());
        },
        Sync: !0,
      }));
  }
  Wxr(i, t) {
    var s = (0, GameplayAbilityVisionMisc_1.getLineTrace)(),
      i =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, i),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, t),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          s,
          "GameplayAbilityVisionMorph.FixLocation",
        ));
    return i && s.HitResult.bBlockingHit;
  }
  iba() {
    (this.ota = void 0),
      this.pAr &&
        this.GameplayTagComponent.RemoveTag(
          GameplayAbilityVisionMisc_1.invincibleTag,
        ),
      this.MZo?.Valid &&
        (BulletController_1.BulletController.CreateBulletCustomTarget(
          this.MZo.Entity,
          GameplayAbilityVisionMisc_1.VISION_END_BULLET,
          void 0,
        ),
        this.fAr?.RemoveCueByHandle(this.kQo),
        this.SetVisionEnable(!1),
        this.aZo(!0));
  }
  SetVisionEnable(i) {
    PhantomUtil_1.PhantomUtil.SetVisionEnable(
      this.VisionComponent.Entity,
      i,
      "GameplayAbilityVisionMorph.SetVisionEnable",
    );
  }
  NeedNoAi() {
    return !0;
  }
  NeedNoActive() {
    return !0;
  }
}
exports.GameplayAbilityVisionMorph = GameplayAbilityVisionMorph;
//# sourceMappingURL=GameplayAbilityVisionMorph.js.map
