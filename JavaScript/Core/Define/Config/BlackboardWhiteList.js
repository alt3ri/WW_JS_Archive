"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackboardWhiteList = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BlackboardWhiteList {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Key() {
    return this.key();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsBlackboardWhiteList(t, s) {
    return (s || new BlackboardWhiteList()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  key(t) {
    var s = this.J7.__offset(this.z7, 4),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.BlackboardWhiteList = BlackboardWhiteList;
//# sourceMappingURL=BlackboardWhiteList.js.map
