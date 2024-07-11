"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionAssistant = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  IAction_1 = require("../../../../../UniverseEditor/Interface/IAction"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask"),
  PlotController_1 = require("../../PlotController"),
  SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class FunctionAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments), (this.hio = void 0), (this.lio = void 0);
  }
  Load(o) {
    var e = this._io(this.Model.Config.FrameEvents);
    this.SetFrameEvents(this.Model.Config.FrameEvents),
      (this.hio = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(e, (e) => {
        (this.hio = void 0), o(e ?? !1);
      }));
  }
  PreAllPlay() {
    (this.lio = void 0),
      ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.OnSeqStart();
  }
  AllStop() {
    this.Model.FrameEvents.clear();
  }
  End() {
    this.hio && this.hio.Cancel(),
      this.lio &&
        (this.lio.Remove(), UiManager_1.UiManager.CloseView("PlotLogoView")),
      ModelManager_1.ModelManager.PlotModel.PlotWeather.StopAllWeather(),
      ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.OnSeqEnd(),
      this.Model.FrameEvents.clear();
  }
  _io(e) {
    var o = new Array();
    if (e?.length)
      for (const i of e)
        if (i.EventActions?.length)
          for (const r of i.EventActions) {
            let e = void 0;
            switch (r.Name) {
              case "AwakeEntity":
                var t = r.Params;
                e = t.EntityIds;
                break;
              case "ChangeEntityState":
                t = r.Params;
                e =
                  t.Type !== IAction_1.EChangeEntityState.BatchDirectly
                    ? [t.EntityId]
                    : [...t.EntityIds];
            }
            if (e && 0 < e.length) for (const a of e) o.push(a);
          }
    return o;
  }
  SetFrameEvents(e) {
    if (e && 0 !== e.length)
      for (const o of e)
        this.Model.FrameEvents.set(o.EventKey, o.EventActions),
          this.Model.ActionQueue.Push(o.EventKey);
  }
  RunSequenceFrameEvents(e) {
    var o;
    5 !== this.Model.State &&
      ((o = this.Model.GetFrameEvents(e)),
      !this.Model.ActionQueue || this.Model.ActionQueue.Size <= 0
        ? Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 46, "ActionQueue为空")
        : (this.Model.ActionQueue.Pop() !== e &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              27,
              "编辑器与Seq帧事件顺序不一致，可能会导致跳过的表现错误",
            ),
          o && 0 !== o.length
            ? ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
                o,
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
        (this.lio = TimerSystem_1.TimerSystem.Delay(() => {
          UiManager_1.UiManager.CloseView("PlotLogoView"), (this.lio = void 0);
        }, e)));
  }
  async OpenBackgroundImage(e) {
    var o = PlotController_1.PlotController.GetCurrentViewName();
    o && UiManager_1.UiManager.IsViewShow(o)
      ? await UiManager_1.UiManager.GetViewByName(o).OpenBackgroundUi(e)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 46, "尝试打开预览图但PlotView未打开", [
          "viewName",
          o,
        ]);
  }
  async CloseBackgroundImage() {
    var e = PlotController_1.PlotController.GetCurrentViewName();
    e && UiManager_1.UiManager.IsViewShow(e)
      ? await UiManager_1.UiManager.GetViewByName(e).CloseBackgroundUi()
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 46, "尝试打开预览图但PlotView未打开", [
          "viewName",
          e,
        ]);
  }
}
exports.FunctionAssistant = FunctionAssistant;
//# sourceMappingURL=FunctionAssistant.js.map
