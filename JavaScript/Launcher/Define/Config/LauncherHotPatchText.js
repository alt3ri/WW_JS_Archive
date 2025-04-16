"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherHotPatchText = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class LauncherHotPatchText {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsLauncherHotPatchText(t, e) {
    return (e || new LauncherHotPatchText()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id(t) {
    var e = this.J7.__offset(this.z7, 4),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  text() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.LauncherHotPatchText = LauncherHotPatchText;
//# sourceMappingURL=LauncherHotPatchText.js.map
