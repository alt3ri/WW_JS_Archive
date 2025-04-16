"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResGridMapType = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicStringInt_1 = require("./SubType/DicStringInt");
class RogueResGridMapType {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get MapType() {
    return this.maptype();
  }
  get GroundPath() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.groundpathLength(),
      this.groundpathKey,
      this.groundpathValue,
      this,
    );
  }
  groundpathKey(t) {
    return this.groundpath(t)?.key();
  }
  groundpathValue(t) {
    return this.groundpath(t)?.value();
  }
  get DecorationPath() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.decorationpathLength(),
      this.decorationpathKey,
      this.decorationpathValue,
      this,
    );
  }
  decorationpathKey(t) {
    return this.decorationpath(t)?.key();
  }
  decorationpathValue(t) {
    return this.decorationpath(t)?.value();
  }
  get ExtraPathList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.extrapathlistLength(),
      this.extrapathlist,
      this,
    );
  }
  get ExtraOffsetList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.extraoffsetlistLength(),
      this.extraoffsetlist,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRogueResGridMapType(t, i) {
    return (i || new RogueResGridMapType()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maptype(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetGroundpathAt(t, i) {
    return this.groundpath(t);
  }
  groundpath(t, i) {
    var s = this.J7.__offset(this.z7, 8);
    return s
      ? (i || new DicStringInt_1.DicStringInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  groundpathLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetDecorationpathAt(t, i) {
    return this.decorationpath(t);
  }
  decorationpath(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    return s
      ? (i || new DicStringInt_1.DicStringInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  decorationpathLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetExtrapathlistAt(t) {
    return this.extrapathlist(t);
  }
  extrapathlist(t, i) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  extrapathlistLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetExtraoffsetlistAt(t) {
    return this.extraoffsetlist(t);
  }
  extraoffsetlist(t) {
    var i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  extraoffsetlistLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  extraoffsetlistArray() {
    var t = this.J7.__offset(this.z7, 14);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.RogueResGridMapType = RogueResGridMapType;
//# sourceMappingURL=RogueResGridMapType.js.map
