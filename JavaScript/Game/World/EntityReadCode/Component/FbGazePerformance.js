"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGazePerformance = void 0);
class FbGazePerformance {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.mch = !1),
      (this.Cch = 0),
      (this.gch = !1),
      (this.fch = 0),
      (this.pch = !1),
      (this.vch = 0),
      (this.ych = !1),
      (this.Sch = !1);
  }
  static Create(t) {
    if (t) return new FbGazePerformance(t);
  }
  get FadeInTime() {
    return (
      this.mch ||
        ((this.mch = !0), (this.Cch = this.FbDataInternal.fadeInTime())),
      this.Cch
    );
  }
  get StayTime() {
    return (
      this.gch ||
        ((this.gch = !0), (this.fch = this.FbDataInternal.stayTime())),
      this.fch
    );
  }
  get FadeOutTime() {
    return (
      this.pch ||
        ((this.pch = !0), (this.vch = this.FbDataInternal.fadeOutTime())),
      this.vch
    );
  }
  get LockCamera() {
    return (
      this.ych ||
        ((this.ych = !0), (this.Sch = this.FbDataInternal.lockCamera())),
      this.Sch
    );
  }
}
exports.FbGazePerformance = FbGazePerformance;
//# sourceMappingURL=FbGazePerformance.js.map
