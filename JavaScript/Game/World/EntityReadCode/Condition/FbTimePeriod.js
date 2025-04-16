"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTimePeriod = void 0);
class FbTimePeriod {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.vzh = !1),
      (this.yzh = void 0);
  }
  static Create(t) {
    if (t) return new FbTimePeriod(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get TimePeriod() {
    return (
      this.vzh ||
        ((this.vzh = !0), (this.yzh = this.FbDataInternal.timePeriod())),
      this.yzh
    );
  }
}
exports.FbTimePeriod = FbTimePeriod;
//# sourceMappingURL=FbTimePeriod.js.map
