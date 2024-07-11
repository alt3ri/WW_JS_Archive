"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyResetCollisionSize extends UE.KuroAnimNotify {
  K2_Notify(e, s) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      (e.CharacterActorComponent.ResetCapsuleRadiusAndHeight(), !0)
    );
  }
  GetNotifyName() {
    return "恢复默认碰撞大小";
  }
}
exports.default = TsAnimNotifyResetCollisionSize;
// # sourceMappingURL=TsAnimNotifyResetCollisionSize.js.map
