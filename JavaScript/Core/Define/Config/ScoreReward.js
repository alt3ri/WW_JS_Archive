"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScoreReward = void 0);
class ScoreReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Score() {
    return this.score();
  }
  get Reward() {
    return this.reward();
  }
  get Desc() {
    return this.desc();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsScoreReward(t, r) {
    return (r || new ScoreReward()).__init(
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
  score() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reward() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  desc(t) {
    var r = this.J7.__offset(this.z7, 12);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
}
exports.ScoreReward = ScoreReward;
//# sourceMappingURL=ScoreReward.js.map
