"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const Global_1 = require("../Global");
const ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyControllerShake extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.Effect = void 0),
      (this.Name = void 0),
      (this.IsLooping = !1),
      (this.IsIgnoreTimeDilation = !1),
      (this.IsPlayWhilePaused = !1);
  }
  K2_Notify(e, r) {
    return (
      ModelManager_1.ModelManager.PlatformModel?.IsGamepad() &&
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
  GetNotifyName() {
    return "手柄震动";
  }
}
exports.default = TsAnimNotifyControllerShake;
// # sourceMappingURL=TsAnimNotifyControllerShake.js.map
