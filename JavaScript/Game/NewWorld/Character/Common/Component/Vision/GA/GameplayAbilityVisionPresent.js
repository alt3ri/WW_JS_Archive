"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayAbilityVisionPresent = void 0);
const Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc"),
  GameplayAbilityVisionMorph_1 = require("./GameplayAbilityVisionMorph");
class GameplayAbilityVisionPresent extends GameplayAbilityVisionMorph_1.GameplayAbilityVisionMorph {
  constructor() {
    super(...arguments),
      (this.Lu1 = Vector_1.Vector.Create()),
      (this.wu1 = Rotator_1.Rotator.Create());
  }
  SetVisionEnable(i) {
    i
      ? (this.Lu1.DeepCopy(this.VisionActorComponent.ActorLocationProxy),
        this.wu1.DeepCopy(this.VisionActorComponent.ActorRotationProxy),
        PhantomUtil_1.PhantomUtil.SetVisionEnable(
          this.VisionComponent.Entity,
          i,
          "GameplayAbilityVisionPresent.SetVisionEnable",
        ))
      : (this.VisionSkillComponent.StopGroup1Skill("驻场声骸技能结束"),
        this.VisionActorComponent.SetActorLocationAndRotation(
          this.Lu1.ToUeVector(),
          this.wu1.ToUeRotator(),
          "驻场声骸消失时恢复原来的位置",
          !1,
        ),
        this.VisionBuffComponent.AddBuff(
          GameplayAbilityVisionMisc_1.VISION_APPEAR_BUFF_ID,
          {
            InstigatorId: this.VisionBuffComponent.CreatureDataId,
            Reason: "驻场声骸归位时的材质和粒子",
          },
        ));
  }
  NeedNoAi() {
    return !1;
  }
  NeedNoActive() {
    return !1;
  }
}
exports.GameplayAbilityVisionPresent = GameplayAbilityVisionPresent;
//# sourceMappingURL=GameplayAbilityVisionPresent.js.map
