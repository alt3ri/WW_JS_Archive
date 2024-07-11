"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionAssistant = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
const SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class FunctionAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments), (this.cto = void 0), (this.mto = void 0);
  }
  Load(t) {
    const e = this.dto(this.Model.Config.FrameEvents);
    this.SetFrameEvents(this.Model.Config.FrameEvents),
      (this.cto = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(e, (e) => {
        (this.cto = void 0), t(e ?? !1);
      }));
  }
  PreAllPlay() {
    (this.mto = void 0),
      ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.OnSeqStart();
  }
  AllStop() {
    this.Model.FrameEvents.clear();
  }
  End() {
    this.cto && this.cto.Cancel(),
      this.mto &&
        (this.mto.Remove(), UiManager_1.UiManager.CloseView("PlotLogoView")),
      ModelManager_1.ModelManager.PlotModel.PlotWeather.StopAllWeather(),
      ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.OnSeqEnd(),
      this.Model.FrameEvents.clear();
  }
  dto(e) {
    const t = new Array();
    if (e?.length)
      for (const i of e)
        if (i.EventActions?.length)
          for (const r of i.EventActions) {
            let e = void 0;
            switch (r.Name) {
              case "AwakeEntity":
                var o = r.Params;
                e = o.EntityIds;
                break;
              case "ChangeEntityState":
                o = r.Params;
                e = [o.EntityId];
            }
            if (e && e.length > 0) for (const s of e) t.push(s);
          }
    return t;
  }
  SetFrameEvents(e) {
    if (e && e.length !== 0)
      for (const t of e)
        this.Model.FrameEvents.set(t.EventKey, t.EventActions),
          this.Model.ActionQueue.Push(t.EventKey);
  }
  RunSequenceFrameEvents(e) {
    let t;
    this.Model.State !== 5 &&
      ((t = this.Model.GetFrameEvents(e)),
      !this.Model.ActionQueue || this.Model.ActionQueue.Size <= 0
        ? Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 46, "ActionQueue为空")
        : (this.Model.ActionQueue.Pop() !== e &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              27,
              "编辑器与Seq帧事件顺序不一致，可能会导致跳过的表现错误",
            ),
          t && t.length !== 0
            ? ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
                t,
                () => {},
              )
            : ControllerHolder_1.ControllerHolder.FlowController.LogError(
                "没有找到对应的帧事件",
                ["key", e],
              )));
  }
  ShowLogo(e) {
    e *= CommonDefine_1.MILLIONSECOND_PER_SECOND;
    e < TimerSystem_1.MIN_TIME
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 27, "展示logo时间过短，不展示")
      : (UiManager_1.UiManager.OpenView("PlotLogoView"),
        (this.mto = TimerSystem_1.TimerSystem.Delay(() => {
          UiManager_1.UiManager.CloseView("PlotLogoView"), (this.mto = void 0);
        }, e)));
  }
}
exports.FunctionAssistant = FunctionAssistant;
// # sourceMappingURL=FunctionAssistant.js.map
