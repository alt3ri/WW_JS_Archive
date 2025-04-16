"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbToggleTimerPauseState = void 0);
class FbToggleTimerPauseState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.wEh = !1),
      (this.PEh = void 0),
      (this.st_ = !1),
      (this.at_ = !1);
  }
  static Create(t) {
    if (t) return new FbToggleTimerPauseState(t);
  }
  get TimerType() {
    return (
      this.wEh ||
        ((this.wEh = !0), (this.PEh = this.FbDataInternal.timerType())),
      this.PEh
    );
  }
  get IsPause() {
    return (
      this.st_ || ((this.st_ = !0), (this.at_ = this.FbDataInternal.isPause())),
      this.at_
    );
  }
}
exports.FbToggleTimerPauseState = FbToggleTimerPauseState;
//# sourceMappingURL=FbToggleTimerPauseState.js.map
