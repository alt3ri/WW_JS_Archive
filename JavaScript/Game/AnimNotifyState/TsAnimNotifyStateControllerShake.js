"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  Global_1 = require("../Global"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterUtils_1 = require("../NewWorld/Character/CharacterUtils");
class TsAnimNotifyStateControllerShake extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.Effect = void 0),
      (this.Name = void 0),
      (this.IsLooping = !1),
      (this.IsIgnoreTimeDilation = !1),
      (this.IsPlayWhilePaused = !1);
  }
  Constructor() {}
  K2_NotifyBegin(e, r) {
    if (Info_1.Info.IsInGamepad()) {
      e = e.GetOwner();
      if (
        e instanceof TsBaseCharacter_1.default &&
        e.CharacterActorComponent?.IsAutonomousProxy &&
        Global_1.Global.CharacterController
      ) {
        e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          e.GetEntityIdNoBlueprint(),
        );
        if (!e?.Valid) return !1;
        if (
          !CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(
            e,
          )
        )
          return !1;
        Global_1.Global.CharacterController.PlayKuroForceFeedback(
          this.Effect,
          this.Name,
          this.IsLooping,
          this.IsIgnoreTimeDilation,
          this.IsPlayWhilePaused,
        );
      }
    }
    return !0;
  }
  K2_NotifyEnd(e, r) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        e.CharacterActorComponent?.IsAutonomousProxy &&
        Global_1.Global.CharacterController &&
        Global_1.Global.CharacterController.StopKuroForceFeedback(
          this.Effect,
          this.Name,
        ),
      !0
    );
  }
  GetNotifyName() {
    return "手柄震动";
  }
}
exports.default = TsAnimNotifyStateControllerShake;
//# sourceMappingURL=TsAnimNotifyStateControllerShake.js.map
