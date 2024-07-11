"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowLaunchCenter = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiManager_1 = require("../../../Ui/UiManager");
const UiModel_1 = require("../../../Ui/UiModel");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const PlotData_1 = require("../PlotData");
const FlowController_1 = require("./FlowController");
const FlowData_1 = require("./FlowData");
class FlowLaunchCenter extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.oXi = !1),
      (this.rXi = 0),
      (this.pCo = new Array()),
      (this.MAn = 7),
      (this.StartPlotNetworkPending = () => {
        let e;
        ModelManager_1.ModelManager.PlotModel.IsInPlot ||
          (ModelManager_1.ModelManager.PlotModel.PlotPendingList.length !== 0 &&
            ((e = ModelManager_1.ModelManager.PlotModel.PlotPendingList[0]),
            this.sXi(e)
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
                this.aXi(e))
              : (this.oXi = !0)));
      }),
      (this.SAn = (e, t) =>
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
      (this.nXi = new Set(["BattleView", "PlotView", "PlotSubtitleView"])),
      (this.EAn = (e, t) => {
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
              !!this.nXi.has(t) &&
              UiManager_1.UiManager.IsViewShow(t);
      }),
      (this.yAn = (e, t) =>
        !ModelManager_1.ModelManager.TeleportModel.IsTeleport),
      (this.IAn = (e, t) =>
        !ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()),
      (this.TAn = (e, t) => {
        const o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
        return !!o && !o.IsDead();
      }),
      (this.LAn = (e, t) =>
        ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady),
      (this.DAn = (e, t) => {
        return !(
          (t.PlotLevel === "LevelC" || t.IsWaitAnim) &&
          (this.rXi >
          ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.WaitCalmTime
            ? (this.rXi = 0)
            : (t =
                  ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.CheckGetComponent(
                    185,
                  ))?.Valid
              ? t.HasTag(-1371021686)
                ? ((this.rXi += e), 1)
                : (this.rXi = 0)
              : (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Plot",
                    27,
                    "开始剧情检查人物站立时拿不到BaseTagComponent",
                  ),
                (this.rXi = 0)))
        );
      });
  }
  OnDestroy() {}
  OnInit() {
    this.pCo.push([0, "场景未加载完", this.SAn]),
      this.pCo.push([1, "界面检查不通过", this.EAn]),
      this.pCo.push([2, "传送未完成", this.yAn]),
      this.pCo.push([3, "死亡或者队伍没人", this.IAn]),
      this.pCo.push([4, "当前角色死亡", this.TAn]),
      this.pCo.push([5, "编队未准备好", this.LAn]),
      this.pCo.push([6, "人物动作还没回正", this.DAn]),
      this.pCo.forEach((e, t) => {
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
    a = FlowController_1.LOCAL_FLOWINCID,
    i = !1,
    l = !1,
    n,
    s = !1,
    _ = !1,
    g,
  ) {
    let d;
    let h;
    const M = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(
      e,
      t,
      o,
    );
    return M
      ? ((a = i ? a : FlowLaunchCenter.hXi--),
        (r = r
          ? LevelGeneralContextDefine_1.GeneralContext.Copy(r)
          : LevelGeneralContextDefine_1.QuestContext.Create()),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Plot",
            18,
            "StartFlow",
            ["FLowIncId", a],
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
          i,
          a,
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
        this.sXi(h)
          ? this.aXi(h)
          : (ModelManager_1.ModelManager.PlotModel.PendingPlot(h),
            (this.oXi = !0),
            ControllerHolder_1.ControllerHolder.FlowController.CheckDisableInput(
              h.PlotLevel,
            )),
        a)
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
    let t;
    this.oXi &&
      ((t =
        ModelManager_1.ModelManager.PlotModel.PlotPendingList.length >= 0
          ? ModelManager_1.ModelManager.PlotModel.PlotPendingList[0]
          : void 0)
        ? this.sXi(t, e) &&
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
          this.aXi(t),
          (this.oXi = !1))
        : (this.oXi = !1));
  }
  sXi(e, t = 0) {
    if (!e.IsBreakdown) {
      if (this.MAn !== 7 && !this.pCo[this.MAn][2](t, e)) return !1;
      for (const o of this.pCo)
        if (o[0] !== this.MAn && !o[2](t, e))
          return (
            (this.MAn = o[0]),
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
    return (this.MAn = 7), !0;
  }
  aXi(e) {
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
(exports.FlowLaunchCenter = FlowLaunchCenter).hXi = -1;
// # sourceMappingURL=FlowLaunchCenter.js.map
