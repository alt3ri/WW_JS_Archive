"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TurntableTask = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class TurntableTask {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get TaskId() {
    return this.taskid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get TaskDescription() {
    return this.taskdescription();
  }
  get TaskReward() {
    return this.taskreward();
  }
  get TaskSort() {
    return this.tasksort();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsTurntableTask(t, s) {
    return (s || new TurntableTask()).__init(
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
  taskdescription(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  taskreward() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tasksort() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.TurntableTask = TurntableTask;
//# sourceMappingURL=TurntableTask.js.map
