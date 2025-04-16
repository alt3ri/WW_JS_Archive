"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotKeyIcon = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class HotKeyIcon {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get KeyName() {
    return this.keyname();
  }
  get Icon() {
    return this.icon();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsHotKeyIcon(t, e) {
    return (e || new HotKeyIcon()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  keyname(t) {
    var e = this.J7.__offset(this.z7, 4),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  icon(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.HotKeyIcon = HotKeyIcon;
//# sourceMappingURL=HotKeyIcon.js.map
