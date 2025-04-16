"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGym = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class LordGym {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Difficulty() {
    return this.difficulty();
  }
  get RewardId() {
    return this.rewardid();
  }
  get PlayId() {
    return this.playid();
  }
  get GymTitle() {
    return this.gymtitle();
  }
  get NewGymTitle() {
    return this.newgymtitle();
  }
  get IconPath() {
    return this.iconpath();
  }
  get PlayDescription() {
    return this.playdescription();
  }
  get HelpId() {
    return this.helpid();
  }
  get MonsterList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.monsterlistLength(),
      this.monsterlist,
      this,
    );
  }
  get MonsterLevel() {
    return this.monsterlevel();
  }
  get LockCon() {
    return this.lockcon();
  }
  get LockDescription() {
    return this.lockdescription();
  }
  get FilterType() {
    return this.filtertype();
  }
  get IsNew() {
    return this.isnew();
  }
  get IsDebug() {
    return this.isdebug();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsLordGym(t, i) {
    return (i || new LordGym()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  difficulty() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  rewardid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  playid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  gymtitle(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  newgymtitle(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  iconpath(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  playdescription(t) {
    var i = this.J7.__offset(this.z7, 18),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  helpid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetMonsterlistAt(t) {
    return this.monsterlist(t);
  }
  monsterlist(t) {
    var i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  monsterlistLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  monsterlistArray() {
    var t = this.J7.__offset(this.z7, 22);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  monsterlevel() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  lockcon() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  lockdescription(t) {
    var i = this.J7.__offset(this.z7, 28),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  filtertype() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  isnew() {
    var t = this.J7.__offset(this.z7, 32);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isdebug() {
    var t = this.J7.__offset(this.z7, 34);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.LordGym = LordGym;
//# sourceMappingURL=LordGym.js.map
