"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackCoastThemeTaskRe = void 0);
class BlackCoastThemeTaskRe {
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
  get DropId() {
    return this.dropid();
  }
  get JumpId() {
    return this.jumpid();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsBlackCoastThemeTaskRe(t, s) {
    return (s || new BlackCoastThemeTaskRe()).__init(
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
    var s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.BlackCoastThemeTaskRe = BlackCoastThemeTaskRe;
//# sourceMappingURL=BlackCoastThemeTaskRe.js.map
