"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFixedTime = void 0);
class FbFixedTime {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q1h = !1),
      (this.k1h = 0),
      (this.tBh = !1),
      (this.iBh = 0);
  }
  static Create(t) {
    if (t) return new FbFixedTime(t);
  }
  get Hour() {
    return (
      this.q1h || ((this.q1h = !0), (this.k1h = this.FbDataInternal.hour())),
      this.k1h
    );
  }
  get Minutes() {
    return (
      this.tBh || ((this.tBh = !0), (this.iBh = this.FbDataInternal.minutes())),
      this.iBh
    );
  }
}
exports.FbFixedTime = FbFixedTime;
//# sourceMappingURL=FbFixedTime.js.map
