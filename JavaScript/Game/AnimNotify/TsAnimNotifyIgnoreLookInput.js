"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Global_1 = require("../Global");
class TsAnimNotifyIgnoreLookInput extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.bIgnoreLookInput = !1);
  }
  Constructor() {}
  K2_Notify(t, e) {
    var o = Global_1.Global.CharacterController;
    return (
      o?.IsValid() &&
        o.IsLookInputIgnored() !== this.bIgnoreLookInput &&
        o.SetIgnoreLookInput(this.bIgnoreLookInput),
      !0
    );
  }
  GetNotifyName() {
    return "设置禁用镜头输入";
  }
}
exports.default = TsAnimNotifyIgnoreLookInput;
//# sourceMappingURL=TsAnimNotifyIgnoreLookInput.js.map
