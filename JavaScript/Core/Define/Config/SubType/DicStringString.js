"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DicStringString = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils");
class DicStringString {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsDicStringString(t, i) {
    return (i || new DicStringString()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  key(t) {
    var i = this.J7.__offset(this.z7, 4),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  value(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.DicStringString = DicStringString;
//# sourceMappingURL=DicStringString.js.map
