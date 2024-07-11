"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayAbilityVisionMorph = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  GameplayCueById_1 = require("../../../../../../../Core/Define/ConfigQuery/GameplayCueById"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  BulletController_1 = require("../../../../../Bullet/BulletController"),
  RoleAudioController_1 = require("../../../../Role/RoleAudioController"),
  GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase"),
  GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
class GameplayAbilityVisionMorph extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
  constructor() {
    super(...arguments),
      (this.MZo = void 0),
      (this.oMt = void 0),
      (this.OZo = void 0),
      (this.KZo = void 0),
      (this.fAr = void 0),
      (this.mpa = void 0),
      (this.kZo = void 0),
      (this.XZo = void 0),
      (this.sZs = void 0),
      (this.aZs = void 0),
      (this.pAr = !1),
      (this.vAr = !1),
      (this.zZo = !1),
      (this.ZZo = !1),
      (this.kQo = void 0),
      (this.PDn = 0);
  }
  OnDestroy() {
    this.eer(), this.kZo?.OnVisionAbilityDestroy();
  }
  OnTick(i) {
    var t, s;
    this.zZo &&
      ((t = this.OZo.ScaledHalfHeight - this.ActorComponent.ScaledHalfHeight),
      (s = MathUtils_1.MathUtils.CommonTempVector).DeepCopy(
        this.OZo.ActorLocationProxy,
      ),
      (s.Z -= t),
      this.Wxr(this.ActorComponent.ActorLocationProxy, s)
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Battle",
              29,
              "变身OnTick过程穿墙，需打断幻象变身技能",
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.VisionMorphInterrupt,
          ),
          this.SkillComponent.EndSkill(
            this.SkillComponent.CurrentSkill.SkillId,
            "GameplayAbilityVisionMorph.IsHit",
          ))
        : (this.ActorComponent.SetActorLocationAndRotation(
            s.ToUeVector(),
            this.OZo.ActorRotation,
            "GameplayAbilityVisionMorph.OnTick",
            !1,
          ),
          this.ZZo &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Battle",
                29,
                "GameplayAbilityVisionMorph.OnTick设置位置",
                ["人的位置", this.ActorComponent.ActorLocationProxy],
                ["幻象的位置", this.OZo.ActorLocationProxy],
              ),
            (this.ZZo = !1))));
  }
  OnActivateAbility() {
    return !(
      this.pAr ||
      !this.AU() ||
      ((this.pAr = !0),
      this.oMt.空中能否释放 ||
        this.SkillComponent.PlaySkillMontage(!1, 0, "", 0, () => {}),
      this.ter(),
      this.GameplayTagComponent.AddTag(
        GameplayAbilityVisionMisc_1.invincibleTag,
      ),
      this.MoveComponent.CharacterMovement.SetMovementMode(0),
      this.BuffComponent.AddBuff(GameplayAbilityVisionMisc_1.roleHideBuffId, {
        InstigatorId: this.BuffComponent.CreatureDataId,
        Reason: "开始幻象变身时角色添加渐变隐藏材质特效",
      }),
      (this.sZs = TimerSystem_1.TimerSystem.Delay(() => {
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
        this.BuffComponent.RemoveBuff(
          GameplayAbilityVisionMisc_1.damageReductionBuffId,
          -1,
          "结束幻象变身",
        ),
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
    this.kZo?.ExitMultiSkillState();
  }
  AU() {
    return (
      (this.MZo = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        this.VisionComponent.Entity,
        Protocol_1.Aki.Protocol.Summon.L3s.Proto_ESummonTypeConcomitantVision,
      )),
      !!this.MZo.IsInit &&
        !this.MZo.Entity.Active &&
        ((this.oMt = PhantomUtil_1.PhantomUtil.GetVisionData(
          this.VisionComponent.GetVisionId(),
        )),
        (this.OZo = this.MZo.Entity.GetComponent(3)),
        (this.KZo = this.MZo.Entity.GetComponent(159)),
        (this.fAr = this.MZo.Entity.GetComponent(19)),
        (this.mpa = this.MZo.Entity.GetComponent(163)),
        (this.kZo = this.MZo.Entity.GetComponent(34)),
        this.kZo.InitVisionSkill(this.EntityHandle, !0),
        !0)
    );
  }
  ter() {
    this.OZo.Actor.CapsuleComponent.IgnoreActorWhenMoving(
      this.ActorComponent.Actor,
      !0,
    ),
      this.ActorComponent.Actor.CapsuleComponent.IgnoreActorWhenMoving(
        this.OZo.Actor,
        !0,
      );
  }
  oer() {
    (this.vAr = !0),
      this.mpa.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy),
      PhantomUtil_1.PhantomUtil.SetVisionEnable(
        this.VisionComponent.Entity,
        !0,
      );
    var i = new UE.Vector(
      0,
      0,
      this.OZo.ScaledHalfHeight - this.ActorComponent.ScaledHalfHeight,
    );
    this.OZo.SetActorLocationAndRotation(
      this.ActorComponent.ActorLocation.op_Addition(i),
      this.ActorComponent.ActorRotation,
      "幻象变身出现位置",
      !1,
    ),
      (this.ZZo = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Battle",
          29,
          "GameplayAbilityVisionMorph.MorphBegin设置位置",
          ["人的位置", this.ActorComponent.ActorLocationProxy],
          ["幻象的位置", this.OZo.ActorLocationProxy],
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
      this.KZo.AddBuff(GameplayAbilityVisionMisc_1.visionAppearBuffId, {
        InstigatorId: this.KZo.CreatureDataId,
        Reason: "开始幻象变身时幻象自身的材质和粒子",
      }),
      this.BuffComponent.AddBuff(
        GameplayAbilityVisionMisc_1.damageReductionBuffId,
        {
          InstigatorId: this.BuffComponent.CreatureDataId,
          Reason: "幻象变身减伤",
        },
      ),
      (this.PDn = this.oMt.技能ID);
    for (let i = 0; i < this.oMt.条件技能ID.Num(); ++i) {
      var t = this.oMt.条件技能ID.GetKey(i);
      if (this.GameplayTagComponent.HasTag(t.TagId)) {
        this.PDn = this.oMt.条件技能ID.Get(t);
        break;
      }
    }
    0 < this.PDn &&
      this.kZo.BeginSkill(this.PDn, {
        Target: this.SkillComponent.SkillTarget?.Entity,
        SocketName: this.SkillComponent.SkillTargetSocket,
        Context: "VisionSkill.BeginSkill",
        CheckMultiSkill: !0,
      }),
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
      (t = this.rer() ? 1 : 2),
      i &&
        this.SkillComponent.PlaySkillMontage(!1, t, "", 0, () => {
          this.SkillComponent.EndSkill(
            this.SkillComponent.CurrentSkill.SkillId,
            "GameplayAbilityVisionMorph.MorphEnd",
          );
        }),
      0 < this.PDn && this.kZo.OnMorphEnd(this.PDn),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.VisionMorphEnd,
        this.EntityHandle,
        this.MZo,
      ));
  }
  ier(i) {
    var t, s;
    i ||
      (this.BuffComponent.AddBuff(
        GameplayAbilityVisionMisc_1.roleAppearBuffId,
        {
          InstigatorId: this.BuffComponent.CreatureDataId,
          Reason: "幻象变身结束时角色自身的材质和粒子",
        },
      ),
      (t = this.ActorComponent.ActorRotation),
      (s = this.OZo.ActorRotation),
      (s = new UE.Rotator(t.Pitch, s.Yaw, t.Roll)),
      this.ActorComponent.SetActorRotation(s, "GameplayAbilityVisionMorph")),
      ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(
        this.Entity,
        !i,
        !0,
        !0,
        "幻象变身技能隐藏角色",
        !0,
      );
  }
  eer() {
    (this.zZo = !1),
      this.XZo && (this.XZo.EndTask(), (this.XZo = void 0)),
      this.sZs &&
        TimerSystem_1.TimerSystem.Has(this.sZs) &&
        (TimerSystem_1.TimerSystem.Remove(this.sZs), (this.sZs = void 0));
  }
  rer() {
    var i = (0, GameplayAbilityVisionMisc_1.getLineTrace)(),
      t = this.ActorComponent.ActorLocationProxy,
      s = this.ActorComponent.ScaledHalfHeight + 20,
      s = Vector_1.Vector.Create(t.X, t.Y, t.Z - s),
      t =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, s),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          i,
          "GameplayAbilityVisionMorph.FixMovementMode",
        ));
    return t && i.HitResult.bBlockingHit
      ? (this.MoveComponent.CharacterMovement.SetMovementMode(1), !0)
      : (this.MoveComponent.CharacterMovement.SetMovementMode(3), !1);
  }
  NZo() {
    this.fAr?.CreateGameplayCue(
      GameplayCueById_1.configGameplayCueById.GetConfig(
        GameplayAbilityVisionMisc_1.morphParticleCueId,
      ),
      { Sync: !0 },
    ),
      (this.kQo = this.fAr?.CreateGameplayCue(
        GameplayCueById_1.configGameplayCueById.GetConfig(
          GameplayAbilityVisionMisc_1.materialCueId,
        ),
        {
          EndCallback: () => {
            BulletController_1.BulletController.CreateBulletCustomTarget(
              this.MZo.Entity,
              GameplayAbilityVisionMisc_1.VISION_END_BULLET,
              void 0,
            ),
              PhantomUtil_1.PhantomUtil.SetVisionEnable(
                this.VisionComponent.Entity,
                !1,
              ),
              this.kQo?.Destroy(),
              (this.kQo = void 0),
              this.aZs &&
                TimerSystem_1.TimerSystem.Has(this.aZs) &&
                (TimerSystem_1.TimerSystem.Remove(this.aZs),
                (this.aZs = void 0));
          },
          Sync: !0,
        },
      )),
      (this.aZs = TimerSystem_1.TimerSystem.Delay(() => {
        PhantomUtil_1.PhantomUtil.SetVisionEnable(
          this.VisionComponent.Entity,
          !1,
        );
      }, GameplayAbilityVisionMisc_1.VISION_HIDDEN_DELAY));
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
}
exports.GameplayAbilityVisionMorph = GameplayAbilityVisionMorph;
//# sourceMappingURL=GameplayAbilityVisionMorph.js.map
