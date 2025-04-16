"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowLaunchCenter = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  UiManager_1 = require("../../../Ui/UiManager"),
  UiModel_1 = require("../../../Ui/UiModel"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  PlotData_1 = require("../PlotData"),
  FlowController_1 = require("./FlowController"),
  FlowData_1 = require("./FlowData");
class FlowLaunchCenter extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.t$i = !1),
      (this.i$i = 0),
      (this.Cgo = new Array()),
      (this.Axn = 7),
      (this.StartPlotNetworkPending = () => {
        var e;
        ModelManager_1.ModelManager.PlotModel.IsInPlot ||
          (0 !== ModelManager_1.ModelManager.PlotModel.PlotPendingList.length &&
            ((e = ModelManager_1.ModelManager.PlotModel.PlotPendingList[0]),
            this.r$i(e)
              ? (ModelManager_1.ModelManager.PlotModel.PlotPendingList.shift(),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Plot",
                    26,
                    "开始缓存的剧情",
                    ["FlowIncId", e.FlowIncId],
                    ["FlowListName", e.FlowListName],
                    ["FlowId", e.FlowId],
                    ["StateID", e.StateId],
                  ),
                this.n$i(e))
              : (this.t$i = !0)));
      }),
      (this.Uxn = (e, o) =>
        !(
          ModelManager_1.ModelManager.LoadingModel.IsLoading ||
          !ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed
        ) ||
        (o.FadeBegin &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Plot", 26, "Loading期间准备播剧情，提前打开黑幕"),
          ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
            0,
            3,
            void 0,
            0,
            o.FadeBegin,
            !1,
            !1,
          ),
          (o.FadeBegin = void 0)),
        !1)),
      (this.o$i = new Set(["PlotView", "PlotSubtitleView"])),
      (this.Rxn = (e, o) => {
        return o.UiParam?.ViewName
          ? !!UiManager_1.UiManager.IsViewShow(o.UiParam.ViewName) ||
              (!!o.CanBeAbandoned &&
                ((o.IsBreakdown = !0),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Plot",
                    26,
                    "剧情检查条件不通过，且允许被舍弃，丢了",
                    ["incId", o.FlowIncId],
                    ["flowListName", o.FlowListName],
                    ["flowId", o.FlowId],
                    ["stateId", o.StateId],
                  ),
                !0))
          : !!(o =
              UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Plot)?.Info
                ?.Name ??
              UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal)
                ?.Info?.Name) &&
              (this.o$i.has(o)
                ? UiManager_1.UiManager.IsViewShow(o)
                : !!UiManager_1.UiManager.CheckIfCanShowPlotView() ||
                  !!ControllerHolder_1.ControllerHolder.BlackScreenFadeController.GetIsFadeIn());
      }),
      (this.xxn = (e, o) =>
        !ModelManager_1.ModelManager.TeleportModel.IsTeleport),
      (this.Pxn = (e, o) =>
        !ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()),
      (this.wxn = (e, o) => {
        var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
        return !!t && !t.IsDead();
      }),
      (this.Bxn = (e, o) =>
        !!ModelManager_1.ModelManager.AutoRunModel?.IsInLogicTreeGmMode() ||
        ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady),
      (this.bxn = (e, o) => {
        return (
          !!ModelManager_1.ModelManager.AutoRunModel?.IsInLogicTreeGmMode() ||
          !(
            ("LevelC" === o.PlotLevel || o.IsWaitAnim) &&
            (this.i$i >
            ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.WaitCalmTime
              ? (this.i$i = 0)
              : (o =
                    ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.CheckGetComponent(
                      203,
                    ))?.Valid
                ? o.HasTag(-1371021686)
                  ? ((this.i$i += e), 1)
                  : (this.i$i = 0)
                : (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Plot",
                      26,
                      "开始剧情检查人物站立时拿不到BaseTagComponent",
                    ),
                  (this.i$i = 0)))
          )
        );
      });
  }
  OnDestroy() {}
  OnInit() {
    this.Cgo.push([0, "场景未加载完", this.Uxn]),
      this.Cgo.push([1, "界面检查不通过", this.Rxn]),
      this.Cgo.push([2, "传送未完成", this.xxn]),
      this.Cgo.push([3, "死亡或者队伍没人", this.Pxn]),
      this.Cgo.push([4, "当前角色死亡", this.wxn]),
      this.Cgo.push([5, "编队未准备好", this.Bxn]),
      this.Cgo.push([6, "人物动作还没回正", this.bxn]),
      this.Cgo.forEach((e, o) => {
        e[0] !== o &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Plot", 26, "剧情开始检查队列顺序错误", ["index", o]);
      });
  }
  StartFlow(
    e,
    o,
    t,
    r = void 0,
    a = FlowController_1.LOCAL_FLOWINCID,
    l = !1,
    i = !1,
    n,
    s = !1,
    _ = !1,
    g,
  ) {
    var M,
      d,
      h = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(e, o, t);
    return h
      ? ((a = l ? a : FlowLaunchCenter.s$i--),
        (r = r ? LevelGeneralContextDefine_1.GeneralContext.Copy(r) : void 0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Plot",
            17,
            "StartFlow",
            ["FLowIncId", a],
            ["FlowListName", e],
            ["FlowId", o],
            ["StateId", t],
          ),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnStartFlow),
        (M = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateKeepMusic(
          e,
          o,
          t,
        )),
        (d = PlotData_1.PlotInfo.Create()).Init(
          l,
          a,
          e,
          o,
          t,
          h,
          M,
          r,
          i,
          n,
          s,
          _,
          g,
        ),
        this.r$i(d)
          ? this.n$i(d)
          : (ModelManager_1.ModelManager.PlotModel.PendingPlot(d),
            (this.t$i = !0),
            ControllerHolder_1.ControllerHolder.FlowController.CheckDisableInput(
              d.PlotLevel,
            )),
        a)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            26,
            "[StartFlow] 无法找到对应剧情的状态",
            ["FlowListName", e],
            ["FlowId", o],
            ["FlowId", o],
            ["StateId", t],
          ),
        0);
  }
  Tick(e) {
    var o;
    this.t$i &&
      ((o =
        0 <= ModelManager_1.ModelManager.PlotModel.PlotPendingList.length
          ? ModelManager_1.ModelManager.PlotModel.PlotPendingList[0]
          : void 0)
        ? this.r$i(o, e) &&
          (ModelManager_1.ModelManager.PlotModel.PlotPendingList.shift(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Plot",
              26,
              "开始缓存的剧情",
              ["FlowIncId", o.FlowIncId],
              ["FlowListName", o.FlowListName],
              ["FlowId", o.FlowId],
              ["StateID", o.StateId],
            ),
          (this.t$i = !1),
          this.n$i(o))
        : (this.t$i = !1));
  }
  r$i(e, o = 0) {
    if (!e.IsBreakdown) {
      if (7 !== this.Axn && !this.Cgo[this.Axn][2](o, e)) return !1;
      for (const t of this.Cgo)
        if (t[0] !== this.Axn && !t[2](o, e))
          return (
            (this.Axn = t[0]),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Plot",
                26,
                "剧情开始检查不通过",
                ["reason", t[1]],
                ["IncId", e.FlowIncId],
              ),
            !1
          );
    }
    return (this.Axn = 7), !0;
  }
  n$i(e) {
    if (
      (ModelManager_1.ModelManager.PlotModel.IsInInteraction &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 17, "交互中进剧情，直接结束交互"),
        ControllerHolder_1.ControllerHolder.PlotController.EndInteraction(!0)),
      ModelManager_1.ModelManager.PlotModel.CheckCanPlayNow(e))
    ) {
      ControllerHolder_1.ControllerHolder.PlotController.OnStartPlotNetwork(e);
      var o =
        ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() ||
        ModelManager_1.ModelManager.PlotModel.IsMuteAllPlot ||
        e.IsBackground;
      o &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Plot",
          26,
          "剧情开始时被跳过",
          [
            "IsInLogicTreeGmMode",
            ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode(),
          ],
          [
            "IsMuteAllPlot",
            ModelManager_1.ModelManager.PlotModel.IsMuteAllPlot,
          ],
          ["IsBackground", e.IsBackground],
        );
      const t = FlowData_1.FlowContext.Create();
      t.Init(
        e.IsServerNotify,
        e.FlowListName,
        e.FlowIncId,
        e.FlowId,
        e.StateId,
        o,
        e.IsBreakdown,
        e.Context,
        e.IsAsync,
        e.UiParam,
        e.Pos,
        e.KeepMainRolePose,
      ),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            26,
            "剧情行为组开始",
            ["id", t.FormatId],
            ["num", e.StateActions.length],
          ),
        ControllerHolder_1.ControllerHolder.FlowController.ExecuteActions(
          e.StateActions,
          t,
          () => {
            ControllerHolder_1.ControllerHolder.PlotController.OnEndPlotNetwork(),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Plot",
                  26,
                  "EndFlow",
                  ["incId", t.FlowIncId],
                  ["id", t.FormatId],
                  ["IsSkip", t.IsBackground],
                ),
              t.Recycle(),
              this.StartPlotNetworkPending();
          },
        ),
        e.Recycle();
    }
  }
}
(exports.FlowLaunchCenter = FlowLaunchCenter).s$i = -1;
//# sourceMappingURL=FlowLaunchCenter.js.map
