"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayAbilityVisionExplore = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  CollisionUtils_1 = require("../../../../../../../Core/Utils/CollisionUtils"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase"),
  GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
class GameplayAbilityVisionExplore extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
  constructor() {
    super(...arguments),
      (this.MZo = void 0),
      (this.OZo = void 0),
      (this.kZo = void 0),
      (this.FZo = (i) => {
        this.MZo &&
          -1140906579 ===
            i.BulletDataMain.Execution.SendGameplayEventTagToAttackerOnEnd
              .TagId &&
          !this.GameplayTagComponent.HasTag(
            GameplayAbilityVisionMisc_1.morphTag,
          ) &&
          this.VZo(i.MoveInfo.LastFramePosition.ToUeVector());
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
    );
  }
  OnActivateAbility() {
    return (
      !!this.HZo() &&
      (this.SkillComponent.PlaySkillMontage(0, "", 0, () => {
        this.SkillComponent.EndSkill(
          this.SkillComponent.CurrentSkill?.SkillId ?? 0,
          "GameplayAbilityVisionExplore.OnActivateAbility",
        );
      }),
      !0)
    );
  }
  HZo() {
    return (
      (this.MZo = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        this.VisionComponent.Entity,
        Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
      )),
      !this.MZo.Entity.Active &&
        ((this.OZo = this.MZo.Entity.GetComponent(3)),
        (this.kZo = this.MZo.Entity.GetComponent(39)),
        !0)
    );
  }
  VZo(i) {
    let t = 1;
    var e = this.OZo.Actor,
      e =
        (e.IsA(UE.BP_BaseVision_C.StaticClass()) && (t = e.显像放大比例.Z),
        new UE.VectorDouble(0, 0, this.OZo.ScaledHalfHeight * t));
    this.OZo.SetActorLocationAndRotation(
      i.op_Addition(e),
      this.ActorComponent.ActorRotation,
      "召唤展示生成位置",
    ),
      PhantomUtil_1.PhantomUtil.SetVisionEnable(
        this.VisionComponent.Entity,
        !0,
        "GameplayAbilityVisionExplore.SetVisionEnable",
      ),
      this.aZo(!0),
      this.kZo.SetSkillAcceptInput(!0),
      this.kZo.BeginSkill(GameplayAbilityVisionMisc_1.EXPLORE_SKILL_ID, {
        Reason: "GameplayAbilityVisionExplore.PostSummon",
      });
  }
  aZo(i) {
    CollisionUtils_1.CollisionUtils.SetCollisionResponseToPawn(
      this.OZo.Actor.CapsuleComponent,
      2,
      i ? 2 : 0,
    ),
      this.OZo.Actor.CapsuleComponent.IgnoreActorWhenMoving(
        this.ActorComponent.Actor,
        !i,
      ),
      this.ActorComponent.Actor.CapsuleComponent.IgnoreActorWhenMoving(
        this.OZo.Actor,
        !i,
      );
  }
}
exports.GameplayAbilityVisionExplore = GameplayAbilityVisionExplore;
//# sourceMappingURL=GameplayAbilityVisionExplore.js.map
