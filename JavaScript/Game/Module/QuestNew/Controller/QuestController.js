"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestNewController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ControllerWithAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase"),
  MapDefine_1 = require("../../Map/MapDefine"),
  DailyQuestAssistant_1 = require("./DailyQuestAssistant"),
  GuideEffectAssistant_1 = require("./GuideEffectAssistant"),
  GuideLineAssistant_1 = require("./GuideLineAssistant"),
  QuestTrackAssistant_1 = require("./QuestTrackAssistant"),
  assistantMap = { [0]: void 0, 1: void 0, 2: void 0, 3: void 0 };
class QuestNewController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnRegisterNetEvent() {
    super.OnRegisterNetEvent(),
      Net_1.Net.Register(27409, QuestNewController.wro),
      Net_1.Net.Register(25266, QuestNewController.Bro),
      Net_1.Net.Register(20913, QuestNewController.bro),
      Net_1.Net.Register(16264, QuestNewController.qro),
      Net_1.Net.Register(11540, QuestNewController.Gro),
      Net_1.Net.Register(28262, QuestNewController.Nro),
      Net_1.Net.Register(9477, QuestNewController.qSa);
  }
  static OnUnRegisterNetEvent() {
    super.OnUnRegisterNetEvent(),
      Net_1.Net.UnRegister(27409),
      Net_1.Net.UnRegister(25266),
      Net_1.Net.UnRegister(20913),
      Net_1.Net.UnRegister(16264),
      Net_1.Net.UnRegister(11540),
      Net_1.Net.UnRegister(9477);
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
    ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp &&
      (QuestNewController.cYt(0)?.Tick(e),
      QuestNewController.cYt(2)?.UpdateQuestGuideEffect(e));
  }
  static RegisterAssistant() {
    this.AddAssistant(
      0,
      new GuideLineAssistant_1.GuideLineAssistant(
        Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest,
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
  static RequestTrackQuest(e, t, r, o = 0, s) {
    QuestNewController.cYt(1).RequestTrackQuest(e, t, r, o, s);
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
  static RedDotRequest(t, r) {
    var e = Protocol_1.Aki.Protocol.U1s.create({ I5n: t, aHn: r });
    Net_1.Net.Call(19599, e, (e) => {
      e.DEs !== Protocol_1.Aki.Protocol.O4n.NRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.DEs,
          17338,
        ),
        ModelManager_1.ModelManager.QuestNewModel.SetQuestRedDot(t, 1 === r);
    });
  }
}
(exports.QuestNewController = QuestNewController),
  ((_a = QuestNewController).Vro = void 0),
  (QuestNewController.Oro = () => {
    QuestNewController.cYt(1).RefreshCurTrackQuest(),
      QuestNewController.cYt(3).CreateMarksOnWakeUp(),
      _a.Vro && (_a.Nro(_a.Vro), (_a.Vro = void 0));
  }),
  (QuestNewController.wro = (e) => {
    for (const r of e.HBs) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Quest", 19, "上线下发进行中的任务", ["任务id", r.I5n]);
      var t = ModelManager_1.ModelManager.QuestNewModel.AddQuest(r.I5n);
      t && t.UpdateState(r.w6n, 0);
    }
  }),
  (QuestNewController.Bro = (e) => {
    var t,
      r,
      o = QuestNewController.Fro(),
      s = ModelManager_1.ModelManager.QuestNewModel;
    for (const a of e.I5n) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Quest", 19, "下发可接任务", ["任务id", a]);
      let e = s.GetQuest(a);
      e ||
        ((t = s.GetQuestConfig(a)) &&
          (t = t.AddInteractOption) &&
          (t &&
          o !== a &&
          ((t = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(
            t.EntityId,
          )),
          (t = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(t)),
          (r = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId()),
          (r = ConfigManager_1.ConfigManager.AreaConfig?.GetLevelOneAreaId(r)),
          t) &&
          r &&
          t !== r
            ? s.AddCanAcceptQuest(a)
            : (e = s.AddQuest(a))?.UpdateState(
                Protocol_1.Aki.Protocol.tTs.hTs,
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
        s = QuestNewController.Fro(),
        a = ModelManager_1.ModelManager.QuestNewModel;
      for ([r, o] of a.GetCanAcceptQuest())
        if (o) {
          var n = a.GetQuestConfig(r);
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
                s === r
              ) {
                if (a.GetQuest(r)) return;
                a.AddQuest(r)?.UpdateState(Protocol_1.Aki.Protocol.tTs.hTs, 0);
              } else a.RemoveQuest(r);
            }
          }
        }
    }
  }),
  (QuestNewController.bro = (e) => {
    for (const t of e.I5n)
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Quest", 19, "下发提前显示的任务", ["任务id", t]),
        ModelManager_1.ModelManager.QuestNewModel.AddQuest(t);
  }),
  (QuestNewController.Gro = (e) => {
    for (const t of e.I5n)
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Quest", 19, "上线下发已完成任务", ["任务id", t]),
        ModelManager_1.ModelManager.QuestNewModel.AddFinishedQuest(t);
  }),
  (QuestNewController.qro = (e) => {
    switch (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Quest",
          19,
          "任务状态更新",
          ["任务Id", e.I5n],
          ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.F4n],
        ),
      e.F4n)
    ) {
      case Protocol_1.Aki.Protocol.tTs.Proto_InActive:
      case Protocol_1.Aki.Protocol.tTs.hTs:
      case Protocol_1.Aki.Protocol.tTs.zfs:
        var t = ModelManager_1.ModelManager.QuestNewModel.AddQuest(e.I5n);
        t
          ? t.UpdateState(e.F4n, 1)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              19,
              "任务状态更新时：任务不存在",
              ["任务Id", e.I5n],
              ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.F4n],
            );
        break;
      case Protocol_1.Aki.Protocol.tTs.Proto_Finish:
        ModelManager_1.ModelManager.QuestNewModel.AddFinishedQuest(e.I5n);
        t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.I5n);
        t
          ? t.UpdateState(e.F4n, 1)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              19,
              "任务状态更新时：任务不存在",
              ["任务Id", e.I5n],
              ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.F4n],
            );
        break;
      case Protocol_1.Aki.Protocol.tTs.Proto_Delete:
        t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.I5n);
        t
          ? (ModelManager_1.ModelManager.QuestNewModel.RemoveQuest(e.I5n),
            t.UpdateState(e.F4n, 1))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              19,
              "任务状态更新时：任务不存在",
              ["任务Id", e.I5n],
              ["StateId(0-不可接,1-可接,2-进行中,3-已完成,4-已删除)", e.F4n],
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
          case Protocol_1.Aki.Protocol.tTs.zfs:
            QuestNewController.RedDotRequest(e, 1);
            break;
          case Protocol_1.Aki.Protocol.tTs.Proto_Finish:
          case Protocol_1.Aki.Protocol.tTs.Proto_Delete:
            QuestNewController.RedDotRequest(e, 0);
        }
    }
  }),
  (QuestNewController.Nro = (e) => {
    if (ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp)
      for (const t of e.I5n)
        ModelManager_1.ModelManager.QuestNewModel.SetQuestRedDot(t, !0);
    else _a.Vro = e;
  }),
  (QuestNewController.qSa = (e) => {
    for (const t of e.e2s)
      if (2 === ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(t)) {
        _a.RequestTrackQuest(t, !0, 2, 0);
        break;
      }
  });
//# sourceMappingURL=QuestController.js.map
