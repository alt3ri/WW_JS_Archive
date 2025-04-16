"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RecallFinishState = exports.RecallShowRewardState = void 0);
class RecallShowRewardState {
  constructor(t) {
    this.EndCallBack = t;
  }
  Transition(t) {}
  GetNextStatus() {
    return 2;
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
    return 3;
  }
  End() {
    this.EndCallBack(this);
  }
}
exports.RecallFinishState = RecallFinishState;
//# sourceMappingURL=RegressTansitionStateDefine.js.map
