"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SlashAndTowerCfg = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class SlashAndTowerCfg {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Season() {
    return this.season();
  }
  get EndLess() {
    return this.endless();
  }
  get InstIds() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.instidsLength(),
      this.instids,
      this,
    );
  }
  get PreLevel() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.prelevelLength(),
      this.prelevel,
      this,
    );
  }
  get PassScore() {
    return this.passscore();
  }
  get LevelPassReward() {
    return this.levelpassreward();
  }
  get Title() {
    return this.title();
  }
  get Desc() {
    return this.desc();
  }
  get TargetScore() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.targetscoreLength(),
      this.targetscore,
      this,
    );
  }
  get ScoreStage() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.scorestageLength(),
      this.scorestage,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsSlashAndTowerCfg(t, s) {
    return (s || new SlashAndTowerCfg()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  season() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  endless() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
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
  GetPrelevelAt(t) {
    return this.prelevel(t);
  }
  prelevel(t) {
    var s = this.J7.__offset(this.z7, 12);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  prelevelLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  prelevelArray() {
    var t = this.J7.__offset(this.z7, 12);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  passscore() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  levelpassreward() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  title(t) {
    var s = this.J7.__offset(this.z7, 18),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 20),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetTargetscoreAt(t) {
    return this.targetscore(t);
  }
  targetscore(t) {
    var s = this.J7.__offset(this.z7, 22);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  targetscoreLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  targetscoreArray() {
    var t = this.J7.__offset(this.z7, 22);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetScorestageAt(t) {
    return this.scorestage(t);
  }
  scorestage(t, s) {
    var i = this.J7.__offset(this.z7, 24),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  scorestageLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.SlashAndTowerCfg = SlashAndTowerCfg;
//# sourceMappingURL=SlashAndTowerCfg.js.map
