"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SlashAndTowerReward = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class SlashAndTowerReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get BelongToSeason() {
    return this.belongtoseason();
  }
  get SumScore() {
    return this.sumscore();
  }
  get RewardId() {
    return this.rewardid();
  }
  get Desc() {
    return this.desc();
  }
  get EndLessReward() {
    return this.endlessreward();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsSlashAndTowerReward(t, s) {
    return (s || new SlashAndTowerReward()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  belongtoseason() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sumscore() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rewardid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  endlessreward() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.SlashAndTowerReward = SlashAndTowerReward;
//# sourceMappingURL=SlashAndTowerReward.js.map
