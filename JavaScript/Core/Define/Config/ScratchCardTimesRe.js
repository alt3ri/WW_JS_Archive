"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScratchCardTimesRe = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ScratchCardTimesRe {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get TaskId() {
    return this.taskid();
  }
  get TaskName() {
    return this.taskname();
  }
  get TaskType() {
    return this.tasktype();
  }
  get TaskTypeName() {
    return this.tasktypename();
  }
  get TaskReward() {
    return this.taskreward();
  }
  get TaskParams() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.taskparamsLength(),
      this.taskparams,
      this,
    );
  }
  get RefreshTimesLimit() {
    return this.refreshtimeslimit();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsScratchCardTimesRe(t, s) {
    return (s || new ScratchCardTimesRe()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  taskid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  taskname(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  tasktype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tasktypename(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  taskreward() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetTaskparamsAt(t) {
    return this.taskparams(t);
  }
  taskparams(t) {
    var s = this.J7.__offset(this.z7, 14);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  taskparamsLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  taskparamsArray() {
    var t = this.J7.__offset(this.z7, 14);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  refreshtimeslimit() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.ScratchCardTimesRe = ScratchCardTimesRe;
//# sourceMappingURL=ScratchCardTimesRe.js.map
