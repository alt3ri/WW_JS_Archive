"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonCustom = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class SkillButtonCustom {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get TagIds() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.tagidsLength(),
      this.tagids,
      this,
    );
  }
  get BuffIds() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffidsLength(),
      this.buffids,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsSkillButtonCustom(t, s) {
    return (s || new SkillButtonCustom()).__init(
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
  GetTagidsAt(t) {
    return this.tagids(t);
  }
  tagids(t) {
    var s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  tagidsLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  tagidsArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetBuffidsAt(t) {
    return this.buffids(t);
  }
  buffids(t) {
    var s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.readFloat64(this.J7.__vector(this.z7 + s) + 8 * t) : 0;
  }
  buffidsLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  buffidsArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t
      ? new Float64Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.SkillButtonCustom = SkillButtonCustom;
//# sourceMappingURL=SkillButtonCustom.js.map
