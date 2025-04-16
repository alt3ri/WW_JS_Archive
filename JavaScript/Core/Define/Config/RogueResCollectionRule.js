"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResCollectionRule = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResCollectionRule {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get Seasons() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.seasonsLength(),
      this.seasons,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRogueResCollectionRule(t, s) {
    return (s || new RogueResCollectionRule()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetSeasonsAt(t) {
    return this.seasons(t);
  }
  seasons(t) {
    var s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  seasonsLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  seasonsArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.RogueResCollectionRule = RogueResCollectionRule;
//# sourceMappingURL=RogueResCollectionRule.js.map
