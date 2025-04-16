"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AlertAreaUpdateMachine = void 0);
const BAR_ANI_DURATION = 500;
class AlertAreaUpdateMachine {
  constructor() {
    (this.LMl = 0), (this.RMl = 0), (this.UMl = 0), (this.xMl = 0);
  }
  Init(t) {
    (this.RMl = t), (this.LMl = t);
  }
  Update(t) {
    return this.PMl(t);
  }
  ChangeTargetPercent(t) {
    t !== this.LMl &&
      (t > this.LMl
        ? (this.RMl = Math.min(this.RMl, this.LMl))
        : (this.RMl = Math.max(this.RMl, this.LMl)),
      (this.LMl = t),
      (this.UMl = (t - this.RMl) / BAR_ANI_DURATION),
      (this.xMl = Math.sign(this.UMl)));
  }
  PMl(t) {
    return (
      0 !== this.UMl &&
      ((this.RMl += this.UMl * t),
      ((0 < this.UMl && this.RMl >= this.LMl) ||
        (this.UMl < 0 && this.RMl <= this.LMl)) &&
        ((this.RMl = this.LMl), (this.UMl = 0)),
      !0)
    );
  }
  GetBarCurPercent() {
    return this.RMl;
  }
  GetBarTargetPercent() {
    return this.LMl;
  }
  GetProgressDir() {
    return this.xMl;
  }
}
exports.AlertAreaUpdateMachine = AlertAreaUpdateMachine;
//# sourceMappingURL=AlertAreaUpdateMachine.js.map
