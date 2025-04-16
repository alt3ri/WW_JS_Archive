"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RegressDoubleDrop = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RegressDoubleDrop {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Grade() {
    return this.grade();
  }
  get BossDoubleTimes() {
    return this.bossdoubletimes();
  }
  get WeekDoubleTimes() {
    return this.weekdoubletimes();
  }
  get BossUnLock() {
    return this.bossunlock();
  }
  get WeekUnLock() {
    return this.weekunlock();
  }
  get Tips() {
    return this.tips();
  }
  get WorldBossAccessPathId() {
    return this.worldbossaccesspathid();
  }
  get WeekAccessPathId() {
    return this.weekaccesspathid();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRegressDoubleDrop(t, s) {
    return (s || new RegressDoubleDrop()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  grade() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  bossdoubletimes() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  weekdoubletimes() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  bossunlock() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  weekunlock() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tips(t) {
    var s = this.J7.__offset(this.z7, 16),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  worldbossaccesspathid() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  weekaccesspathid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RegressDoubleDrop = RegressDoubleDrop;
//# sourceMappingURL=RegressDoubleDrop.js.map
