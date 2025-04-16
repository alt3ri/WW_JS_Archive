"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerLevel = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BabelTowerLevel {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get InstId() {
    return this.instid();
  }
  get IsDifficult() {
    return this.isdifficult();
  }
  get NameText() {
    return this.nametext();
  }
  get DesText() {
    return this.destext();
  }
  get Texture() {
    return this.texture();
  }
  get OpenDay() {
    return this.openday();
  }
  get FixBabelDeTermds() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.fixbabeldetermdsLength(),
      this.fixbabeldetermds,
      this,
    );
  }
  get OptionalBabelBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.optionalbabelbuffLength(),
      this.optionalbabelbuff,
      this,
    );
  }
  get OptionalBabelBuffNum() {
    return this.optionalbabelbuffnum();
  }
  get PassStar() {
    return this.passstar();
  }
  get ReviveStar() {
    return this.revivestar();
  }
  get ReviveBuffId() {
    return this.revivebuffid();
  }
  get BabelTowerDeTermMutexArray() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.babeltowerdetermmutexarrayLength(),
      this.babeltowerdetermmutexarray,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsBabelTowerLevel(t, i) {
    return (i || new BabelTowerLevel()).__init(
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
  instid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  isdifficult() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  nametext(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  destext(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  texture(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  openday() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetFixbabeldetermdsAt(t) {
    return this.fixbabeldetermds(t);
  }
  fixbabeldetermds(t) {
    var i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  fixbabeldetermdsLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  fixbabeldetermdsArray() {
    var t = this.J7.__offset(this.z7, 20);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetOptionalbabelbuffAt(t) {
    return this.optionalbabelbuff(t);
  }
  optionalbabelbuff(t) {
    var i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  optionalbabelbuffLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  optionalbabelbuffArray() {
    var t = this.J7.__offset(this.z7, 22);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  optionalbabelbuffnum() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  passstar() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  revivestar() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  revivebuffid() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetBabeltowerdetermmutexarrayAt(t) {
    return this.babeltowerdetermmutexarray(t);
  }
  babeltowerdetermmutexarray(t) {
    var i = this.J7.__offset(this.z7, 32);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  babeltowerdetermmutexarrayLength() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  babeltowerdetermmutexarrayArray() {
    var t = this.J7.__offset(this.z7, 32);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.BabelTowerLevel = BabelTowerLevel;
//# sourceMappingURL=BabelTowerLevel.js.map
