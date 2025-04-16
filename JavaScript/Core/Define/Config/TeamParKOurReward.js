"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeamParKOurReward = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class TeamParKOurReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Reward() {
    return this.reward();
  }
  get RewardThreshold() {
    return this.rewardthreshold();
  }
  get TaskTitle() {
    return this.tasktitle();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsTeamParKOurReward(t, r) {
    return (r || new TeamParKOurReward()).__init(
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
  reward() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rewardthreshold() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tasktitle(t) {
    var r = this.J7.__offset(this.z7, 12),
      r = r ? this.J7.__string(this.z7 + r, t) : null;
    return (
      "string" == typeof r &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(r),
      r
    );
  }
}
exports.TeamParKOurReward = TeamParKOurReward;
//# sourceMappingURL=TeamParKOurReward.js.map
