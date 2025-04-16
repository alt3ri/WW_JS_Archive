"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueWeeklyReward = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueWeeklyReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get CycleId() {
    return this.cycleid();
  }
  get TargetName() {
    return this.targetname();
  }
  get TargetReward() {
    return this.targetreward();
  }
  get Score() {
    return this.score();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRogueWeeklyReward(t, e) {
    return (e || new RogueWeeklyReward()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  cycleid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  targetname(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  targetreward() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  score() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RogueWeeklyReward = RogueWeeklyReward;
//# sourceMappingURL=RogueWeeklyReward.js.map
