"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Communicate = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class Communicate {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get DescText() {
    return this.desctext();
  }
  get Talker() {
    return this.talker();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsCommunicate(t, e) {
    return (e || new Communicate()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  desctext(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  talker() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.Communicate = Communicate;
//# sourceMappingURL=Communicate.js.map
