"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsReward = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class RacingBetsReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SeasonId() {
    return this.seasonid();
  }
  get Index() {
    return this.index();
  }
  get RewardName() {
    return this.rewardname();
  }
  get ResetType() {
    return this.resettype();
  }
  get RewardType() {
    return this.rewardtype();
  }
  get TargetReward() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.targetrewardLength(),
      this.targetrewardKey,
      this.targetrewardValue,
      this,
    );
  }
  targetrewardKey(t) {
    return this.targetreward(t)?.key();
  }
  targetrewardValue(t) {
    return this.targetreward(t)?.value();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRacingBetsReward(t, e) {
    return (e || new RacingBetsReward()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  seasonid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  index() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rewardname(t) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  resettype() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rewardtype() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetTargetrewardAt(t, e) {
    return this.targetreward(t);
  }
  targetreward(t, e) {
    var r = this.J7.__offset(this.z7, 16);
    return r
      ? (e || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  targetrewardLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.RacingBetsReward = RacingBetsReward;
//# sourceMappingURL=RacingBetsReward.js.map
