"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionRunner =
    exports.HANG_COUNT_DOWN =
    exports.SKIP_FADE_TIME =
    exports.OPTION_SKIPPING_SELECTED =
      void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  KuroSdkReport_1 = require("../../../KuroSdk/KuroSdkReport"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
  PlotController_1 = require("../PlotController"),
  FlowNetworks_1 = require("./FlowNetworks"),
  FlowSequence_1 = require("./FlowSequence"),
  FlowShowTalk_1 = require("./FlowShowTalk");
(exports.OPTION_SKIPPING_SELECTED = 0),
  (exports.SKIP_FADE_TIME = 0.25),
  (exports.HANG_COUNT_DOWN = 2e4);
class FlowActionRunner extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.nx = void 0),
      (this.QTn = 0),
      (this.TXi = []),
      (this.LXi = []),
      (this.DXi = void 0),
      (this.RXi = void 0),
      (this.UXi = void 0),
      (this.AXi = void 0),
      (this.FlowSequence = new FlowSequence_1.FlowSequence()),
      (this.FlowShowTalk = new FlowShowTalk_1.FlowShowTalk()),
      (this.PXi = void 0),
      (this.xXi = void 0),
      (this.wXi = void 0),
      (this.BXi = void 0),
      (this.bXi = {
        Name: "SetPlotMode",
        Params: { Mode: "LevelC", IsSwitchMainRole: !1, UseFlowCamera: !0 },
        ActionGuid: "",
      }),
      (this.EnableSkip = (t) => {
        this.nx &&
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.EnableSkipPlot,
            t,
          ),
          (this.nx.CanSkip = t));
      }),
      (this.qXi = (t, i) => {
        this.RXi && this.RXi.Recycle(),
          (this.DXi = void 0),
          (this.nx.CurActionId = 0),
          (this.RXi = void 0),
          i && this.GXi();
      }),
      (this.NXi = (t) => {
        t || 0 !== this.QTn
          ? (t || FlowNetworks_1.FlowNetworks.RequestFlowRestart(this.QTn),
            (this.QTn = 0))
          : this.LogError("ContextCache undefined");
      }),
      (this.OXi = (t, i) => {
        this.AXi && this.AXi.Recycle(),
          (this.UXi = void 0),
          this.nx && (this.nx.CurSubActionId = 0),
          (this.AXi = void 0),
          i ? this.kXi() : this.tua(!1);
      }),
      (this.FXi = () => {
        this.wXi?.Remove(),
          (this.wXi = void 0),
          this.nx &&
            (this.nx.CurShowTalk
              ? (this.FlowSequence.IsInit ? this.VXi() : this.HXi(),
                this.AXi?.InterruptExecute())
              : this.DXi &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Plot", 27, "跳过剧情: 行为", [
                    "ActionId",
                    this.DXi.ActionId,
                  ]),
                this.RXi?.InterruptExecute()));
      });
  }
  OnDestroy() {
    (this.nx = void 0),
      (this.DXi = void 0),
      (this.RXi = void 0),
      (this.UXi = void 0),
      (this.AXi = void 0);
  }
  GetInteractPoint() {
    let t = void 0;
    if (
      (t =
        this.nx?.Context && 1 === this.nx.Context.Type
          ? EntitySystem_1.EntitySystem.Get(this.nx.Context.EntityId)
          : t)
    ) {
      var i = t.GetComponent(181);
      if (i) return i.GetInteractController()?.GetInteractPoint();
    }
  }
  IsInShowTalk() {
    return void 0 !== this.nx && void 0 !== this.nx.CurShowTalk;
  }
  GetCurActionName() {
    return this.DXi?.Name ?? this.UXi?.Name;
  }
  ExecuteActions(i, t, e) {
    if (!i || i.length <= 0) this.jXi();
    else {
      (this.nx = t), (this.TXi.length = 0);
      for (let t = i.length - 1; 0 <= t; t--) this.TXi.push(i[t]);
      "SetPlotMode" === this.TXi[this.TXi.length - 1].Name ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 39, "第一个行为不是SetPlotMode，自动添加。"),
        this.TXi.push(this.bXi)),
        (this.nx.HasAdjustCamera = this.WXi()),
        (this.PXi = e);
      t = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.DisableFlow;
      (this.nx.IsBackground ||= t), this.GXi();
    }
  }
  GXi() {
    var t, i, e;
    this.nx.IsBreakdown || this.TXi.length <= 0
      ? this.jXi()
      : ((t = this.TXi.pop()),
        (i = ControllerHolder_1.ControllerHolder.FlowController.GetFlowAction(
          t.Name,
        ))
          ? ((this.DXi = t),
            (this.nx.CurActionId = t.ActionId),
            (e = i.GetAction()),
            ((this.RXi = e).Runner = this),
            (e.Callback = this.qXi),
            e.Execute(t, this.nx, i.IsAutoFinish))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 27, "无客户端实现的剧情行为 ", [
                "",
                t.Name,
              ]),
            this.GXi()));
  }
  FinishFlow(t, i, e = !1) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Plot", 27, "FinishFlow", ["reason", t], ["incId", i]),
      (i &&
        ModelManager_1.ModelManager.PlotModel.SetPendingPlotState(
          i,
          !0,
          !0,
          e,
        )) ||
        !this.nx ||
        (i && this.nx.FlowIncId !== i) ||
        ((this.nx.IsBreakdown = !0), this.BackgroundActions(t, !1, e));
  }
  ForceFinishActionsByGm() {
    this.nx &&
      (this.nx.IsServerNotify && FlowNetworks_1.FlowNetworks.RequestGmFinish(),
      (this.nx.IsBreakdown = !0),
      this.BackgroundActions("GM强制中断剧情", !1, !0));
  }
  jXi() {
    this.RXi?.Recycle(),
      (this.RXi = void 0),
      this.AXi?.Recycle(),
      (this.AXi = void 0),
      this.wXi?.Remove(),
      (this.wXi = void 0),
      this.FlowSequence.Stop(!0),
      (this.TXi.length = 0),
      (this.DXi = void 0),
      (this.UXi = void 0),
      ControllerHolder_1.ControllerHolder.PlotController.CloseAllUi(),
      ControllerHolder_1.ControllerHolder.PlotController.UnProtectPlotView(),
      this.KXi(() => {
        this.QXi(), (this.nx = void 0);
        var t = this.PXi;
        (this.PXi = void 0), t?.();
      });
  }
  KXi(t) {
    (this.nx.IsFadeSkip && !ModelManager_1.ModelManager.PlotModel.IsFadeIn) ||
    !ModelManager_1.ModelManager.PlotModel.PlotConfig.SkipHiddenBlackScreenAtEnd
      ? ((ModelManager_1.ModelManager.PlotModel.IsFadeIn = !1),
        LevelLoadingController_1.LevelLoadingController.CloseLoading(
          0,
          t,
          exports.SKIP_FADE_TIME,
        ))
      : t();
  }
  QXi() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Plot", 39, "剧情选项", [
        "选项",
        this.nx.OptionsCollection,
      ]),
      KuroSdkReport_1.KuroSdkReport.OnPlotFinish(this.nx),
      this.nx.IsServerEnd ||
        !this.nx.IsServerNotify ||
        this.nx.IsAsync ||
        ((this.QTn = this.nx.FlowIncId),
        FlowNetworks_1.FlowNetworks.RequestFlowEnd(
          this.nx.FlowIncId,
          this.nx.IsBackground,
          this.nx.OptionsCollection,
          this.NXi,
        ));
  }
  AddActionNext(t) {
    this.nx && this.TXi.push(t);
  }
  ExecuteNextAction() {
    this.nx && this.GXi();
  }
  ExecuteSubActions(t, i) {
    this.XXi(t, i), this.kXi();
  }
  XXi(i, t) {
    if (((this.LXi.length = 0), (this.xXi = t), i))
      for (let t = i.length - 1; 0 <= t; t--) this.LXi.push(i[t]);
  }
  kXi() {
    var t, i, e;
    this.LXi.length <= 0
      ? this.tua()
      : ((t = this.LXi.pop()),
        (i = ControllerHolder_1.ControllerHolder.FlowController.GetFlowAction(
          t.Name,
        ))
          ? ((this.UXi = t),
            this.nx && (this.nx.CurSubActionId = t.ActionId),
            (e = i.GetAction()),
            ((this.AXi = e).Runner = this),
            (e.Callback = this.OXi),
            e.Execute(t, this.nx, i.IsAutoFinish))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 27, "无客户端实现的剧情行为 ", [
                "",
                t.Name,
              ]),
            this.kXi()));
  }
  tua(t = !0) {
    var i;
    this.xXi && ((i = this.xXi), (this.xXi = void 0), i(t));
  }
  FinishShowCenterTextAction(t) {
    let i = !0;
    var e;
    this.DXi
      ? 0 < this.TXi.length &&
        ((e = this.TXi[this.TXi.length - 1]) ||
          this.LogError("FinishShowCenterTextAction:nextAction丢失"),
        "ShowCenterText" === e.Name) &&
        (i = !1)
      : this.UXi &&
        0 < this.LXi.length &&
        ((e = this.LXi[this.LXi.length - 1]) ||
          this.LogError("FinishShowCenterTextAction:nextAction丢失"),
        "ShowCenterText" === e.Name) &&
        (i = !1),
      i && UiManager_1.UiManager.IsViewOpen("PlotTransitionView")
        ? UiManager_1.UiManager.CloseView("PlotTransitionView", () => {
            t();
          })
        : t();
  }
  BackgroundActions(t, i = !0, e = !1) {
    !this.nx ||
      this.nx.IsBackground ||
      (!this.nx.CanSkip && ModelManager_1.ModelManager.SequenceModel.IsPlaying
        ? Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 27, "当前状态不可跳过")
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Plot",
              27,
              "跳过剧情",
              ["原因", t],
              ["Id", this.nx.FormatId],
              ["ServerNotify", this.nx.IsServerNotify],
              ["ServerEnd", this.nx.IsServerEnd],
            ),
          this.wXi?.Remove(),
          (this.wXi = void 0),
          (this.nx.IsBackground = !0),
          (this.nx.IsServerEnd = e),
          (this.nx.IsFadeSkip = i),
          PlotController_1.PlotController.ClearUi(),
          PlotController_1.PlotController.HideUi(!0),
          i
            ? (LevelLoadingController_1.LevelLoadingController.OpenLoading(
                0,
                3,
                void 0,
                exports.SKIP_FADE_TIME,
              ),
              (this.wXi = TimerSystem_1.TimerSystem.Delay(
                this.FXi,
                exports.SKIP_FADE_TIME *
                  CommonDefine_1.MILLIONSECOND_PER_SECOND,
              )))
            : this.FXi()));
  }
  VXi() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 27, "跳过剧情: 演出对话"),
      this.FlowSequence.Skip();
  }
  HXi() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 27, "跳过剧情: 普通对话"),
      this.FlowShowTalk.Skip();
  }
  HandleInputBeforePlay(t = "LevelC") {
    "LevelD" !== t && "Prompt" !== t
      ? ((ModelManager_1.ModelManager.PlotModel.PlotConfig.DisableInput = !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ForceReleaseInput,
          "Start Plot",
        ),
        InputDistributeController_1.InputDistributeController.RefreshInputTag())
      : (ModelManager_1.ModelManager.PlotModel.PlotConfig.DisableInput = !1);
  }
  WXi() {
    if (0 !== this.TXi.length)
      for (const t of this.TXi) if ("AdjustPlayerCamera" === t.Name) return !0;
    return !1;
  }
  GetOptionToSelect(t) {
    var i = this.nx.CurShowTalkActionId,
      t =
        t ??
        this.nx.CurShowTalk.TalkItems.find((t) => t.Id === this.nx.CurTalkId);
    return t?.Options &&
      (i = this.nx.OptionsHistory.get(i))?.has(t.Id) &&
      (i = i.get(t.Id) + 1) < t.Options.length
      ? i
      : exports.OPTION_SKIPPING_SELECTED;
  }
  RecordOption(t, i) {
    this.nx?.CurShowTalk &&
      (this.nx.OptionsHistory.get(this.nx.CurShowTalkActionId).set(t, i),
      this.nx.OptionsCollection[this.nx.OptionsCollection.length - 1][1].push([
        t,
        i,
      ]));
  }
  CheckCanSkipTmp() {
    if (!this.TXi) return !1;
    for (const t of this.TXi) if ("PlaySequenceData" === t.Name) return !1;
    return !0;
  }
  JumpTalk(t) {
    this.nx.CurShowTalk &&
      (this.FlowSequence.IsInit
        ? this.FlowSequence.OnJumpTalk(t)
        : this.FlowShowTalk.SwitchTalkItem(t));
  }
  FinishTalk() {
    this.nx.CurShowTalk &&
      (this.FlowSequence.IsInit
        ? this.FlowSequence.OnFinishTalk()
        : this.FlowShowTalk.FinishShowTalk());
  }
  TriggerCountDownSkip(t) {
    t
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 27, "剧情跳过开启倒计时", [
            "time",
            exports.HANG_COUNT_DOWN,
          ]),
        this.BXi?.Remove(),
        (this.BXi = TimerSystem_1.TimerSystem.Delay(() => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "剧情跳过倒计时完毕，跳过"),
            this.BackgroundActions("D级剧情被别的界面打断", !1),
            (this.BXi = void 0);
        }, exports.HANG_COUNT_DOWN)))
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 27, "剧情跳过关闭倒计时"),
        this.BXi?.Remove(),
        (this.BXi = void 0));
  }
  HasFlow(t, i, e) {
    if (
      this.nx &&
      this.nx.FlowListName === t &&
      this.nx.FlowId === i &&
      this.nx.FlowStateId === e
    )
      return !0;
    for (const s of ModelManager_1.ModelManager.PlotModel.PlotPendingList)
      if (s.FlowListName === t && s.FlowId === i && s.StateId === e) return !0;
    return !1;
  }
  GetNextAction(t) {
    if (this.nx)
      return t && 0 < this.LXi.length
        ? this.LXi[this.LXi.length - 1]
        : 0 < this.TXi.length
          ? this.TXi[this.TXi.length - 1]
          : void 0;
  }
  LogError(t, ...i) {
    this.nx
      ? this.nx?.LogError(t, ...i)
      : Log_1.Log.CheckError() && Log_1.Log.Error("Plot", 27, t, ...i);
  }
}
exports.FlowActionRunner = FlowActionRunner;
//# sourceMappingURL=FlowActionRunner.js.map
