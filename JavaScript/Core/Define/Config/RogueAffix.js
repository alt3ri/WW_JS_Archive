"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueAffix = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueAffix {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get BuffId() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffidLength(),
      this.buffid,
      this,
    );
  }
  get AffixDesc() {
    return this.affixdesc();
  }
  get AffixDescParam() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.affixdescparamLength(),
      this.affixdescparam,
      this,
    );
  }
  get AffixDescSimple() {
    return this.affixdescsimple();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRogueAffix(t, i) {
    return (i || new RogueAffix()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetBuffidAt(t) {
    return this.buffid(t);
  }
  buffid(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.readFloat64(this.J7.__vector(this.z7 + i) + 8 * t) : 0;
  }
  buffidLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  buffidArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Float64Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  affixdesc(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetAffixdescparamAt(t) {
    return this.affixdescparam(t);
  }
  affixdescparam(t, i) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  affixdescparamLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  affixdescsimple(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.RogueAffix = RogueAffix;
//# sourceMappingURL=RogueAffix.js.map
