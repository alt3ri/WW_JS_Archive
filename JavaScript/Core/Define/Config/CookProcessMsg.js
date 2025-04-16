"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookProcessMsg = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class CookProcessMsg {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Description() {
    return this.description();
  }
  get Introduce() {
    return this.introduce();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsCookProcessMsg(t, s) {
    return (s || new CookProcessMsg()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  description(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  introduce(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.CookProcessMsg = CookProcessMsg;
//# sourceMappingURL=CookProcessMsg.js.map
