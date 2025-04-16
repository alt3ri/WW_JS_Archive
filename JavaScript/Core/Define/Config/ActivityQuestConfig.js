"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityQuestConfig = void 0);
class ActivityQuestConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get QuestId() {
    return this.questid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get ConditionId() {
    return this.conditionid();
  }
  get OpenDay() {
    return this.openday();
  }
  get IsDisplay() {
    return this.isdisplay();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsActivityQuestConfig(t, i) {
    return (i || new ActivityQuestConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  questid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  openday() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  isdisplay() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.ActivityQuestConfig = ActivityQuestConfig;
//# sourceMappingURL=ActivityQuestConfig.js.map
