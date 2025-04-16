"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHourToHourCondition = void 0);
const FbHour_1 = require("./FbHour");
class FbHourToHourCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.lzh = !1),
      (this._zh = void 0),
      (this.ODh = !1),
      (this.FDh = void 0),
      (this._ch = !1),
      (this.cch = void 0);
  }
  static Create(t) {
    if (t) return new FbHourToHourCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Start() {
    return (
      this.lzh ||
        ((this.lzh = !0),
        (this._zh = FbHour_1.FbHour.Create(this.FbDataInternal.start()))),
      this._zh
    );
  }
  get End() {
    return (
      this.ODh ||
        ((this.ODh = !0),
        (this.FDh = FbHour_1.FbHour.Create(this.FbDataInternal.end()))),
      this.FDh
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
}
exports.FbHourToHourCondition = FbHourToHourCondition;
//# sourceMappingURL=FbHourToHourCondition.js.map
