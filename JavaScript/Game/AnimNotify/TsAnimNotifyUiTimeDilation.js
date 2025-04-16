"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyUiTimeDilation extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, t) {
    return e.GetOwner() instanceof TsBaseCharacter_1.default;
  }
}
exports.default = TsAnimNotifyUiTimeDilation;
//# sourceMappingURL=TsAnimNotifyUiTimeDilation.js.map
