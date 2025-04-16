"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerDailyTask = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BabelTowerDailyTask {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get TaskId() {
    return this.taskid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get GroupId() {
    return this.groupid();
  }
  get Weight() {
    return this.weight();
  }
  get DropId() {
    return this.dropid();
  }
  get Title() {
    return this.title();
  }
  get ShowDeTerm() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.showdetermLength(),
      this.showdeterm,
      this,
    );
  }
  get ShowBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.showbuffLength(),
      this.showbuff,
      this,
    );
  }
  get JumpToLevelId() {
    return this.jumptolevelid();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsBabelTowerDailyTask(t, s) {
    return (s || new BabelTowerDailyTask()).__init(
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
  groupid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  weight() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  title(t) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetShowdetermAt(t) {
    return this.showdeterm(t);
  }
  showdeterm(t) {
    var s = this.J7.__offset(this.z7, 16);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  showdetermLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  showdetermArray() {
    var t = this.J7.__offset(this.z7, 16);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetShowbuffAt(t) {
    return this.showbuff(t);
  }
  showbuff(t) {
    var s = this.J7.__offset(this.z7, 18);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  showbuffLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  showbuffArray() {
    var t = this.J7.__offset(this.z7, 18);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  jumptolevelid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.BabelTowerDailyTask = BabelTowerDailyTask;
//# sourceMappingURL=BabelTowerDailyTask.js.map
