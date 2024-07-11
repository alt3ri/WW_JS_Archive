"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CycleTime = void 0);
class CycleTime {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get CycleType() {
    return this.cycletype();
  }
  get CycleParam() {
    return this.cycleparam();
  }
  get TimeParam() {
    return this.timeparam();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsCycleTime(t, e) {
    return (e || new CycleTime()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  cycletype() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  cycleparam() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  timeparam(t) {
    const e = this.J7.__offset(this.z7, 8);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
}
exports.CycleTime = CycleTime;
// # sourceMappingURL=CycleTime.js.map
