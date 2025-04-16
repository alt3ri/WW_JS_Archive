"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayAbilityVisionSummon = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  BulletController_1 = require("../../../../../Bullet/BulletController"),
  RoleAudioController_1 = require("../../../../Role/RoleAudioController"),
  GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase"),
  GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
class GameplayAbilityVisionSummon extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
  constructor() {
    super(...arguments),
      (this.MZo = void 0),
      (this.oMt = void 0),
      (this.ser = 0),
      (this.OZo = void 0),
      (this.kZo = void 0),
      (this.aer = void 0),
      (this.KZo = void 0),
      (this.fAr = void 0),
      (this.MAr = void 0),
      (this.kQo = 0),
      (this.ota = void 0),
      (this.pAr = !1),
      (this.FZo = (i) => {
        i.BulletEntityId === this.ser &&
          this.EAr(i.MoveInfo.LastFramePosition.ToUeVector());
      }),
      (this.b9_ = (i, t) => {
        this.pAr &&
          this.MZo?.Valid &&
          i === this.MZo.Id &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Battle", 28, "技能被全部打断，结束召唤幻象技能", [
              "reason",
              t,
            ]),
          this.SAr());
      });
  }
  OnCreate() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Entity,
      EventDefine_1.EEventName.BulletDestroy,
      this.FZo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharStopAllSkills,
        this.b9_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharStopGroup1Skill,
        this.b9_,
      );
  }
  OnDestroy() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Entity,
      EventDefine_1.EEventName.BulletDestroy,
      this.FZo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharStopAllSkills,
        this.b9_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharStopGroup1Skill,
        this.b9_,
      ),
      this.eer();
  }
  OnActivateAbility() {
    if (!this.HZo()) return !1;
    this.her() ||
      this.BuffComponent.AddBuff(
        GameplayAbilityVisionMisc_1.ROLE_SUMMON_BUFF_ID,
        {
          InstigatorId: this.BuffComponent.CreatureDataId,
          Reason: "幻象召唤时触发子弹、镜头和特效",
        },
      );
    let t = void 0;
    var i = this.Entity.GetComponent(39);
    if (i?.Valid)
      for (const e of i.GetAllActivatedSkill())
        if (9 === e.SkillInfo?.SkillGenre) {
          t = e.LFc;
          break;
        }
    for (let i = 0; i < this.oMt.葫芦轨迹子弹列表.Num(); ++i) {
      var s = this.oMt.葫芦轨迹子弹列表.Get(i),
        s = BulletController_1.BulletController.CreateBulletCustomTarget(
          this.Entity,
          s.toString(),
          this.ActorComponent.ActorTransform,
          {},
          t,
        );
      if (s) {
        this.ser = s.Id;
        break;
      }
    }
    return !0;
  }
  HZo() {
    return (
      (this.MZo = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        this.VisionComponent.Entity,
        Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
      )),
      !!this.MZo.IsInit &&
        !this.MZo.Entity.Active &&
        ((this.oMt = PhantomUtil_1.PhantomUtil.GetVisionData(
          this.VisionComponent.GetVisionId(),
        )),
        (this.OZo = this.MZo.Entity.GetComponent(3)),
        (this.kZo = this.MZo.Entity.GetComponent(39)),
        (this.aer = this.MZo.Entity.GetComponent(203)),
        (this.KZo = this.MZo.Entity.GetComponent(172)),
        (this.fAr = this.MZo.Entity.GetComponent(21)),
        !0)
    );
  }
  her() {
    return this.oMt.空中能否释放 && this.GameplayTagComponent.HasTag(40422668);
  }
  EAr(i) {
    var t = MathUtils_1.MathUtils.CommonTempVector,
      i =
        (this.MoveComponent.GravityUp.Multiply(this.OZo.ScaledHalfHeight, t),
        this.OZo.SetActorLocationAndRotation(
          i.op_Addition(t.ToUeVector()),
          this.ActorComponent.ActorRotation,
          "召唤幻象生成位置",
        ),
        (this.pAr = !0),
        PhantomUtil_1.PhantomUtil.SetVisionEnable(
          this.VisionComponent.Entity,
          !0,
          "GameplayAbilityVisionSummon.SetVisionEnable",
        ),
        this.GameplayTagComponent.AddTag(GameplayAbilityVisionMisc_1.summonTag),
        this.MAr ||
          (this.MAr = this.GameplayTagComponent.ListenForTagAddOrRemove(
            GameplayAbilityVisionMisc_1.summonTag,
            (i, t) => {
              t ||
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Battle", 28, "召唤幻象正常结束"),
                this.SAr());
            },
          )),
        this.aer.AddTag(-993206571),
        this.KZo.AddBuff(GameplayAbilityVisionMisc_1.VISION_SUMMON_BUFF_ID, {
          InstigatorId: this.KZo.CreatureDataId,
          Reason: "召唤系幻象的出生特效",
        }),
        this.kZo.SetSkillAcceptInput(!0),
        this.oMt.技能ID);
    0 < i &&
      this.kZo.BeginSkill(i, {
        Target: this.SkillComponent.SkillTarget?.Entity,
        SocketName: this.SkillComponent.SkillTargetSocket,
        Reason: "GameplayAbilityVisionSummon.BeginSkill",
      }),
      RoleAudioController_1.RoleAudioController.PlayRoleAudio(
        this.Entity,
        2002,
      );
  }
  SAr() {
    this.eer(), this.NZo();
  }
  eer() {
    this.MAr && (this.MAr.EndTask(), (this.MAr = void 0));
  }
  NZo() {
    (this.ota = TimerSystem_1.TimerSystem.Delay(() => {
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Battle", 28, "幻象消失材质没有正常结束，被保底"),
        this.iba();
    }, GameplayAbilityVisionMisc_1.VISION_HIDDEN_DELAY)),
      this.fAr?.AddCue(GameplayAbilityVisionMisc_1.SUMMON_PARTICLE_CUE_ID, {
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
  iba() {
    (this.ota = void 0),
      this.MZo?.Valid &&
        (BulletController_1.BulletController.CreateBulletCustomTarget(
          this.MZo.Entity,
          GameplayAbilityVisionMisc_1.VISION_END_BULLET,
          void 0,
        ),
        (this.pAr = !1),
        PhantomUtil_1.PhantomUtil.SetVisionEnable(
          this.VisionComponent.Entity,
          !1,
          "GameplayAbilityVisionSummon.SetVisionEnable",
        ),
        this.fAr?.RemoveCueByHandle(this.kQo));
  }
}
exports.GameplayAbilityVisionSummon = GameplayAbilityVisionSummon;
//# sourceMappingURL=GameplayAbilityVisionSummon.js.map
