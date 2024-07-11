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
      (this.Txn = 7),
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
                    27,
                    "开始缓存的剧情",
                    ["FlowIncId", e.FlowIncId],
                    ["FlowListName", e.FlowListName],
                    ["FlowId", e.FlowId],
                    ["StateID", e.StateId],
                  ),
                this.n$i(e))
              : (this.t$i = !0)));
      }),
      (this.Lxn = (e, t) =>
        !ModelManager_1.ModelManager.LoadingModel.IsLoading ||
        (t.FadeBegin &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Plot", 27, "Loading期间准备播剧情，提前打开黑幕"),
          ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
            0,
            3,
            void 0,
            0,
            t.FadeBegin,
            !1,
            !1,
          ),
          (t.FadeBegin = void 0)),
        !1)),
      (this.o$i = new Set(["BattleView", "PlotView", "PlotSubtitleView"])),
      (this.Dxn = (e, t) => {
        return t.UiParam?.ViewName
          ? !!UiManager_1.UiManager.IsViewShow(t.UiParam.ViewName) ||
              (!!t.CanBeAbandoned &&
                ((t.IsBreakdown = !0),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Plot",
                    27,
                    "剧情检查条件不通过，且允许被舍弃，丢了",
                    ["incId", t.FlowIncId],
                    ["flowListName", t.FlowListName],
                    ["flowId", t.FlowId],
                    ["stateId", t.StateId],
                  ),
                !0))
          : !!(t = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal)
              ?.Info?.Name) &&
              !!this.o$i.has(t) &&
              UiManager_1.UiManager.IsViewShow(t);
      }),
      (this.Axn = (e, t) =>
        !ModelManager_1.ModelManager.TeleportModel.IsTeleport),
      (this.Uxn = (e, t) =>
        !ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()),
      (this.Rxn = (e, t) => {
        var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
        return !!o && !o.IsDead();
      }),
      (this.xxn = (e, t) =>
        ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady),
      (this.Pxn = (e, t) => {
        return !(
          ("LevelC" === t.PlotLevel || t.IsWaitAnim) &&
          (this.i$i >
          ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.WaitCalmTime
            ? (this.i$i = 0)
            : (t =
                  ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.CheckGetComponent(
                    188,
                  ))?.Valid
              ? t.HasTag(-1371021686)
                ? ((this.i$i += e), 1)
                : (this.i$i = 0)
              : (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Plot",
                    27,
                    "开始剧情检查人物站立时拿不到BaseTagComponent",
                  ),
                (this.i$i = 0)))
        );
      });
  }
  OnDestroy() {}
  OnInit() {
    this.Cgo.push([0, "场景未加载完", this.Lxn]),
      this.Cgo.push([1, "界面检查不通过", this.Dxn]),
      this.Cgo.push([2, "传送未完成", this.Axn]),
      this.Cgo.push([3, "死亡或者队伍没人", this.Uxn]),
      this.Cgo.push([4, "当前角色死亡", this.Rxn]),
      this.Cgo.push([5, "编队未准备好", this.xxn]),
      this.Cgo.push([6, "人物动作还没回正", this.Pxn]),
      this.Cgo.forEach((e, t) => {
        e[0] !== t &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Plot", 27, "剧情开始检查队列顺序错误", ["index", t]);
      });
  }
  StartFlow(
    e,
    t,
    o,
    r = void 0,
    i = FlowController_1.LOCAL_FLOWINCID,
    a = !1,
    l = !1,
    n,
    s = !1,
    _ = !1,
    g,
  ) {
    var d,
      h,
      M = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(e, t, o);
    return M
      ? ((i = a ? i : FlowLaunchCenter.s$i--),
        (r = r ? LevelGeneralContextDefine_1.GeneralContext.Copy(r) : void 0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Plot",
            18,
            "StartFlow",
            ["FLowIncId", i],
            ["FlowListName", e],
            ["FlowId", t],
            ["StateId", o],
          ),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnStartFlow),
        (d = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateKeepMusic(
          e,
          t,
          o,
        )),
        (h = PlotData_1.PlotInfo.Create()).Init(
          a,
          i,
          e,
          t,
          o,
          M,
          d,
          r,
          l,
          n,
          s,
          _,
          g,
        ),
        this.r$i(h)
          ? this.n$i(h)
          : (ModelManager_1.ModelManager.PlotModel.PendingPlot(h),
            (this.t$i = !0),
            ControllerHolder_1.ControllerHolder.FlowController.CheckDisableInput(
              h.PlotLevel,
            )),
        i)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            27,
            "[StartFlow] 无法找到对应剧情的状态",
            ["FlowListName", e],
            ["FlowId", t],
            ["FlowId", t],
            ["StateId", o],
          ),
        0);
  }
  Tick(e) {
    var t;
    this.t$i &&
      ((t =
        0 <= ModelManager_1.ModelManager.PlotModel.PlotPendingList.length
          ? ModelManager_1.ModelManager.PlotModel.PlotPendingList[0]
          : void 0)
        ? this.r$i(t, e) &&
          (ModelManager_1.ModelManager.PlotModel.PlotPendingList.shift(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Plot",
              27,
              "开始缓存的剧情",
              ["FlowIncId", t.FlowIncId],
              ["FlowListName", t.FlowListName],
              ["FlowId", t.FlowId],
              ["StateID", t.StateId],
            ),
          (this.t$i = !1),
          this.n$i(t))
        : (this.t$i = !1));
  }
  r$i(e, t = 0) {
    if (!e.IsBreakdown) {
      if (7 !== this.Txn && !this.Cgo[this.Txn][2](t, e)) return !1;
      for (const o of this.Cgo)
        if (o[0] !== this.Txn && !o[2](t, e))
          return (
            (this.Txn = o[0]),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Plot",
                27,
                "剧情开始检查不通过",
                ["reason", o[1]],
                ["IncId", e.FlowIncId],
              ),
            !1
          );
    }
    return (this.Txn = 7), !0;
  }
  n$i(e) {
    if (
      (ModelManager_1.ModelManager.PlotModel.IsInInteraction &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 18, "交互中进剧情，直接结束交互"),
        ControllerHolder_1.ControllerHolder.PlotController.EndInteraction(!0)),
      ModelManager_1.ModelManager.PlotModel.CheckCanPlayNow(e))
    ) {
      ControllerHolder_1.ControllerHolder.PlotController.OnStartPlotNetwork(e);
      const t = FlowData_1.FlowContext.Create();
      t.Init(
        e.IsServerNotify,
        e.FlowListName,
        e.FlowIncId,
        e.FlowId,
        e.StateId,
        ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() ||
          ModelManager_1.ModelManager.PlotModel.IsMuteAllPlot ||
          e.IsBackground,
        e.IsBreakdown,
        e.Context,
        e.IsAsync,
        e.UiParam,
        e.Pos,
      ),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
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
                  27,
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
