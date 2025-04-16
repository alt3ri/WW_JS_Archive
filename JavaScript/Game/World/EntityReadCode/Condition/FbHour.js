"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHour = void 0);
class FbHour {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q1h = !1),
      (this.k1h = 0),
      (this.G1h = !1),
      (this.O1h = 0);
  }
  static Create(t) {
    if (t) return new FbHour(t);
  }
  get Hour() {
    return (
      this.q1h || ((this.q1h = !0), (this.k1h = this.FbDataInternal.hour())),
      this.k1h
    );
  }
  get Min() {
    return (
      this.G1h || ((this.G1h = !0), (this.O1h = this.FbDataInternal.min())),
      this.O1h
    );
  }
}
exports.FbHour = FbHour;
//# sourceMappingURL=FbHour.js.map
