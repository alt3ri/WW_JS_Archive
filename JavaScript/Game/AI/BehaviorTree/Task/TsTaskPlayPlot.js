"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const DEFAULT_WAIT_TICK = 5;
class TsTaskPlayPlot extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.SeqNetworkId = ""),
      (this.SeqNetworkRes = ""),
      (this.PlotConfigRes = ""),
      (this.WaitTickCount = DEFAULT_WAIT_TICK),
      (this.IsInitTsVariables = !1),
      (this.TsSeqNetworkId = ""),
      (this.TsSeqNetworkRes = ""),
      (this.TsPlotConfigRes = ""),
      (this.TsWaitTickCount = 0),
      (this.IsPlotStart = !1),
      (this.TickRemain = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsSeqNetworkId = this.SeqNetworkId),
      (this.TsSeqNetworkRes = this.SeqNetworkRes),
      (this.TsPlotConfigRes = this.PlotConfigRes),
      (this.TsWaitTickCount = this.WaitTickCount));
  }
  ReceiveExecuteAI(s, t) {
    this.InitTsVariables(),
      s.AiController
        ? ((this.IsPlotStart = !1),
          (this.TickRemain = this.TsWaitTickCount),
          this.TsPlotConfigRes
            ? ControllerHolder_1.ControllerHolder.FlowController.StartFlowByRes(
                this.TsPlotConfigRes,
              )
            : (this.TsSeqNetworkId && this.TsSeqNetworkRes) ||
              ((this.IsPlotStart = !0), this.FinishExecute(!0)))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
              "Type",
              s.GetClass().GetName(),
            ]),
          this.FinishExecute(!1));
  }
  ReceiveTickAI(s, t, e) {
    this.IsPlotStart
      ? this.TsPlotConfigRes &&
        !ModelManager_1.ModelManager.PlotModel.IsInPlot &&
        this.FinishExecute(!0)
      : (this.TickRemain--,
        this.TsPlotConfigRes &&
          ModelManager_1.ModelManager.PlotModel.IsInPlot &&
          (this.IsPlotStart = !0),
        !this.IsPlotStart && this.TickRemain < 1 && this.FinishExecute(!0));
  }
}
exports.default = TsTaskPlayPlot;
// # sourceMappingURL=TsTaskPlayPlot.js.map
