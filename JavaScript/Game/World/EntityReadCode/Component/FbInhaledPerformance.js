"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInhaledPerformance = void 0);
class FbInhaledPerformance {
  constructor(e) {
    (this.FbDataInternal = e), (this.mYh = !1), (this.CYh = 0);
  }
  static Create(e) {
    if (e) return new FbInhaledPerformance(e);
  }
  get InhaledTime() {
    return (
      this.mYh ||
        ((this.mYh = !0), (this.CYh = this.FbDataInternal.inhaledTime())),
      this.CYh
    );
  }
}
exports.FbInhaledPerformance = FbInhaledPerformance;
//# sourceMappingURL=FbInhaledPerformance.js.map
