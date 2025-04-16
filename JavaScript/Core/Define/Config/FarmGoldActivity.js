"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FarmGoldActivity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FarmGoldActivity {
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
  get EntranceId() {
    return this.entranceid();
  }
  get GroupId() {
    return this.groupid();
  }
  get SortId() {
    return this.sortid();
  }
  get PassScore() {
    return this.passscore();
  }
  get LevelRewardDesc() {
    return this.levelrewarddesc();
  }
  get RewardId() {
    return this.rewardid();
  }
  get OpenDay() {
    return this.openday();
  }
  get PreLevel() {
    return this.prelevel();
  }
  get RecommendLevel() {
    return this.recommendlevel();
  }
  get DifficultyOptions() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.difficultyoptionsLength(),
      this.difficultyoptions,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFarmGoldActivity(t, i) {
    return (i || new FarmGoldActivity()).__init(
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
  entranceid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  passscore() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  levelrewarddesc(t) {
    var i = this.J7.__offset(this.z7, 18),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  rewardid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  openday() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  prelevel() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  recommendlevel() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetDifficultyoptionsAt(t) {
    return this.difficultyoptions(t);
  }
  difficultyoptions(t) {
    var i = this.J7.__offset(this.z7, 28);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  difficultyoptionsLength() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  difficultyoptionsArray() {
    var t = this.J7.__offset(this.z7, 28);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.FarmGoldActivity = FarmGoldActivity;
//# sourceMappingURL=FarmGoldActivity.js.map
