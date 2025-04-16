"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingActivityLimitTask = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FishingActivityLimitTask {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get TaskId() {
    return this.taskid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get TaskName() {
    return this.taskname();
  }
  get SortId() {
    return this.sortid();
  }
  get GroupId() {
    return this.groupid();
  }
  get DropId() {
    return this.dropid();
  }
  get JumpId() {
    return this.jumpid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFishingActivityLimitTask(t, i) {
    return (i || new FishingActivityLimitTask()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  taskid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  taskname(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.FishingActivityLimitTask = FishingActivityLimitTask;
//# sourceMappingURL=FishingActivityLimitTask.js.map
