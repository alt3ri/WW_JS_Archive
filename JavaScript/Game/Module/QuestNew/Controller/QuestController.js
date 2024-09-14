"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestNewController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PreloadConfigStatementPart1_1 = require("../../../Preload/PreloadConfigStatementPart1"),
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
      Net_1.Net.Register(29208, QuestNewController.wro),
      Net_1.Net.Register(20797, QuestNewController.Bro),
      Net_1.Net.Register(23323, QuestNewController.bro),
      Net_1.Net.Register(22421, QuestNewController.qro),
      Net_1.Net.Register(22294, QuestNewController.Gro),
      Net_1.Net.Register(15835, QuestNewController.Nro),
      Net_1.Net.Register(19875, QuestNewController.OOa),
      Net_1.Net.Register(28782, QuestNewController.GOa);
  }
  static OnUnRegisterNetEvent() {
    super.OnUnRegisterNetEvent(),
      Net_1.Net.UnRegister(29208),
      Net_1.Net.UnRegister(20797),
      Net_1.Net.UnRegister(23323),
      Net_1.Net.UnRegister(22421),
      Net_1.Net.UnRegister(22294),
      Net_1.Net.UnRegister(19875),
      Net_1.Net.UnRegister(28782);
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
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "QuestView",
        QuestNewController.iVe,
        "QuestNewController.CanOpenView",
      );
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
      this.N3a &&
        ((this.F3a += e),
        (t = MathUtils_1.MathUtils.SafeDivide(this.fza - this.F3a, this.fza)),
        (t = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
        SceneEffectStateManager_1.default.SetSceneEffectState(0, t),
        this.F3a > this.fza) &&
        (SceneEffectStateManager_1.default.SetSceneEffectState(0, 0),
        (this.N3a = !1)),
      this.V3a &&
        ((this.H3a += e),
        (t = MathUtils_1.MathUtils.SafeDivide(this.H3a, this.fza)),
        (t = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
        SceneEffectStateManager_1.default.SetSceneEffectState(0, t),
        this.H3a > this.fza) &&
        (SceneEffectStateManager_1.default.SetSceneEffectState(0, 1),
        (this.V3a = !1)),
      this.pza) &&
      ((this.vza += e),
      (t =
        PreloadConfigStatementPart1_1.configCommonParamById.GetIntConfig(
          "CloseQuestRangeFailWarningTime",
        ) ?? 3e4),
      this.vza > t) &&
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
      (t = ModelManager_1.ModelManager.MapModel.GetMark(t[0], t[1])) instanceof
        MapDefine_1.QuestMarkCreateInfo
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
        OpenAreaId: 0,
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
    Net_1.Net.Call(28672, e, (e) => {
      e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.BEs,
          19598,
        ),
        ModelManager_1.ModelManager.QuestNewModel.SetQuestRedDot(t, 1 === r);
    });
  }
  static IsTrackItemOutFailRange(e) {
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
      ) && t?.IsOutFailRange(e.WorldPosition)
    );
  }
}
(exports.QuestNewController = QuestNewController),
  ((_a = QuestNewController).Vro = void 0),
  (QuestNewController.QuestRangeFailWarningTreeId = 0),
  (QuestNewController.N3a = !1),
  (QuestNewController.F3a = 0),
  (QuestNewController.V3a = !1),
  (QuestNewController.H3a = 0),
  (QuestNewController.pza = !1),
  (QuestNewController.vza = 0),
  (QuestNewController.fza = 300),
  (QuestNewController.Oro = () => {
    QuestNewController.cYt(1).RefreshCurTrackQuest(),
      QuestNewController.cYt(3).CreateMarksOnWakeUp(),
      _a.Vro && (_a.Nro(_a.Vro), (_a.Vro = void 0));
  }),
  (QuestNewController.wro = (e) => {
    for (const r of e.JBs) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Quest", 19, "上线下发进行中的任务", ["任务id", r.B5n]);
      var t = ModelManager_1.ModelManager.QuestNewModel.AddQuest(r.B5n);
      t && t.UpdateState(r.H6n, 0);
    }
  }),
  (QuestNewController.Bro = (e) => {
    var t,
      r,
      o = QuestNewController.Fro(),
      a = ModelManager_1.ModelManager.QuestNewModel;
    for (const s of e.B5n) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Quest", 19, "下发可接任务", ["任务id", s]);
      let e = a.GetQuest(s);
      e ||
        ((t = a.GetQuestConfig(s)) &&
          (t = t.AddInteractOption) &&
          (t &&
          o !== s &&
          ((t = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(
            t.EntityId,
          )),
          (t = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(t)),
          (r = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId()),
          (r = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(r)),
          t) &&
          r &&
          t !== r
            ? a.AddCanAcceptQuest(s)
            : (e = a.AddQuest(s))?.UpdateState(
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
        s = ModelManager_1.ModelManager.QuestNewModel;
      for ([r, o] of s.GetCanAcceptQuest())
        if (o) {
          var n = s.GetQuestConfig(r);
          if (n) {
            n = n.AddInteractOption;
            if (n) {
              n = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(
                n.EntityId,
              );
              if (
                ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(
                  n,
                ) === t ||
                a === r
              ) {
                if (s.GetQuest(r)) return;
                s.AddQuest(r)?.UpdateState(Protocol_1.Aki.Protocol.hTs.CTs, 0);
              } else s.RemoveQuest(r);
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
        Log_1.Log.Info("Quest", 19, "下发提前显示的任务", ["任务id", r]),
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
          19,
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
              19,
              "任务状态更新时：任务不存在",
              ["任务Id", e.B5n],
              ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.Y4n],
            );
        break;
      case Protocol_1.Aki.Protocol.hTs.Proto_Finish:
        ModelManager_1.ModelManager.QuestNewModel.AddFinishedQuest(e.B5n);
        t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.B5n);
        t
          ? t.UpdateState(e.Y4n, 1)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              19,
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
              19,
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
          case Protocol_1.Aki.Protocol.hTs.Proto_Finish:
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
  (QuestNewController.OOa = (e) => {
    (e = MathUtils_1.MathUtils.LongToBigInt(e.C9n)),
      (_a.QuestRangeFailWarningTreeId = e),
      (_a.N3a = !1),
      (_a.V3a = !0),
      (_a.pza = !0),
      (_a.H3a = 0),
      (_a.vza = 0),
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
  (QuestNewController.GOa = (e) => {
    _a.pza && _a.HideCancelRangeFailWaringEffect();
  }),
  (QuestNewController.HideCancelRangeFailWaringEffect = () => {
    (_a.N3a = !0),
      (_a.V3a = !1),
      (_a.F3a = 0),
      (_a.QuestRangeFailWarningTreeId = 0),
      (_a.pza = !1);
  });
//# sourceMappingURL=QuestController.js.map
