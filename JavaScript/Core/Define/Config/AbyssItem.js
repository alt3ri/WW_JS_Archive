"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AbyssItem = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  ConfigPropValue_1 = require("./SubType/ConfigPropValue"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  StringArray_1 = require("./SubType/StringArray");
class AbyssItem {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get SlotType() {
    return this.slottype();
  }
  get QualityId() {
    return this.qualityid();
  }
  get BelongLittleRole() {
    return this.belonglittlerole();
  }
  get PassiveBuffShowName() {
    return this.passivebuffshowname();
  }
  get PassiveBuffShowDesc() {
    return this.passivebuffshowdesc();
  }
  get LevelDescStrArray() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.leveldescstrarrayLength(),
      this.leveldescstrarray,
      this,
    );
  }
  get AbyssBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.abyssbuffLength(),
      this.abyssbuff,
      this,
    );
  }
  get AbyssPhantomBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.abyssphantombuffLength(),
      this.abyssphantombuff,
      this,
    );
  }
  get Prop() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.propLength(),
      this.prop,
      this,
    );
  }
  get AttributesDescription() {
    return this.attributesdescription();
  }
  get AddTag() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.addtagLength(),
      this.addtagKey,
      this.addtagValue,
      this,
    );
  }
  addtagKey(t) {
    return this.addtag(t)?.key();
  }
  addtagValue(t) {
    return this.addtag(t)?.value();
  }
  get CertainTag() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.certaintagLength(),
      this.certaintagKey,
      this.certaintagValue,
      this,
    );
  }
  certaintagKey(t) {
    return this.certaintag(t)?.key();
  }
  certaintagValue(t) {
    return this.certaintag(t)?.value();
  }
  get AddProp() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.addpropLength(),
      this.addprop,
      this,
    );
  }
  get Name() {
    return this.name();
  }
  get TypeDescription() {
    return this.typedescription();
  }
  get BgDescription() {
    return this.bgdescription();
  }
  get Icon() {
    return this.icon();
  }
  get IconMiddle() {
    return this.iconmiddle();
  }
  get IconSmall() {
    return this.iconsmall();
  }
  get Mesh() {
    return this.mesh();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsAbyssItem(t, s) {
    return (s || new AbyssItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  slottype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  qualityid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  belonglittlerole() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  passivebuffshowname(t) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  passivebuffshowdesc(t) {
    var s = this.J7.__offset(this.z7, 16),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetLeveldescstrarrayAt(t, s) {
    return this.leveldescstrarray(t);
  }
  leveldescstrarray(t, s) {
    var i = this.J7.__offset(this.z7, 18);
    return i
      ? (s || new StringArray_1.StringArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  leveldescstrarrayLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetAbyssbuffAt(t) {
    return this.abyssbuff(t);
  }
  abyssbuff(t) {
    var s = this.J7.__offset(this.z7, 20);
    return s ? this.J7.readFloat64(this.J7.__vector(this.z7 + s) + 8 * t) : 0;
  }
  abyssbuffLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  abyssbuffArray() {
    var t = this.J7.__offset(this.z7, 20);
    return t
      ? new Float64Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetAbyssphantombuffAt(t) {
    return this.abyssphantombuff(t);
  }
  abyssphantombuff(t) {
    var s = this.J7.__offset(this.z7, 22);
    return s ? this.J7.readFloat64(this.J7.__vector(this.z7 + s) + 8 * t) : 0;
  }
  abyssphantombuffLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  abyssphantombuffArray() {
    var t = this.J7.__offset(this.z7, 22);
    return t
      ? new Float64Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetPropAt(t, s) {
    return this.prop(t);
  }
  prop(t, s) {
    var i = this.J7.__offset(this.z7, 24);
    return i
      ? (s || new ConfigPropValue_1.ConfigPropValue()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  propLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  attributesdescription(t) {
    var s = this.J7.__offset(this.z7, 26),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetAddtagAt(t, s) {
    return this.addtag(t);
  }
  addtag(t, s) {
    var i = this.J7.__offset(this.z7, 28);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  addtagLength() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetCertaintagAt(t, s) {
    return this.certaintag(t);
  }
  certaintag(t, s) {
    var i = this.J7.__offset(this.z7, 30);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  certaintagLength() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetAddpropAt(t, s) {
    return this.addprop(t);
  }
  addprop(t, s) {
    var i = this.J7.__offset(this.z7, 32);
    return i
      ? (s || new ConfigPropValue_1.ConfigPropValue()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  addpropLength() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 34),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  typedescription(t) {
    var s = this.J7.__offset(this.z7, 36),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  bgdescription(t) {
    var s = this.J7.__offset(this.z7, 38),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  icon(t) {
    var s = this.J7.__offset(this.z7, 40),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  iconmiddle(t) {
    var s = this.J7.__offset(this.z7, 42),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  iconsmall(t) {
    var s = this.J7.__offset(this.z7, 44),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  mesh(t) {
    var s = this.J7.__offset(this.z7, 46),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.AbyssItem = AbyssItem;
//# sourceMappingURL=AbyssItem.js.map
