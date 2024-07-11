"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FallDownBarStateMachine = void 0);
const TimeUtil_1 = require("../../../../Common/TimeUtil");
class FallDownBarStateMachine {
  constructor(t) {
    (this.r1t = -0),
      (this.n1t = -0),
      (this.s1t = 0),
      (this.vq = !1),
      (this.a1t = t),
      (this.s1t = 1);
  }
  Update(t) {
    this.vq &&
      ((this.n1t += t * this.s1t), (t = this.n1t / this.r1t), this.a1t(t));
  }
  OnFallDownStart(t) {
    (this.r1t = t * TimeUtil_1.TimeUtil.InverseMillisecond),
      (this.n1t = 0),
      (this.vq = !0);
  }
  OnChangeTimeDilation(t) {
    this.s1t = t;
  }
  OnFallDownEnd() {
    this.vq = !1;
  }
  OnDestroy() {
    (this.vq = !1), (this.s1t = 1);
  }
}
exports.FallDownBarStateMachine = FallDownBarStateMachine;
//# sourceMappingURL=FallDownBarStateMachine.js.map
