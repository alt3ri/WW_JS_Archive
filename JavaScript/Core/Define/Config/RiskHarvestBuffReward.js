"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RiskHarvestBuffReward = void 0);
class RiskHarvestBuffReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get BuffType() {
    return this.bufftype();
  }
  get Count() {
    return this.count();
  }
  get Reward() {
    return this.reward();
  }
  get Desc() {
    return this.desc();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRiskHarvestBuffReward(t, s) {
    return (s || new RiskHarvestBuffReward()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  bufftype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  count() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reward() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 12);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
}
exports.RiskHarvestBuffReward = RiskHarvestBuffReward;
//# sourceMappingURL=RiskHarvestBuffReward.js.map
