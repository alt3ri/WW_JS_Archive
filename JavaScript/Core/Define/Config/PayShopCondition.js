"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopCondition = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PayShopCondition {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ConditionText() {
    return this.conditiontext();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsPayShopCondition(t, i) {
    return (i || new PayShopCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  conditiontext(t) {
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
exports.PayShopCondition = PayShopCondition;
//# sourceMappingURL=PayShopCondition.js.map
