"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestRefVideoConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class QuestRefVideoConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get QuestId() {
    return this.questid();
  }
  get GirlOrBoy() {
    return this.girlorboy();
  }
  get PakName() {
    return this.pakname();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsQuestRefVideoConfig(t, e) {
    return (e || new QuestRefVideoConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  questid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  girlorboy() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  pakname(t) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.QuestRefVideoConfig = QuestRefVideoConfig;
//# sourceMappingURL=QuestRefVideoConfig.js.map
