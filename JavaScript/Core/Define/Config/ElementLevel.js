"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ElementLevel = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ElementLevel {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Level() {
    return this.level();
  }
  get BuffId() {
    return this.buffid();
  }
  get AddBuffs() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.addbuffsLength(),
      this.addbuffs,
      this,
    );
  }
  get TextId() {
    return this.textid();
  }
  get TextIdArgs() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.textidargsLength(),
      this.textidargs,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsElementLevel(t, s) {
    return (s || new ElementLevel()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  level() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  buffid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt64(this.z7 + t) : BigInt("0");
  }
  GetAddbuffsAt(t) {
    return this.addbuffs(t);
  }
  addbuffs(t) {
    var s = this.J7.__offset(this.z7, 8);
    return s
      ? this.J7.readInt64(this.J7.__vector(this.z7 + s) + 8 * t)
      : BigInt(0);
  }
  addbuffsLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  textid(t) {
    var s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  GetTextidargsAt(t) {
    return this.textidargs(t);
  }
  textidargs(t, s) {
    var e = this.J7.__offset(this.z7, 12);
    return e
      ? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, s)
      : null;
  }
  textidargsLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.ElementLevel = ElementLevel;
//# sourceMappingURL=ElementLevel.js.map
