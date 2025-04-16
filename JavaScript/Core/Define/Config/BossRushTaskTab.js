"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushTaskTab = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BossRushTaskTab {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get TabId() {
    return this.tabid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Texture() {
    return this.texture();
  }
  get TabTitle() {
    return this.tabtitle();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsBossRushTaskTab(t, s) {
    return (s || new BossRushTaskTab()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  tabid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  texture(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  tabtitle(t) {
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
exports.BossRushTaskTab = BossRushTaskTab;
//# sourceMappingURL=BossRushTaskTab.js.map
