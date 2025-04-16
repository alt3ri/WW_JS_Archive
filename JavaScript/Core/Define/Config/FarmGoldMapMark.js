"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FarmGoldMapMark = void 0);
class FarmGoldMapMark {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get ActivityId() {
    return this.activityid();
  }
  get MarkId() {
    return this.markid();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsFarmGoldMapMark(t, r) {
    return (r || new FarmGoldMapMark()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  markid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.FarmGoldMapMark = FarmGoldMapMark;
//# sourceMappingURL=FarmGoldMapMark.js.map
