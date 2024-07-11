"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  Global_1 = require("../Global");
class TsAnimNotifyStateControllerShake extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.Effect = void 0),
      (this.Name = void 0),
      (this.IsLooping = !1),
      (this.IsIgnoreTimeDilation = !1),
      (this.IsPlayWhilePaused = !1);
  }
  K2_NotifyBegin(e, t) {
    return (
      Info_1.Info.IsInGamepad() &&
        (e = e.GetOwner()) instanceof TsBaseCharacter_1.default &&
        e.CharacterActorComponent?.IsAutonomousProxy &&
        Global_1.Global.CharacterController &&
        Global_1.Global.CharacterController.PlayKuroForceFeedback(
          this.Effect,
          this.Name,
          this.IsLooping,
          this.IsIgnoreTimeDilation,
          this.IsPlayWhilePaused,
        ),
      !0
    );
  }
  K2_NotifyEnd(e, t) {
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
