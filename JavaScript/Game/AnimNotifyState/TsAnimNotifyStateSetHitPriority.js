"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSetHitPriority extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.HitPriority = 0);
  }
  K2_NotifyBegin(t, e) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((t.CharacterMovement.HitPriority = this.HitPriority), !0)
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      (t
        .GetEntityNoBlueprint()
        .GetComponent(164)
        .ResetHitPriorityAndGoThrough(),
      !0)
    );
  }
  GetNotifyName() {
    return "（废弃别使用）设置帧状态事件期间碰撞等级";
  }
}
exports.default = TsAnimNotifyStateSetHitPriority;
//# sourceMappingURL=TsAnimNotifyStateSetHitPriority.js.map
