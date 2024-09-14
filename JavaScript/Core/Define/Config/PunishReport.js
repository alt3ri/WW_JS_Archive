"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReport = void 0);
class PunishReport {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get CondDescription1() {
    return this.conddescription1();
  }
  get CondDescription2() {
    return this.conddescription2();
  }
  get CondDescription3() {
    return this.conddescription3();
  }
  get Cond1Key() {
    return this.cond1key();
  }
  get Cond2ey() {
    return this.cond2ey();
  }
  get Cond3Key() {
    return this.cond3key();
  }
  get GetBoxKey() {
    return this.getboxkey();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsPunishReport(t, i) {
    return (i || new PunishReport()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  conddescription1(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  conddescription2(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  conddescription3(t) {
    var i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  cond1key(t) {
    var i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  cond2ey(t) {
    var i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  cond3key(t) {
    var i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  getboxkey(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
}
exports.PunishReport = PunishReport;
//# sourceMappingURL=PunishReport.js.map
