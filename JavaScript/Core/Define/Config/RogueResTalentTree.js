"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResTalentTree = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResTalentTree {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SeasonId() {
    return this.seasonid();
  }
  get Condition() {
    return this.condition();
  }
  get Consule() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.consuleLength(),
      this.consule,
      this,
    );
  }
  get Describe() {
    return this.describe();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRogueResTalentTree(t, s) {
    return (s || new RogueResTalentTree()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  seasonid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  condition() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetConsuleAt(t) {
    return this.consule(t);
  }
  consule(t) {
    var s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  consuleLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  consuleArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  describe() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RogueResTalentTree = RogueResTalentTree;
//# sourceMappingURL=RogueResTalentTree.js.map
