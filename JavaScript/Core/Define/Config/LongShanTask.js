"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongShanTask = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class LongShanTask {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get TaskId() {
    return this.taskid();
  }
  get StageId() {
    return this.stageid();
  }
  get TaskName() {
    return this.taskname();
  }
  get SortId() {
    return this.sortid();
  }
  get TaskReward() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.taskrewardLength(),
      this.taskrewardKey,
      this.taskrewardValue,
      this,
    );
  }
  taskrewardKey(t) {
    return this.taskreward(t)?.key();
  }
  taskrewardValue(t) {
    return this.taskreward(t)?.value();
  }
  get JumpId() {
    return this.jumpid();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsLongShanTask(t, s) {
    return (s || new LongShanTask()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  taskid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  stageid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  taskname(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetTaskrewardAt(t, s) {
    return this.taskreward(t);
  }
  taskreward(t, s) {
    var i = this.J7.__offset(this.z7, 12);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  taskrewardLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.LongShanTask = LongShanTask;
//# sourceMappingURL=LongShanTask.js.map
