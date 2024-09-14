"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RiskHarvestInst = void 0);
class RiskHarvestInst {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get InstanceID() {
    return this.instanceid();
  }
  get ActivityId() {
    return this.activityid();
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
  get Desc() {
    return this.desc();
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
  instanceid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  activityid() {
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
  maxscore() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  harvestbuff() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reward() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  difficulty() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  difficultyname(t) {
    var i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  monsterratio(t) {
    var i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  timepointname(t) {
    var i = this.J7.__offset(this.z7, 28);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  scorepointname(t) {
    var i = this.J7.__offset(this.z7, 30);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  timescorevalidname(t) {
    var i = this.J7.__offset(this.z7, 32);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 34);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
}
exports.RiskHarvestInst = RiskHarvestInst;
//# sourceMappingURL=RiskHarvestInst.js.map
