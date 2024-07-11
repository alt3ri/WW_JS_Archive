"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RecallTransitionStateMachine = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  RecallTansitionStateDefine_1 = require("./RecallTansitionStateDefine");
class RecallTransitionStateMachine {
  constructor() {
    (this.kh = void 0),
      (this.DIe = void 0),
      (this.G2e = void 0),
      (this.T_a = (t) => {
        this.L_a(t);
      });
  }
  Start() {
    this.SetState(0);
  }
  Clear() {
    this.kh?.clear(), (this.kh = void 0), (this.G2e = void 0);
  }
  PlayNextState() {
    void 0 === this.G2e
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "ActivityRecall",
          64,
          "[回流活动]RecallTransitionStateMachine.PlayNextState->",
          ["无法自动播放下一个状态, 当前状态为空 State:", this.G2e],
          ["当前状态", this.DIe],
        )
      : this.G2e.End();
  }
  SetState(t) {
    var i, e;
    4 !== t &&
      (i = this.D_a(t)) &&
      ((this.G2e = i),
      (e = UiManager_1.UiManager.GetViewByName("ActivityRecallStartView"))
        ? ((this.DIe = t), i.Transition(e))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ActivityRecall",
            64,
            "[回流活动]RecallTransitionStateMachine.SetState->",
            ["播放状态异常, ActivityRecallStartView界面未加载, 目标状态:", t],
            ["当前状态", this.DIe],
          ));
  }
  L_a(t) {
    void 0 !== this.G2e &&
      t !== this.G2e &&
      Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "ActivityRecall",
        64,
        "[回流活动]RecallTransitionStateMachine.OnTransitionComplete->",
        ["状态切换异常，结束状态与当前状态不对称, EndState:", t],
        ["CurrentState", this.G2e],
      ),
      (this.G2e = void 0);
    t = t.GetNextStatus();
    this.SetState(t);
  }
  D_a(t) {
    this.kh = this.kh ?? new Map();
    let i = this.kh.get(t);
    if (void 0 === i)
      switch (t) {
        case 0:
          i = new RecallTansitionStateDefine_1.RecallFirstShowState(this.T_a);
          break;
        case 2:
          i = new RecallTansitionStateDefine_1.RecallShowRewardState(this.T_a);
          break;
        case 3:
          i = new RecallTansitionStateDefine_1.RecallFinishState(this.T_a);
          break;
        default:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "ActivityRecall",
              64,
              "[回流活动]RecallTransitionStateMachine.GetState->",
              ["播放状态异常, 在未定义对应的状态, 目标状态:", t],
              ["当前状态", this.DIe],
            );
      }
    return i && this.kh.set(t, i), i;
  }
}
exports.RecallTransitionStateMachine = RecallTransitionStateMachine;
//# sourceMappingURL=RecallTransitionStateMachine.js.map
