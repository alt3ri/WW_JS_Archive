"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConsumptiveTask = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ConsumptiveTask {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get MaxFinishCount() {
    return this.maxfinishcount();
  }
  get RewardScore() {
    return this.rewardscore();
  }
  get TaskTab() {
    return this.tasktab();
  }
  get DesString() {
    return this.desstring();
  }
  get SkipId() {
    return this.skipid();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsConsumptiveTask(t, s) {
    return (s || new ConsumptiveTask()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxfinishcount() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rewardscore() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tasktab() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  desstring(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  skipid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.ConsumptiveTask = ConsumptiveTask;
//# sourceMappingURL=ConsumptiveTask.js.map
