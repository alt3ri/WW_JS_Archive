"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyRoleSitDown extends UE.KuroAnimNotify {
  K2_Notify(e, t) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        (e = e.CharacterActorComponent.Entity.GetComponent(26)) &&
        e.DoSitDownAction(),
      !0
    );
  }
  GetNotifyName() {
    return "角色坐下";
  }
}
exports.default = TsAnimNotifyRoleSitDown;
//# sourceMappingURL=TsAnimNotifyRoleSitDown.js.map
