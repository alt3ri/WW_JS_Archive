"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSpeedCurveMotion = void 0);
class FbSpeedCurveMotion {
  constructor(e) {
    (this.FbDataInternal = e), (this.W2h = !1), (this.j8o = void 0);
  }
  static Create(e) {
    if (e) return new FbSpeedCurveMotion(e);
  }
  get SpeedCurve() {
    return (
      this.W2h ||
        ((this.W2h = !0), (this.j8o = this.FbDataInternal.speedCurve())),
      this.j8o
    );
  }
}
exports.FbSpeedCurveMotion = FbSpeedCurveMotion;
//# sourceMappingURL=FbSpeedCurveMotion.js.map
