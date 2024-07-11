"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionNameText = void 0);
const UE = require("ue"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionNameText {
  constructor(i) {
    (this.jsi = void 0), (this.jsi = i);
  }
  Update(i) {
    var t = i.GetMonsterName();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.jsi, t),
      this.jsi.SetColor(UE.Color.FromHex(i.GetNameColor()));
  }
}
exports.VisionNameText = VisionNameText;
//# sourceMappingURL=VisionNameText.js.map
