"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushBuff = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BossRushBuff {
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
  get PassiveSkill() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.passiveskillLength(),
      this.passiveskill,
      this,
    );
  }
  get Texture() {
    return this.texture();
  }
  get Name() {
    return this.name();
  }
  get PopDescIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.popdescidlistLength(),
      this.popdescidlist,
      this,
    );
  }
  get BuffTitle() {
    return this.bufftitle();
  }
  get BuffDesc() {
    return this.buffdesc();
  }
  get BuffDescParam() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffdescparamLength(),
      this.buffdescparam,
      this,
    );
  }
  get Description() {
    return this.description();
  }
  get DescriptionParam() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.descriptionparamLength(),
      this.descriptionparam,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsBossRushBuff(t, s) {
    return (s || new BossRushBuff()).__init(
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
    var s = this.J7.__offset(this.z7, 6);
    return s
      ? this.J7.readInt64(this.J7.__vector(this.z7 + s) + 8 * t)
      : BigInt(0);
  }
  buffidLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetPassiveskillAt(t) {
    return this.passiveskill(t);
  }
  passiveskill(t) {
    var s = this.J7.__offset(this.z7, 8);
    return s
      ? this.J7.readInt64(this.J7.__vector(this.z7 + s) + 8 * t)
      : BigInt(0);
  }
  passiveskillLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  texture(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetPopdescidlistAt(t) {
    return this.popdescidlist(t);
  }
  popdescidlist(t) {
    var s = this.J7.__offset(this.z7, 14);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  popdescidlistLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  popdescidlistArray() {
    var t = this.J7.__offset(this.z7, 14);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  bufftitle(t) {
    var s = this.J7.__offset(this.z7, 16),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  buffdesc(t) {
    var s = this.J7.__offset(this.z7, 18),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetBuffdescparamAt(t) {
    return this.buffdescparam(t);
  }
  buffdescparam(t, s) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  buffdescparamLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  description(t) {
    var s = this.J7.__offset(this.z7, 22),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetDescriptionparamAt(t) {
    return this.descriptionparam(t);
  }
  descriptionparam(t, s) {
    var i = this.J7.__offset(this.z7, 24),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  descriptionparamLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.BossRushBuff = BossRushBuff;
//# sourceMappingURL=BossRushBuff.js.map
