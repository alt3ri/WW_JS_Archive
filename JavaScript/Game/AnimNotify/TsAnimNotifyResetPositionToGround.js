"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyResetPositionToGround extends UE.KuroAnimNotify {
  K2_Notify(e, t) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      (e.CharacterActorComponent.FixBornLocation(
        "AN.重置到地面",
        !1,
        void 0,
        !0,
      ),
      !0)
    );
  }
  GetNotifyName() {
    return "重置角色到地面";
  }
}
exports.default = TsAnimNotifyResetPositionToGround;
//# sourceMappingURL=TsAnimNotifyResetPositionToGround.js.map
