"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SummonCfg = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class SummonCfg {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get BlueprintType() {
    return this.blueprinttype();
  }
  get SurvivalTime() {
    return this.survivaltime();
  }
  get InheritLevelType() {
    return this.inheritleveltype();
  }
  get InheritLevelParam() {
    return this.inheritlevelparam();
  }
  get AttributeType() {
    return this.attributetype();
  }
  get InheritAttributeBaseType() {
    return this.inheritattributebasetype();
  }
  get InheritSummonerAttribute() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.inheritsummonerattributeLength(),
      this.inheritsummonerattributeKey,
      this.inheritsummonerattributeValue,
      this,
    );
  }
  inheritsummonerattributeKey(t) {
    return this.inheritsummonerattribute(t)?.key();
  }
  inheritsummonerattributeValue(t) {
    return this.inheritsummonerattribute(t)?.value();
  }
  get UnCalculateBuffAttributes() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.uncalculatebuffattributesLength(),
      this.uncalculatebuffattributes,
      this,
    );
  }
  get FollowSummonerAttr() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.followsummonerattrLength(),
      this.followsummonerattr,
      this,
    );
  }
  get BornBuffId() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bornbuffidLength(),
      this.bornbuffid,
      this,
    );
  }
  get ShareDamage() {
    return this.sharedamage();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsSummonCfg(t, i) {
    return (i || new SummonCfg()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  blueprinttype(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  survivaltime() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 3;
  }
  inheritleveltype() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  inheritlevelparam() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  attributetype() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  inheritattributebasetype() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetInheritsummonerattributeAt(t, i) {
    return this.inheritsummonerattribute(t);
  }
  inheritsummonerattribute(t, i) {
    var r = this.J7.__offset(this.z7, 18);
    return r
      ? (i || new DicIntIntArray_1.DicIntIntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  inheritsummonerattributeLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetUncalculatebuffattributesAt(t) {
    return this.uncalculatebuffattributes(t);
  }
  uncalculatebuffattributes(t) {
    var i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  uncalculatebuffattributesLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  uncalculatebuffattributesArray() {
    var t = this.J7.__offset(this.z7, 20);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetFollowsummonerattrAt(t) {
    return this.followsummonerattr(t);
  }
  followsummonerattr(t) {
    var i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  followsummonerattrLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  followsummonerattrArray() {
    var t = this.J7.__offset(this.z7, 22);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetBornbuffidAt(t) {
    return this.bornbuffid(t);
  }
  bornbuffid(t) {
    var i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.readFloat64(this.J7.__vector(this.z7 + i) + 8 * t) : 0;
  }
  bornbuffidLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  bornbuffidArray() {
    var t = this.J7.__offset(this.z7, 24);
    return t
      ? new Float64Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  sharedamage() {
    var t = this.J7.__offset(this.z7, 26);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.SummonCfg = SummonCfg;
//# sourceMappingURL=SummonCfg.js.map
