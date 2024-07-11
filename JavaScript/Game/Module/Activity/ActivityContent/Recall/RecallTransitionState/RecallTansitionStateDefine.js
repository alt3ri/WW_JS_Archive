"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RecallFinishState =
    exports.RecallShowRewardState =
    exports.RecallFirstShowState =
      void 0);
class RecallFirstShowState {
  constructor(t) {
    this.EndCallBack = t;
  }
  Transition(t) {
    t.PlayFirstShow(), this.End();
  }
  GetNextStatus() {
    return 2;
  }
  End() {
    this.EndCallBack(this);
  }
}
exports.RecallFirstShowState = RecallFirstShowState;
class RecallShowRewardState {
  constructor(t) {
    this.EndCallBack = t;
  }
  Transition(t) {
    t.PlayRecallRewardTransition();
  }
  GetNextStatus() {
    return 3;
  }
  End() {
    this.EndCallBack(this);
  }
}
exports.RecallShowRewardState = RecallShowRewardState;
class RecallFinishState {
  constructor(t) {
    this.EndCallBack = t;
  }
  Transition(t) {
    t.GotoActivityViewAndCloseSelf(), this.End();
  }
  GetNextStatus() {
    return 4;
  }
  End() {
    this.EndCallBack(this);
  }
}
exports.RecallFinishState = RecallFinishState;
//# sourceMappingURL=RecallTansitionStateDefine.js.map
