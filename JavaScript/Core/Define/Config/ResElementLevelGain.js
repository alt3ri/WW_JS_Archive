"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResElementLevelGain = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ResElementLevelGain {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get TargetType() {
    return this.targettype();
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
  static getRootAsResElementLevelGain(t, s) {
    return (s || new ResElementLevelGain()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  targettype() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  buffid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readFloat64(this.z7 + t) : 0;
  }
  GetAddbuffsAt(t) {
    return this.addbuffs(t);
  }
  addbuffs(t) {
    var s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.readFloat64(this.J7.__vector(this.z7 + s) + 8 * t) : 0;
  }
  addbuffsLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  addbuffsArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Float64Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  textid(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetTextidargsAt(t) {
    return this.textidargs(t);
  }
  textidargs(t, s) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, s) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  textidargsLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.ResElementLevelGain = ResElementLevelGain;
//# sourceMappingURL=ResElementLevelGain.js.map
