"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingActivityMilestone = void 0);
class FishingActivityMilestone {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get ItemNum() {
    return this.itemnum();
  }
  get DropId() {
    return this.dropid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFishingActivityMilestone(t, i) {
    return (i || new FishingActivityMilestone()).__init(
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
  itemnum() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.FishingActivityMilestone = FishingActivityMilestone;
//# sourceMappingURL=FishingActivityMilestone.js.map
