"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreActivityTask = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ExploreActivityTask {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get TaskId() {
    return this.taskid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get DropId() {
    return this.dropid();
  }
  get Desc() {
    return this.desc();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsExploreActivityTask(t, i) {
    return (i || new ExploreActivityTask()).__init(
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
  dropid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.ExploreActivityTask = ExploreActivityTask;
//# sourceMappingURL=ExploreActivityTask.js.map
