"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestNewController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  VideoUpdateManager_1 = require("../../../../Launcher/Update/VideoUpdateManager"),
  LauncherStorageLib_1 = require("../../../../Launcher/Util/LauncherStorageLib"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SceneEffectStateManager_1 = require("../../../Render/Effect/PostProcess/SceneEffectStateManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ControllerWithAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase"),
  MapDefine_1 = require("../../Map/MapDefine"),
  DailyQuestAssistant_1 = require("./DailyQuestAssistant"),
  GuideEffectAssistant_1 = require("./GuideEffectAssistant"),
  GuideLineAssistant_1 = require("./GuideLineAssistant"),
  QuestTrackAssistant_1 = require("./QuestTrackAssistant"),
  TIPS_NAME = "QuestRangeFailWarning",
  assistantMap = { [0]: void 0, 1: void 0, 2: void 0, 3: void 0 };
class QuestNewController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnRegisterNetEvent() {
    super.OnRegisterNetEvent(),
      Net_1.Net.Register(24987, QuestNewController.wro),
      Net_1.Net.Register(24211, QuestNewController.Bro),
      Net_1.Net.Register(26951, QuestNewController.bro),
      Net_1.Net.Register(19978, QuestNewController.qro),
      Net_1.Net.Register(21713, QuestNewController.Gro),
      Net_1.Net.Register(17765, QuestNewController.Nro),
      Net_1.Net.Register(15211, QuestNewController.kka),
      Net_1.Net.Register(15452, QuestNewController.Nka),
      Net_1.Net.Register(17420, QuestNewController.mgl),
      Net_1.Net.Register(15488, QuestNewController.ob1);
  }
  static OnUnRegisterNetEvent() {
    super.OnUnRegisterNetEvent(),
      Net_1.Net.UnRegister(24987),
      Net_1.Net.UnRegister(24211),
      Net_1.Net.UnRegister(26951),
      Net_1.Net.UnRegister(19978),
      Net_1.Net.UnRegister(21713),
      Net_1.Net.UnRegister(15211),
      Net_1.Net.UnRegister(15452),
      Net_1.Net.UnRegister(17420),
      Net_1.Net.UnRegister(15488);
  }
  static OnInit() {
    return this.InitTickOptimize(30, -1), super.OnInit();
  }
  static OnAddEvents() {
    super.OnAddEvents(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
        QuestNewController.Oro,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.DSe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeArea,
        this.kro,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.kro,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.Yht,
      ),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "QuestView",
        QuestNewController.iVe,
        "QuestNewController.CanOpenView",
      ),
      VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
        3,
      ).SetDownloadFinishCallBack(QuestNewController.nb1),
      VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
        4,
      ).SetDownloadFinishCallBack(QuestNewController.nb1);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
      QuestNewController.Oro,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.DSe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeArea,
        this.kro,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.kro,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.Yht,
      ),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "QuestView",
        QuestNewController.iVe,
      ),
      super.OnRemoveEvents();
  }
  static OnTick(e) {
    var t;
    ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp &&
      (QuestNewController.cYt(0)?.Tick(e),
      QuestNewController.cYt(2)?.UpdateQuestGuideEffect(e),
      this.v6a &&
        ((this.M6a += e),
        (t = MathUtils_1.MathUtils.SafeDivide(this.Dih - this.M6a, this.Dih)),
        (t = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
        SceneEffectStateManager_1.default.SetSceneEffectState(0, t),
        this.M6a > this.Dih) &&
        (SceneEffectStateManager_1.default.SetSceneEffectState(0, 0),
        (this.v6a = !1)),
      this.S6a &&
        ((this.E6a += e),
        (t = MathUtils_1.MathUtils.SafeDivide(this.E6a, this.Dih)),
        (t = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
        SceneEffectStateManager_1.default.SetSceneEffectState(0, t),
        this.E6a > this.Dih) &&
        (SceneEffectStateManager_1.default.SetSceneEffectState(0, 1),
        (this.S6a = !1)),
      this.Rih) &&
      ((this.Uih += e),
      (t =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "CloseQuestRangeFailWarningTime",
        ) ?? 3e4),
      this.Uih > t) &&
      this.HideCancelRangeFailWaringEffect();
  }
  static RegisterAssistant() {
    this.AddAssistant(
      0,
      new GuideLineAssistant_1.GuideLineAssistant(
        Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest,
      ),
    ),
      this.AddAssistant(1, new QuestTrackAssistant_1.QuestTrackAssistant()),
      this.AddAssistant(2, new GuideEffectAssistant_1.GuideEffectAssistant()),
      this.AddAssistant(3, new DailyQuestAssistant_1.DailyQuestAssistant());
  }
  static cYt(e) {
    if (this.Assistants) return this.Assistants.get(e);
  }
  static AddQuestTraceEffect(e, t, r) {
    QuestNewController.cYt(2).AddQuestTraceEffect(e, t, r);
  }
  static RemoveQuestTraceEffect(e, t) {
    QuestNewController.cYt(2).RemoveQuestTraceEffect(e, t);
  }
  static ClearQuestTraceEffect(e) {
    QuestNewController.cYt(2).ClearQuestTraceEffect(e);
  }
  static Fro() {
    let e = 0;
    var t = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
    return (e =
      t &&
      (t = ModelManager_1.ModelManager.MapModel.GetMark(
        t.MarkType,
        t.MarkId,
      )) instanceof MapDefine_1.QuestMarkCreateInfo
        ? t.TreeId
        : e);
  }
  static RequestTrackQuest(e, t, r, o = 0, a) {
    QuestNewController.cYt(1).RequestTrackQuest(e, t, r, o, a);
  }
  static TryTrackAndOpenWorldMap(t) {
    var e = () => {
      var e = {
        MarkId:
          ModelManager_1.ModelManager.QuestNewModel?.TryGetMapMarkIdByQuestId(
            t,
          ),
        MarkType: 12,
        OpenFogId: 0,
      };
      ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, !1, e);
    };
    ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(t)
      ? e()
      : QuestNewController.RequestTrackQuest(t, !0, 2, 0, e);
  }
  static TryChangeTrackedQuest(e) {
    return QuestNewController.cYt(1).TryChangeTrackedQuest(e);
  }
  static TryChangeTrackedQuest2(e) {
    return QuestNewController.cYt(1).TryChangeTrackedQuest2(e);
  }
  static RedDotRequest(t, r) {
    var e = Protocol_1.Aki.Protocol.O1s.create({ B5n: t, gHn: r });
    Net_1.Net.Call(25770, e, (e) => {
      e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.BEs,
          26327,
        ),
        ModelManager_1.ModelManager.QuestNewModel.SetQuestRedDot(t, 1 === r);
    });
  }
  static IsTrackPositionOutFailRange(e) {
    var t = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
    return (
      !(
        !t ||
        void 0 === t.TreeId ||
        !(t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
          t.TreeId,
        )) ||
        !(t = t.GetProcessingFailedNode()) ||
        t.NeedRequiresSecondConfirmation
      ) && t?.IsOutFailRange(e)
    );
  }
  static ConfirmQuestResourceRequest(t, r) {
    var e = Protocol_1.Aki.Protocol.ts1.create({ a2s: [t] });
    Net_1.Net.Call(24388, e, (e) => {
      e &&
        (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.BEs,
            26327,
          ),
        ModelManager_1.ModelManager.QuestNewModel.RemoveLackResourceQuest(t),
        r) &&
        r();
    });
  }
}
(exports.QuestNewController = QuestNewController),
  ((_a = QuestNewController).Vro = void 0),
  (QuestNewController.QuestRangeFailWarningTreeId = 0),
  (QuestNewController.v6a = !1),
  (QuestNewController.M6a = 0),
  (QuestNewController.S6a = !1),
  (QuestNewController.E6a = 0),
  (QuestNewController.Rih = !1),
  (QuestNewController.Uih = 0),
  (QuestNewController.Dih = 300),
  (QuestNewController.Oro = () => {
    QuestNewController.cYt(1).RefreshCurTrackQuest(),
      QuestNewController.cYt(3).CreateMarksOnWakeUp(),
      _a.Vro && (_a.Nro(_a.Vro), (_a.Vro = void 0));
  }),
  (QuestNewController.wro = (e) => {
    for (const r of e.JBs) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Quest", 18, "上线下发进行中的任务", ["任务id", r.B5n]);
      var t = ModelManager_1.ModelManager.QuestNewModel.AddQuest(r.B5n);
      t && t.UpdateState(r.H6n, 0);
    }
  }),
  (QuestNewController.Bro = (e) => {
    var t,
      r,
      o = QuestNewController.Fro(),
      a = ModelManager_1.ModelManager.QuestNewModel;
    for (const n of e.B5n) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Quest", 18, "下发可接任务", ["任务id", n]);
      let e = a.GetQuest(n);
      e ||
        ((t = a.GetQuestConfig(n)) &&
          (t = t.AddInteractOption) &&
          (t &&
          o !== n &&
          ((t = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(
            t.EntityId,
          )),
          (t = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(t)),
          (r = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId()),
          (r = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(r)),
          t) &&
          r &&
          t !== r
            ? a.AddCanAcceptQuest(n)
            : (e = a.AddQuest(n))?.UpdateState(
                Protocol_1.Aki.Protocol.hTs.CTs,
                0,
              )));
    }
  }),
  (QuestNewController.kro = () => {
    var e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(),
      t = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(e);
    if (t) {
      var r,
        o,
        a = QuestNewController.Fro(),
        n = ModelManager_1.ModelManager.QuestNewModel;
      for ([r, o] of n.GetCanAcceptQuest())
        if (o) {
          var s = n.GetQuestConfig(r);
          if (s) {
            var l = s.AddInteractOption;
            if (l) {
              l = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(
                l.EntityId,
                s?.DungeonId,
              );
              if (
                ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(
                  l,
                ) === t ||
                a === r
              ) {
                if (n.GetQuest(r)) return;
                n.AddQuest(r)?.UpdateState(Protocol_1.Aki.Protocol.hTs.CTs, 0);
              } else n.RemoveQuest(r);
            }
          }
        }
    }
  }),
  (QuestNewController.bro = (e) => {
    var t;
    for ([t] of ModelManager_1.ModelManager.QuestNewModel.GetPreShowQuests())
      e.B5n.indexOf(t) < 0 &&
        ModelManager_1.ModelManager.QuestNewModel.RemovePreShowQuest(t);
    for (const r of e.B5n)
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Quest", 18, "下发提前显示的任务", ["任务id", r]),
        ModelManager_1.ModelManager.QuestNewModel.AddPreShowQuest(r);
  }),
  (QuestNewController.Gro = (e) => {
    for (const t of e.B5n)
      ModelManager_1.ModelManager.QuestNewModel.AddFinishedQuest(t);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnQuestFinishListNotify,
    ),
      _a.TryChangeTrackedQuest2(void 0);
  }),
  (QuestNewController.qro = (e) => {
    switch (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Quest",
          18,
          "任务状态更新",
          ["任务Id", e.B5n],
          ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.Y4n],
        ),
      e.Y4n)
    ) {
      case Protocol_1.Aki.Protocol.hTs.Proto_InActive:
      case Protocol_1.Aki.Protocol.hTs.CTs:
      case Protocol_1.Aki.Protocol.hTs.nvs:
        var t = ModelManager_1.ModelManager.QuestNewModel.AddQuest(e.B5n);
        t
          ? t.UpdateState(e.Y4n, 1)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              18,
              "任务状态更新时：任务不存在",
              ["任务Id", e.B5n],
              ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.Y4n],
            );
        break;
      case Protocol_1.Aki.Protocol.hTs.a3_:
        ModelManager_1.ModelManager.QuestNewModel.AddFinishedQuest(e.B5n);
        t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.B5n);
        t
          ? t.UpdateState(e.Y4n, 1)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              18,
              "任务状态更新时：任务不存在",
              ["任务Id", e.B5n],
              ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.Y4n],
            );
        break;
      case Protocol_1.Aki.Protocol.hTs.Proto_Delete:
        t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.B5n);
        t
          ? (ModelManager_1.ModelManager.QuestNewModel.RemoveQuest(e.B5n),
            t.UpdateState(e.Y4n, 1))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              18,
              "任务状态更新时：任务不存在",
              ["任务Id", e.B5n],
              ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.Y4n],
            );
    }
  }),
  (QuestNewController.iVe = (e) =>
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10004)),
  (QuestNewController.DSe = (e, t, r) => {
    var o = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (o) {
      o = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfig(
        o.Type,
      );
      if (o && o.NeedRedDot && 1 === r)
        switch (t) {
          case Protocol_1.Aki.Protocol.hTs.nvs:
            QuestNewController.RedDotRequest(e, 1);
            break;
          case Protocol_1.Aki.Protocol.hTs.a3_:
          case Protocol_1.Aki.Protocol.hTs.Proto_Delete:
            QuestNewController.RedDotRequest(e, 0);
        }
    }
  }),
  (QuestNewController.Nro = (e) => {
    if (ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp)
      for (const t of e.B5n)
        ModelManager_1.ModelManager.QuestNewModel.SetQuestRedDot(t, !0);
    else _a.Vro = e;
  }),
  (QuestNewController.kka = (e) => {
    (e = MathUtils_1.MathUtils.LongToBigInt(e.C9n)),
      (_a.QuestRangeFailWarningTreeId = e),
      (_a.v6a = !1),
      (_a.S6a = !0),
      (_a.Rih = !0),
      (_a.E6a = 0),
      (_a.Uih = 0),
      (e =
        ControllerHolder_1.ControllerHolder.GenericPromptController.GetViewNameByPromptId(
          TIPS_NAME,
        ));
    e &&
      !UiManager_1.UiManager.IsViewOpen(e) &&
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        TIPS_NAME,
      );
  }),
  (QuestNewController.mgl = (e) => {
    var t = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
      t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
    t && t.StopCurrentActions();
    let r = !1;
    var o = ControllerHolder_1.ControllerHolder.FlowController.GetFlowIncId();
    for (const a of e.YE_)
      if (o === MathUtils_1.MathUtils.LongToNumber(a)) {
        r = !0;
        break;
      }
    ModelManager_1.ModelManager.PlotModel.IsInPlot && r
      ? (ControllerHolder_1.ControllerHolder.FlowController.FinishFlow(
          "任务结束打断剧情",
        ),
        (ModelManager_1.ModelManager.QuestNewModel.IsServerNotifyEnd = !0),
        (ModelManager_1.ModelManager.QuestNewModel.ServerNotifyEndQuestId =
          e.B5n))
      : (((t = new Protocol_1.Aki.Protocol.gg_()).B5n =
          ModelManager_1.ModelManager.QuestNewModel.ServerNotifyEndQuestId),
        Net_1.Net.Call(21825, t, (e) => {
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              19735,
            );
        }));
  }),
  (QuestNewController.Yht = () => {
    var e;
    ModelManager_1.ModelManager.QuestNewModel.IsServerNotifyEnd &&
      ((ModelManager_1.ModelManager.QuestNewModel.IsServerNotifyEnd = !1),
      ((e = new Protocol_1.Aki.Protocol.gg_()).B5n =
        ModelManager_1.ModelManager.QuestNewModel.ServerNotifyEndQuestId),
      Net_1.Net.Call(21825, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            19735,
          );
      }));
  }),
  (QuestNewController.Nka = (e) => {
    _a.Rih && _a.HideCancelRangeFailWaringEffect();
  }),
  (QuestNewController.HideCancelRangeFailWaringEffect = () => {
    (_a.v6a = !0),
      (_a.S6a = !1),
      (_a.M6a = 0),
      (_a.QuestRangeFailWarningTreeId = 0),
      (_a.Rih = !1);
  }),
  (QuestNewController.ob1 = (e) => {
    var t = ModelManager_1.ModelManager.QuestNewModel;
    for (const r of e.a2s) t.AddLackResourceQuest(r);
    0 === e.a2s.length ||
      t.QuestVideoResourceDownloadFinished ||
      (t.IsLackQuestVideoResource = !0);
  }),
  (QuestNewController.nb1 = (e) => {
    switch (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()) {
      case 1:
        4 === e &&
          ((ModelManager_1.ModelManager.QuestNewModel.IsLackQuestVideoResource =
            !1),
          (ModelManager_1.ModelManager.QuestNewModel.QuestVideoResourceDownloadFinished =
            !0));
        break;
      case 0:
        3 === e &&
          ((ModelManager_1.ModelManager.QuestNewModel.IsLackQuestVideoResource =
            !1),
          (ModelManager_1.ModelManager.QuestNewModel.QuestVideoResourceDownloadFinished =
            !0));
    }
    const t = LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
      LauncherStorageLib_1.ELauncherStorageDeviceKey.UserSelectedVideoUpdate,
      0,
    );
    var r = Protocol_1.Aki.Protocol.CL1.create({ QR1: t });
    Net_1.Net.Call(28810, r, (e) => {
      e &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Quest", 38, "通知服务器任务资源下载完成", [
          "新状态",
          t,
        ]);
    });
  });
//# sourceMappingURL=QuestController.js.map
