"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowTowerLevelsRe = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MowTowerLevelsRe {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get GroupId() {
    return this.groupid();
  }
  get InstIds() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.instidsLength(),
      this.instids,
      this,
    );
  }
  get SortId() {
    return this.sortid();
  }
  get BuffCount() {
    return this.buffcount();
  }
  get OptionalBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.optionalbuffLength(),
      this.optionalbuff,
      this,
    );
  }
  get OpenDay() {
    return this.openday();
  }
  get PreLevel() {
    return this.prelevel();
  }
  get PassScore() {
    return this.passscore();
  }
  get LevelRewardDesc() {
    return this.levelrewarddesc();
  }
  get MowTowerLevel() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.mowtowerlevelLength(),
      this.mowtowerlevel,
      this,
    );
  }
  get RewardName() {
    return this.rewardname();
  }
  get RewardTexture() {
    return this.rewardtexture();
  }
  get LevelDesc() {
    return this.leveldesc();
  }
  get NormalTexture() {
    return this.normaltexture();
  }
  get LockTexture() {
    return this.locktexture();
  }
  get LevelTips() {
    return this.leveltips();
  }
  get IsInfinite() {
    return this.isinfinite();
  }
  get MonsterDes() {
    return this.monsterdes();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsMowTowerLevelsRe(t, s) {
    return (s || new MowTowerLevelsRe()).__init(
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
  groupid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetInstidsAt(t) {
    return this.instids(t);
  }
  instids(t) {
    var s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  instidsLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  instidsArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  buffcount() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetOptionalbuffAt(t) {
    return this.optionalbuff(t);
  }
  optionalbuff(t) {
    var s = this.J7.__offset(this.z7, 16);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  optionalbuffLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  optionalbuffArray() {
    var t = this.J7.__offset(this.z7, 16);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  openday() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  prelevel() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  passscore() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  levelrewarddesc(t) {
    var s = this.J7.__offset(this.z7, 24),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetMowtowerlevelAt(t) {
    return this.mowtowerlevel(t);
  }
  mowtowerlevel(t) {
    var s = this.J7.__offset(this.z7, 26);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  mowtowerlevelLength() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  mowtowerlevelArray() {
    var t = this.J7.__offset(this.z7, 26);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  rewardname(t) {
    var s = this.J7.__offset(this.z7, 28),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  rewardtexture(t) {
    var s = this.J7.__offset(this.z7, 30),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  leveldesc(t) {
    var s = this.J7.__offset(this.z7, 32),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  normaltexture(t) {
    var s = this.J7.__offset(this.z7, 34),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  locktexture(t) {
    var s = this.J7.__offset(this.z7, 36),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  leveltips(t) {
    var s = this.J7.__offset(this.z7, 38),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  isinfinite() {
    var t = this.J7.__offset(this.z7, 40);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  monsterdes(t) {
    var s = this.J7.__offset(this.z7, 42),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.MowTowerLevelsRe = MowTowerLevelsRe;
//# sourceMappingURL=MowTowerLevelsRe.js.map
