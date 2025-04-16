"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueWhiteCatReward = void 0);
class RogueWhiteCatReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get NeedEnergy() {
    return this.needenergy();
  }
  get ConditionGroupId() {
    return this.conditiongroupid();
  }
  get DropId() {
    return this.dropid();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRogueWhiteCatReward(t, e) {
    return (e || new RogueWhiteCatReward()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  needenergy() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  conditiongroupid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RogueWhiteCatReward = RogueWhiteCatReward;
//# sourceMappingURL=RogueWhiteCatReward.js.map
