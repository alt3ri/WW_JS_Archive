"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class TsAnimNotifyStateSetMovementMode extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.EnterMode = 0),
      (this.EnterCustomMode = 0),
      (this.LeaveMode = 0),
      (this.LeaveCustomMode = 0);
  }
  K2_NotifyBegin(t, e, s) {
    t = t.GetOwner();
    return (
      t instanceof UE.Character &&
      (t.CharacterMovement.SetMovementMode(
        this.EnterMode,
        this.EnterCustomMode,
      ),
      !0)
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    return (
      t instanceof UE.Character &&
      (t.CharacterMovement.SetMovementMode(
        this.LeaveMode,
        this.LeaveCustomMode,
      ),
      !0)
    );
  }
  GetNotifyName() {
    return "设置移动模式";
  }
}
exports.default = TsAnimNotifyStateSetMovementMode;
// # sourceMappingURL=TsAnimNotifyStateSetMovementMode.js.map
