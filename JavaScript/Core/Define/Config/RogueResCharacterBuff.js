"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResCharacterBuff = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResCharacterBuff {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get BuffId() {
    return this.buffid();
  }
  get BuffIds() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffidsLength(),
      this.buffids,
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
  get AffixTitle() {
    return this.affixtitle();
  }
  get AffixIcon() {
    return this.affixicon();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRogueResCharacterBuff(t, s) {
    return (s || new RogueResCharacterBuff()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  buffid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readFloat64(this.z7 + t) : 0;
  }
  GetBuffidsAt(t) {
    return this.buffids(t);
  }
  buffids(t) {
    var s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.readFloat64(this.J7.__vector(this.z7 + s) + 8 * t) : 0;
  }
  buffidsLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  buffidsArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Float64Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  affixdesc(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetAffixdescparamAt(t) {
    return this.affixdescparam(t);
  }
  affixdescparam(t, s) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  affixdescparamLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  affixdescsimple(t) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  affixtitle(t) {
    var s = this.J7.__offset(this.z7, 16),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  affixicon(t) {
    var s = this.J7.__offset(this.z7, 18),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.RogueResCharacterBuff = RogueResCharacterBuff;
//# sourceMappingURL=RogueResCharacterBuff.js.map
