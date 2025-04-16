"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RiskHarvestInst = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  IntPair_1 = require("./SubType/IntPair");
class RiskHarvestInst {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get InstanceID() {
    return this.instanceid();
  }
  get UnlockDay() {
    return this.unlockday();
  }
  get UnlockInst() {
    return this.unlockinst();
  }
  get UnlockScore() {
    return this.unlockscore();
  }
  get RewardScore() {
    return this.rewardscore();
  }
  get MaxScore() {
    return this.maxscore();
  }
  get HarvestBuff() {
    return this.harvestbuff();
  }
  get Reward() {
    return this.reward();
  }
  get Difficulty() {
    return this.difficulty();
  }
  get DifficultyName() {
    return this.difficultyname();
  }
  get MonsterRatio() {
    return this.monsterratio();
  }
  get TimePointName() {
    return this.timepointname();
  }
  get ScorePointName() {
    return this.scorepointname();
  }
  get TimeScoreValidName() {
    return this.timescorevalidname();
  }
  get MaxTimeScore() {
    return this.maxtimescore();
  }
  get StarRewardList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.starrewardlistLength(),
      this.starrewardlist,
      this,
    );
  }
  get Accumulate() {
    return this.accumulate();
  }
  get Desc() {
    return this.desc();
  }
  get StarRewardDesc() {
    return this.starrewarddesc();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRiskHarvestInst(t, i) {
    return (i || new RiskHarvestInst()).__init(
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
  instanceid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlockday() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlockinst() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlockscore() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rewardscore() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxscore() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  harvestbuff() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reward() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  difficulty() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  difficultyname(t) {
    var i = this.J7.__offset(this.z7, 26),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  monsterratio(t) {
    var i = this.J7.__offset(this.z7, 28),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  timepointname(t) {
    var i = this.J7.__offset(this.z7, 30),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  scorepointname(t) {
    var i = this.J7.__offset(this.z7, 32),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  timescorevalidname(t) {
    var i = this.J7.__offset(this.z7, 34),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  maxtimescore() {
    var t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetStarrewardlistAt(t, i) {
    return this.starrewardlist(t);
  }
  starrewardlist(t, i) {
    var s = this.J7.__offset(this.z7, 38);
    return s
      ? (i || new IntPair_1.IntPair()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  starrewardlistLength() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  accumulate() {
    var t = this.J7.__offset(this.z7, 40);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 42),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  starrewarddesc(t) {
    var i = this.J7.__offset(this.z7, 44),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.RiskHarvestInst = RiskHarvestInst;
//# sourceMappingURL=RiskHarvestInst.js.map
