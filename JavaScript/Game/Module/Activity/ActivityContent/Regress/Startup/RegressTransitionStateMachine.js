"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RegressTransitionStateMachine = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  RegressTansitionStateDefine_1 = require("./RegressTansitionStateDefine");
class RegressTransitionStateMachine {
  constructor() {
    (this.kh = void 0),
      (this.DIe = void 0),
      (this.G2e = void 0),
      (this.Jda = (t) => {
        this.zda(t);
      });
  }
  Start() {
    this.SetState(0);
  }
  ShutDown() {
    this.kh?.clear(), (this.kh = void 0), (this.G2e = void 0);
  }
  PlayNextState() {
    void 0 === this.G2e
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "ActivityRecall",
          63,
          "回归活动->RecallTransitionStateMachine.PlayNextState->",
          ["无法自动播放下一个状态, 当前状态为空 State:", this.G2e],
          ["当前状态", this.DIe],
        )
      : this.G2e.End();
  }
  SetState(t) {
    var e, i;
    3 !== t &&
      (e = this.Zda(t)) &&
      ((this.G2e = e),
      (i = UiManager_1.UiManager.GetViewByName("ActivityRegressStartupView"))
        ? ((this.DIe = t), e.Transition(i))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ActivityRecall",
            63,
            "回归活动->RecallTransitionStateMachine.SetState->",
            ["播放状态异常, ActivityRecallStartView界面未加载, 目标状态:", t],
            ["当前状态", this.DIe],
          ));
  }
  zda(t) {
    void 0 !== this.G2e &&
      t !== this.G2e &&
      Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "ActivityRecall",
        63,
        "回归活动->RecallTransitionStateMachine.OnTransitionComplete->",
        ["状态切换异常，结束状态与当前状态不对称, EndState:", t],
        ["CurrentState", this.G2e],
      ),
      (this.G2e = void 0);
    t = t.GetNextStatus();
    this.SetState(t);
  }
  Zda(t) {
    this.kh = this.kh ?? new Map();
    let e = this.kh.get(t);
    if (void 0 === e)
      switch (t) {
        case 0:
          e = new RegressTansitionStateDefine_1.RecallShowRewardState(this.Jda);
          break;
        case 2:
          e = new RegressTansitionStateDefine_1.RecallFinishState(this.Jda);
          break;
        default:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "ActivityRecall",
              63,
              "回归活动->RecallTransitionStateMachine.GetState->",
              ["播放状态异常, 在未定义对应的状态, 目标状态:", t],
              ["当前状态", this.DIe],
            );
      }
    return e && this.kh.set(t, e), e;
  }
}
exports.RegressTransitionStateMachine = RegressTransitionStateMachine;
//# sourceMappingURL=RegressTransitionStateMachine.js.map
