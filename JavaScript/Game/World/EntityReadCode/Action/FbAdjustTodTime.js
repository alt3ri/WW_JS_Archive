"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAdjustTodTime = void 0);
class FbAdjustTodTime {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q1h = !1),
      (this.k1h = 0),
      (this.G1h = !1),
      (this.O1h = 0),
      (this.F1h = !1),
      (this.N1h = !1);
  }
  static Create(t) {
    if (t) return new FbAdjustTodTime(t);
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
  get ShowUi() {
    return (
      this.F1h || ((this.F1h = !0), (this.N1h = this.FbDataInternal.showUi())),
      this.N1h
    );
  }
}
exports.FbAdjustTodTime = FbAdjustTodTime;
//# sourceMappingURL=FbAdjustTodTime.js.map
