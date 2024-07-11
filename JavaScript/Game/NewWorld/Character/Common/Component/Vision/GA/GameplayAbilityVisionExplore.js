"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayAbilityVisionExplore = void 0);
const UE = require("ue");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase");
const GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
class GameplayAbilityVisionExplore extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
  constructor() {
    super(...arguments),
      (this.yzo = void 0),
      (this.Vzo = void 0),
      (this.Hzo = void 0),
      (this.jzo = (i) => {
        i.BulletDataMain.Execution.SendGameplayEventTagToAttackerOnEnd.TagId ===
          -1140906579 && this.Wzo(i.MoveInfo.LastFramePosition.ToUeVector());
      });
  }
  OnCreate() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Entity,
      EventDefine_1.EEventName.BulletDestroy,
      this.jzo,
    );
  }
  OnDestroy() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Entity,
      EventDefine_1.EEventName.BulletDestroy,
      this.jzo,
    );
  }
  OnActivateAbility() {
    return (
      !!this.Kzo() &&
      (this.Qzo(),
      this.SkillComponent.PlaySkillMontage(!1, 0, "", 0, () => {
        this.SkillComponent.EndSkill(
          this.SkillComponent.CurrentSkill.SkillId,
          "GameplayAbilityVisionExplore.OnActivateAbility",
        );
      }),
      !0)
    );
  }
  Kzo() {
    return (
      (this.yzo = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        this.VisionComponent.Entity,
        Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantVision,
      )),
      !this.yzo.Entity.Active &&
        ((this.Vzo = this.yzo.Entity.GetComponent(3)),
        (this.Hzo = this.yzo.Entity.GetComponent(33)),
        !0)
    );
  }
  Wzo(i) {
    const t = new UE.Vector(0, 0, this.Vzo.ScaledHalfHeight);
    this.Vzo.SetActorLocationAndRotation(
      i.op_Addition(t),
      this.ActorComponent.ActorRotation,
      "召唤展示生成位置",
    ),
      PhantomUtil_1.PhantomUtil.SetVisionEnable(
        this.VisionComponent.Entity,
        !0,
      ),
      this.Hzo.SetSkillAcceptInput(!0),
      this.Hzo.BeginSkill(GameplayAbilityVisionMisc_1.EXPLORE_SKILL_ID, {
        Context: "GameplayAbilityVisionExplore.PostSummon",
      });
  }
  Qzo() {
    this.Vzo.Actor.CapsuleComponent.IgnoreActorWhenMoving(
      this.ActorComponent.Actor,
      !1,
    ),
      this.ActorComponent.Actor.CapsuleComponent.IgnoreActorWhenMoving(
        this.Vzo.Actor,
        !1,
      );
  }
}
exports.GameplayAbilityVisionExplore = GameplayAbilityVisionExplore;
// # sourceMappingURL=GameplayAbilityVisionExplore.js.map
