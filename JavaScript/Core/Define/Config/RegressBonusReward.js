"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RegressBonusReward = void 0);
class RegressBonusReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Grade() {
    return this.grade();
  }
  get NeedScore() {
    return this.needscore();
  }
  get Drop() {
    return this.drop();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRegressBonusReward(t, s) {
    return (s || new RegressBonusReward()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  grade() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  needscore() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  drop() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RegressBonusReward = RegressBonusReward;
//# sourceMappingURL=RegressBonusReward.js.map
