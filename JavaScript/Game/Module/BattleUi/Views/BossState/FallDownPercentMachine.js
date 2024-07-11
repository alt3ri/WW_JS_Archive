"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FallDownPercentMachine = void 0);
const DURATION = 100;
class FallDownPercentMachine {
  constructor() {
    (this.Sst = 0), (this.yst = 0), (this.Ist = 0);
  }
  SetTargetPercent(t) {
    t !== this.Sst &&
      (t > this.Sst && t < 1
        ? ((this.Sst = t), (this.Ist = (t - this.yst) / DURATION))
        : ((this.Sst = t), (this.yst = t), (this.Ist = 0)));
  }
  Update(t) {
    return (
      0 !== this.Ist &&
      ((this.yst += this.Ist * t),
      this.yst >= this.Sst && ((this.yst = this.Sst), (this.Ist = 0)),
      !0)
    );
  }
  GetCurPercent() {
    return this.yst;
  }
}
exports.FallDownPercentMachine = FallDownPercentMachine;
//# sourceMappingURL=FallDownPercentMachine.js.map
