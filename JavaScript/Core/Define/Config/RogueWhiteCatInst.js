"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueWhiteCatInst = void 0);
class RogueWhiteCatInst {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get InstId() {
    return this.instid();
  }
  get ConditionGroupId() {
    return this.conditiongroupid();
  }
  get UnlockDay() {
    return this.unlockday();
  }
  get TrialRoleId() {
    return this.trialroleid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRogueWhiteCatInst(t, i) {
    return (i || new RogueWhiteCatInst()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  instid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  conditiongroupid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlockday() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  trialroleid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RogueWhiteCatInst = RogueWhiteCatInst;
//# sourceMappingURL=RogueWhiteCatInst.js.map
