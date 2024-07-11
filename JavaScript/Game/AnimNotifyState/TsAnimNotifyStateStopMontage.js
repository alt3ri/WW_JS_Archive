"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  QUIT_BLEND_TIME = 0.1;
class TsAnimNotifyStateStopMontage extends UE.KuroAnimNotifyState {
  K2_NotifyTick(e, t, a) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.CharacterActorComponent?.Entity) &&
      (e.GetComponent(163)?.HasMoveInput &&
        (e = e.GetComponent(162)) &&
        e.MainAnimInstance.Montage_Stop(QUIT_BLEND_TIME),
      !0)
    );
  }
}
exports.default = TsAnimNotifyStateStopMontage;
//# sourceMappingURL=TsAnimNotifyStateStopMontage.js.map
