"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayAbilityVisionSummon = void 0);
const UE = require("ue"),
  GameplayCueById_1 = require("../../../../../../../Core/Define/ConfigQuery/GameplayCueById"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
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
      (this.kQo = void 0),
      (this.aZs = void 0),
      (this.FZo = (i) => {
        i.BulletEntityId === this.ser &&
          this.EAr(i.MoveInfo.LastFramePosition.ToUeVector());
      });
  }
  OnCreate() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Entity,
      EventDefine_1.EEventName.BulletDestroy,
      this.FZo,
    );
  }
  OnDestroy() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Entity,
      EventDefine_1.EEventName.BulletDestroy,
      this.FZo,
    ),
      this.eer();
  }
  OnActivateAbility() {
    if (!this.HZo()) return !1;
    this.her() ||
      this.BuffComponent.AddBuff(GameplayAbilityVisionMisc_1.roleSummonBuffId, {
        InstigatorId: this.BuffComponent.CreatureDataId,
        Reason: "幻象召唤时触发子弹、镜头和特效",
      });
    let i = void 0;
    var t = this.Entity.GetComponent(33);
    if (t?.Valid)
      for (const e of t.GetAllActivatedSkill())
        if (9 === e.SkillInfo?.SkillGenre) {
          i = e.CombatMessageId;
          break;
        }
    return (
      (this.ser = BulletController_1.BulletController.CreateBulletCustomTarget(
        this.Entity,
        this.oMt.葫芦轨迹子弹,
        this.ActorComponent.ActorTransform,
        {},
        i,
      ).Id),
      !0
    );
  }
  HZo() {
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
        (this.kZo = this.MZo.Entity.GetComponent(33)),
        (this.aer = this.MZo.Entity.GetComponent(188)),
        (this.KZo = this.MZo.Entity.GetComponent(159)),
        (this.fAr = this.MZo.Entity.GetComponent(19)),
        !0)
    );
  }
  her() {
    return this.oMt.空中能否释放 && this.GameplayTagComponent.HasTag(40422668);
  }
  EAr(i) {
    var t = new UE.Vector(0, 0, this.OZo.ScaledHalfHeight);
    this.OZo.SetActorLocationAndRotation(
      i.op_Addition(t),
      this.ActorComponent.ActorRotation,
      "召唤幻象生成位置",
    ),
      PhantomUtil_1.PhantomUtil.SetVisionEnable(
        this.VisionComponent.Entity,
        !0,
      ),
      this.GameplayTagComponent.AddTag(GameplayAbilityVisionMisc_1.summonTag),
      this.MAr ||
        (this.MAr = this.GameplayTagComponent.ListenForTagAddOrRemove(
          GameplayAbilityVisionMisc_1.summonTag,
          (i, t) => {
            t || this.SAr();
          },
        )),
      this.aer.AddTag(-993206571),
      this.KZo.AddBuff(GameplayAbilityVisionMisc_1.visionSummonBuffId, {
        InstigatorId: this.KZo.CreatureDataId,
        Reason: "召唤系幻象的出生特效",
      }),
      this.kZo.SetSkillAcceptInput(!0);
    let e = this.oMt.技能ID;
    for (let i = 0; i < this.oMt.条件技能ID.Num(); ++i) {
      var s = this.oMt.条件技能ID.GetKey(i);
      if (this.GameplayTagComponent.HasTag(s.TagId)) {
        e = this.oMt.条件技能ID.Get(s);
        break;
      }
    }
    0 < e &&
      this.kZo.BeginSkill(e, {
        Target: this.SkillComponent.SkillTarget?.Entity,
        SocketName: this.SkillComponent.SkillTargetSocket,
        Context: "GameplayAbilityVisionSummon.PostSummon",
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
    this.fAr?.CreateGameplayCue(
      GameplayCueById_1.configGameplayCueById.GetConfig(
        GameplayAbilityVisionMisc_1.summonParticleCueId,
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
}
exports.GameplayAbilityVisionSummon = GameplayAbilityVisionSummon;
//# sourceMappingURL=GameplayAbilityVisionSummon.js.map
