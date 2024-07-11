"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestTrackAssistant = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class QuestTrackAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.Qoo = (e) => {
        0 !== e.Xkn &&
          ModelManager_1.ModelManager.QuestNewModel.SetQuestTrackState(
            e.Xkn,
            !0,
          );
      }),
      (this.bMe = (e, r) => {
        1 === r &&
          ((r = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
            Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest,
            r?.TreeId,
          ));
      }),
      (this.Xoo = (e, r, t) => {
        var n =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
        if (n && n.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest) {
          var o =
            ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
          if (o && o.TreeId === e)
            switch (t) {
              case 1:
                this.RequestTrackQuest(o.Id, !1, 2);
                break;
              case 2:
                o.SetTrack(!1);
            }
        }
      });
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(12471, this.Qoo);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(12471);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GeneralLogicTreeSuspend,
      this.Xoo,
    ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.任务追踪,
        this.bMe,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GeneralLogicTreeSuspend,
      this.Xoo,
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
  RequestTrackQuest(e, r, t, n = 0, o) {
    if (r && ModelManager_1.ModelManager.QuestNewModel.GetQuest(e)?.IsSuspend())
      return (
        (s = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "QuestTrackOccupiedTip",
        )),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(s),
        void o?.()
      );
    ModelManager_1.ModelManager.QuestNewModel.SetQuestTrackState(e, r, n),
      o?.();
    var s = Protocol_1.Aki.Protocol.sss.create({
      Xkn: e,
      U8n: r ? 1 : 2,
      A8n: t,
    });
    Net_1.Net.Call(28835, s, (e) => {
      e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.uvs,
          17726,
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
}
exports.QuestTrackAssistant = QuestTrackAssistant;
//# sourceMappingURL=QuestTrackAssistant.js.map
