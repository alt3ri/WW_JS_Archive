"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyChangeAcceleration extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.Time = 1), (this.MoveState = 6);
  }
  K2_Notify(e, t) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        (e = e.CharacterActorComponent.Entity?.GetComponent(163)) &&
        ((e.AccelerationLerpTime = this.Time),
        (e.AccelerationChangeMoveState = this.MoveState)),
      !0
    );
  }
  GetNotifyName() {
    return "修改角色位移最大加速度";
  }
}
exports.default = TsAnimNotifyChangeAcceleration;
//# sourceMappingURL=TsAnimNotifyChangeAcceleration.js.map
