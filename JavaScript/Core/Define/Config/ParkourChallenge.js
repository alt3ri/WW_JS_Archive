"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ParkourChallenge = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  IntPair_1 = require("./SubType/IntPair");
class ParkourChallenge {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get MarkId() {
    return this.markid();
  }
  get BackGroundTexture() {
    return this.backgroundtexture();
  }
  get Title() {
    return this.title();
  }
  get LevelPlayId() {
    return this.levelplayid();
  }
  get Rewards() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.rewardsLength(),
      this.rewardsKey,
      this.rewardsValue,
      this,
    );
  }
  rewardsKey(t) {
    return this.rewards(t)?.key();
  }
  rewardsValue(t) {
    return this.rewards(t)?.value();
  }
  get RewardList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.rewardlistLength(),
      this.rewardlist,
      this,
    );
  }
  get LocationEntityConfigId() {
    return this.locationentityconfigid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsParkourChallenge(t, i) {
    return (i || new ParkourChallenge()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  markid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  backgroundtexture(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  title(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  levelplayid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetRewardsAt(t, i) {
    return this.rewards(t);
  }
  rewards(t, i) {
    var r = this.J7.__offset(this.z7, 14);
    return r
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  rewardsLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetRewardlistAt(t, i) {
    return this.rewardlist(t);
  }
  rewardlist(t, i) {
    var r = this.J7.__offset(this.z7, 16);
    return r
      ? (i || new IntPair_1.IntPair()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  rewardlistLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  locationentityconfigid() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.ParkourChallenge = ParkourChallenge;
//# sourceMappingURL=ParkourChallenge.js.map
