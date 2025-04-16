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
    super(...arguments),
      (this.hio = void 0),
      (this.lio = void 0),
      (this.Tvl = void 0);
  }
  Load(i) {
    var e = this._io(this.Model.Config.FrameEvents);
    this.SetFrameEvents(this.Model.Config.FrameEvents),
      (this.hio = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
        "FunctionAssistant.Load",
        e,
        (e) => {
          (this.hio = void 0), i(e ?? !1);
        },
      ));
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
    var i = new Array();
    if (e?.length)
      for (const t of e)
        if (t.EventActions?.length)
          for (const r of t.EventActions) {
            let e = void 0;
            switch (r.Name) {
              case "AwakeEntity":
                var o = r.Params;
                e = o.EntityIds;
                break;
              case "ChangeEntityState":
                o = r.Params;
                e =
                  o.Type !== IAction_1.EChangeEntityState.BatchDirectly
                    ? [o.EntityId]
                    : [...o.EntityIds];
            }
            if (e && 0 < e.length) for (const a of e) i.push(a);
          }
    return i;
  }
  SetFrameEvents(e) {
    if (e && 0 !== e.length)
      for (const i of e)
        this.Model.FrameEvents.set(i.EventKey, i.EventActions),
          this.Model.ActionQueue.Push(i.EventKey);
  }
  RunSequenceFrameEvents(t) {
    if (5 !== this.Model.State) {
      var e = this.Model.GetFrameEvents(t);
      if (!this.Model.ActionQueue || this.Model.ActionQueue.Size <= 0)
        Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 45, "ActionQueue为空");
      else if (
        (this.Model.ActionQueue.Pop() !== t &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Plot",
            26,
            "编辑器与Seq帧事件顺序不一致，可能会导致跳过的表现错误",
          ),
        e && 0 !== e.length)
      ) {
        ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
          e,
          () => {},
          !0,
        );
        let o = void 0;
        this.Model.FrameEventsMap.forEach((e, i) => {
          e.has(t) && (o = i);
        }),
          o && this.Model.FrameEventsMap.delete(o);
      } else
        ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "没有找到对应的帧事件",
          ["key", t],
        );
    }
  }
  ShowLogo(e) {
    e *= CommonDefine_1.MILLIONSECOND_PER_SECOND;
    e < TimerSystem_1.MIN_TIME
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 26, "展示logo时间过短，不展示")
      : (UiManager_1.UiManager.OpenView("PlotLogoView"),
        (this.lio = TimerSystem_1.TimerSystem.Delay(() => {
          UiManager_1.UiManager.CloseView("PlotLogoView"), (this.lio = void 0);
        }, e)));
  }
  async OpenBackgroundImage(e, i, o = !0) {
    var t,
      r = PlotController_1.PlotController.GetCurrentViewName();
    r && UiManager_1.UiManager.IsViewShow(r)
      ? ((t = UiManager_1.UiManager.GetViewByName(r)),
        await (this.Tvl = t).OpenBackgroundUi(e, i, o))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 45, "Ui预览图:尝试打开预览图但PlotView未打开", [
          "viewName",
          r,
        ]);
  }
  async OpenBackgroundImageInArray(e, i) {
    var o,
      t = PlotController_1.PlotController.GetCurrentViewName();
    t && UiManager_1.UiManager.IsViewShow(t)
      ? ((o = UiManager_1.UiManager.GetViewByName(t)),
        await (this.Tvl = o).OpenBackgroundUiForSeekSpine(e, i))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 45, "Ui预览图:尝试打开预览图但PlotView未打开", [
          "viewName",
          t,
        ]);
  }
  async PlayUiLevelSequence(e) {
    var i = PlotController_1.PlotController.GetCurrentViewName();
    i && UiManager_1.UiManager.IsViewShow(i)
      ? await UiManager_1.UiManager.GetViewByName(i).PlayUiLevelSeq(e)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 45, "Ui预览图:尝试打开预览图但PlotView未打开", [
          "viewName",
          i,
        ]);
  }
  async CloseBackgroundImage() {
    var e = PlotController_1.PlotController.GetCurrentViewName();
    e && UiManager_1.UiManager.IsViewShow(e)
      ? (await UiManager_1.UiManager.GetViewByName(e).CloseBackgroundUi(),
        (this.Tvl = void 0))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 45, "Ui预览图:尝试打开预览图但PlotView未打开", [
          "viewName",
          e,
        ]);
  }
  PlaySpineAnim(e, i = !0) {
    this.Tvl && e
      ? this.Tvl.PlaySonUiSpine(e, i)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Plot",
          45,
          "Ui预览图:this.NowView不存在或者名字为空所以返回",
          ["spineName", e],
        );
  }
  PlaySpineAnimInArray(e) {
    !this.Tvl || e.Num() <= 0
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Plot",
          45,
          "Ui预览图:this.NowView不存在或者数组为空所以返回",
        )
      : this.Tvl.PlaySonUiSpineInArray(e);
  }
  CloseSpineAnimation(e) {
    var i = PlotController_1.PlotController.GetCurrentViewName();
    i && UiManager_1.UiManager.IsViewShow(i)
      ? UiManager_1.UiManager.GetViewByName(i).CloseSpineAnimation(e)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Plot",
          45,
          "Ui预览图:尝试关闭某个Spine动画但PlotView未打开",
          ["viewName", i],
        );
  }
  CloseSpineAnimationInArray(i) {
    var e = PlotController_1.PlotController.GetCurrentViewName();
    if (e && UiManager_1.UiManager.IsViewShow(e)) {
      var o = UiManager_1.UiManager.GetViewByName(e);
      if (i.Num() <= 0)
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 45, "Ui预览图:未填入数组，关闭失败");
      else for (let e = 0; e < i.Num(); e++) o.CloseSpineAnimation(i.Get(e));
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Plot",
          45,
          "Ui预览图:尝试关闭某个Spine动画但PlotView未打开",
          ["viewName", e],
        );
  }
}
exports.FunctionAssistant = FunctionAssistant;
//# sourceMappingURL=FunctionAssistant.js.map
