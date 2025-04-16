"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HiddenBossWindow = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class HiddenBossWindow {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get BossName() {
    return this.bossname();
  }
  get MarkId() {
    return this.markid();
  }
  get IconRefPath() {
    return this.iconrefpath();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsHiddenBossWindow(t, s) {
    return (s || new HiddenBossWindow()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  bossname(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  markid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  iconrefpath(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.HiddenBossWindow = HiddenBossWindow;
//# sourceMappingURL=HiddenBossWindow.js.map
