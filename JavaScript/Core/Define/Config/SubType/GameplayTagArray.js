"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayTagArray = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils");
class GameplayTagArray {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get ArrayString() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.arraystringLength(),
      this.arraystring,
      this,
    );
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsGameplayTagArray(t, r) {
    return (r || new GameplayTagArray()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  GetArraystringAt(t) {
    return this.arraystring(t);
  }
  arraystring(t, r) {
    var s = this.J7.__offset(this.z7, 4),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, r) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  arraystringLength() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.GameplayTagArray = GameplayTagArray;
//# sourceMappingURL=GameplayTagArray.js.map
