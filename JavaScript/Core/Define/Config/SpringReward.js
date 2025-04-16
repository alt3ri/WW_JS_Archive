"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpringReward = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class SpringReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get TaskThreshold() {
    return this.taskthreshold();
  }
  get ActivityId() {
    return this.activityid();
  }
  get TaskReward() {
    return this.taskreward();
  }
  get TaskTitle() {
    return this.tasktitle();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsSpringReward(t, s) {
    return (s || new SpringReward()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  taskthreshold() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  taskreward() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tasktitle(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.SpringReward = SpringReward;
//# sourceMappingURL=SpringReward.js.map
