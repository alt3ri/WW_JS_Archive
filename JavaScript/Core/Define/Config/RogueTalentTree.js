"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueTalentTree = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueTalentTree {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SeasonId() {
    return this.seasonid();
  }
  get Column() {
    return this.column();
  }
  get Row() {
    return this.row();
  }
  get PostId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.postidLength(), (t) =>
      this.postid(t),
    );
  }
  get Condition() {
    return this.condition();
  }
  get Consule() {
    return GameUtils_1.GameUtils.ConvertToArray(this.consuleLength(), (t) =>
      this.consule(t),
    );
  }
  get Describe() {
    return this.describe();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRogueTalentTree(t, s) {
    return (s || new RogueTalentTree()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  seasonid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  column() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  row() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetPostidAt(t) {
    return this.postid(t);
  }
  postid(t) {
    const s = this.J7.__offset(this.z7, 12);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  postidLength() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  postidArray() {
    const t = this.J7.__offset(this.z7, 12);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  condition() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetConsuleAt(t) {
    return this.consule(t);
  }
  consule(t) {
    const s = this.J7.__offset(this.z7, 16);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  consuleLength() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  consuleArray() {
    const t = this.J7.__offset(this.z7, 16);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  describe() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RogueTalentTree = RogueTalentTree;
// # sourceMappingURL=RogueTalentTree.js.map
