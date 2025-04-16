"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RegressQuest = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RegressQuest {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get TaskType() {
    return this.tasktype();
  }
  get TargetName() {
    return this.targetname();
  }
  get TaskSubType() {
    return this.tasksubtype();
  }
  get AccessPathId() {
    return this.accesspathid();
  }
  get TargetReward() {
    return this.targetreward();
  }
  get ProgressType() {
    return this.progresstype();
  }
  get Grade() {
    return this.grade();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRegressQuest(t, s) {
    return (s || new RegressQuest()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tasktype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 2;
  }
  targetname(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  tasksubtype() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  accesspathid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  targetreward() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  progresstype() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  grade() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
}
exports.RegressQuest = RegressQuest;
//# sourceMappingURL=RegressQuest.js.map
