"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestTrackAssistant = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
class QuestTrackAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.Hro = (e) => {
        0 !== e.B5n &&
          ModelManager_1.ModelManager.QuestNewModel.SetQuestTrackState(
            e.B5n,
            !0,
          );
      }),
      (this.bMe = (e, r) => {
        1 === r &&
          ((r = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
            Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest,
            r?.TreeId,
          ));
      }),
      (this.jro = (e, r, t) => {
        var o =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
        if (o && o.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
          var n =
            ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
          if (n && n.TreeId === e)
            switch (t) {
              case 1:
                this.RequestTrackQuest(n.Id, !1, 2);
                break;
              case 2:
                n.SetTrack(!1);
            }
        }
      });
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(17169, this.Hro);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17169);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GeneralLogicTreeSuspend,
      this.jro,
    ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.任务追踪,
        this.bMe,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GeneralLogicTreeSuspend,
      this.jro,
    ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.任务追踪,
        this.bMe,
      );
  }
  RefreshCurTrackQuest() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest(),
      e =
        (e?.SetTrack(!1),
        e?.SetTrack(!0),
        ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest);
    e && this.TryChangeTrackedQuest(e);
  }
  RequestTrackQuest(e, r, t, o = 0, n) {
    if (r && ModelManager_1.ModelManager.QuestNewModel.GetQuest(e)?.IsSuspend())
      return (
        (i = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "QuestTrackOccupiedTip",
        )),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(i),
        void n?.()
      );
    ModelManager_1.ModelManager.QuestNewModel.SetQuestTrackState(e, r, o),
      n?.();
    var i = Protocol_1.Aki.Protocol.l1s.create({
      B5n: e,
      fHn: r ? 1 : 2,
      gHn: t,
    });
    Net_1.Net.Call(22531, i, (e) => {
      e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.BEs,
          20619,
        );
    });
  }
  TryChangeTrackedQuest(e) {
    var r = ModelManager_1.ModelManager.QuestNewModel,
      t = r.GetCurTrackedQuest();
    return (
      !t?.AutoTrack &&
      !!((r = r.GetQuest(e)) && r.IsProgressing && r.AutoTrack) &&
      t?.Id !== e &&
      (this.RequestTrackQuest(e, !0, 2), !0)
    );
  }
  TryChangeTrackedQuest2(e) {
    var r = ModelManager_1.ModelManager.QuestNewModel,
      t = r.GetCurTrackedQuest();
    if (
      void 0 === t ||
      ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(t.Id)
    ) {
      if (void 0 !== e) {
        const o = r.GetSuccessiveQuestId(e);
        if (void 0 !== o) return this.RequestTrackQuest(o, !0, 2), !0;
      }
      const o = r.GetHighestPriorityProcessingQuestId();
      if (void 0 !== o) {
        if (void 0 !== e) return this.RequestTrackQuest(o, !0, 2), !0;
        (t = LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.AuToTrackQuestTime,
        )),
          (r = TimeUtil_1.TimeUtil.GetServerTimeStamp());
        if (!t || t < r)
          return (
            LocalStorage_1.LocalStorage.SetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey.AuToTrackQuestTime,
              TimeUtil_1.TimeUtil.GetNextDayTimeStamp(),
            ),
            this.RequestTrackQuest(o, !0, 2),
            !0
          );
      }
    }
    return !1;
  }
}
exports.QuestTrackAssistant = QuestTrackAssistant;
//# sourceMappingURL=QuestTrackAssistant.js.map
