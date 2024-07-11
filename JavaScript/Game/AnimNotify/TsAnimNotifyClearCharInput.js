"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyClearCharInput extends UE.KuroAnimNotify {
  K2_Notify(e, r) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        e.CharacterActorComponent.ClearInput(),
      !0
    );
  }
  GetNotifyName() {
    return "清除角色移动输入";
  }
}
exports.default = TsAnimNotifyClearCharInput;
//# sourceMappingURL=TsAnimNotifyClearCharInput.js.map
