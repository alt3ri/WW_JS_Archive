"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyCatapult extends UE.KuroAnimNotify {
  K2_Notify(e, t) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        e.CharacterActorComponent.Entity?.GetComponent(30).StartCatapult(),
      !0
    );
  }
  GetNotifyName() {
    return "轨迹运动";
  }
}
exports.default = TsAnimNotifyCatapult;
//# sourceMappingURL=TsAnimNotifyCatapult.js.map
