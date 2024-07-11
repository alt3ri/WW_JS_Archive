"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifySetMovementMode extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.MovementMode = 0);
  }
  K2_Notify(e, t) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        e.CharacterMovement.SetMovementMode(this.MovementMode),
      !0
    );
  }
  GetNotifyName() {
    return "设置移动模式";
  }
}
exports.default = TsAnimNotifySetMovementMode;
//# sourceMappingURL=TsAnimNotifySetMovementMode.js.map
