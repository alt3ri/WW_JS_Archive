"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarPercentMachine = void 0);
const DURATION = 100;
class SpecialEnergyBarPercentMachine {
  constructor() {
    (this.Sst = 0), (this.yst = 0), (this.Ist = 0);
  }
  Init(t) {
    (this.yst = t), (this.Sst = t);
  }
  SetTargetPercent(t) {
    t !== this.Sst &&
      (t > this.Sst
        ? ((this.Sst = t),
          (this.yst = Math.min(this.yst, t)),
          (this.Ist = (t - this.yst) / DURATION))
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
  GetTargetPercent() {
    return this.Sst;
  }
}
exports.SpecialEnergyBarPercentMachine = SpecialEnergyBarPercentMachine;
//# sourceMappingURL=SpecialEnergyBarPercentMachine.js.map
