"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RegressSignReward = void 0);
class RegressSignReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Grade() {
    return this.grade();
  }
  get SignDayNum() {
    return this.signdaynum();
  }
  get SignReward() {
    return this.signreward();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRegressSignReward(t, s) {
    return (s || new RegressSignReward()).__init(
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
  grade() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  signdaynum() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  signreward() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RegressSignReward = RegressSignReward;
//# sourceMappingURL=RegressSignReward.js.map
