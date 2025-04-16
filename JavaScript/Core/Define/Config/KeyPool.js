"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeyPool = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class KeyPool {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ValidKeys() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.validkeysLength(),
      this.validkeys,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsKeyPool(t, s) {
    return (s || new KeyPool()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id(t) {
    var s = this.J7.__offset(this.z7, 4),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetValidkeysAt(t) {
    return this.validkeys(t);
  }
  validkeys(t, s) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  validkeysLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.KeyPool = KeyPool;
//# sourceMappingURL=KeyPool.js.map
