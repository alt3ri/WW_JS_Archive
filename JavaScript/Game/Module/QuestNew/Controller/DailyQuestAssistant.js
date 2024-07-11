"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyQuestAssistant = void 0);
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil");
class DailyQuestAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.Hoo = !1),
      (this.FWe = () => {
        if (
          ModelManager_1.ModelManager.LoginModel.GetTodayFirstTimeLogin() &&
          !this.Hoo
        ) {
          var e;
          this.Hoo = !0;
          for (const n of ModelManager_1.ModelManager.DailyTaskModel.GetDailyTaskCorrelativeEntities()) {
            var t =
              ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n);
            if (this.joo(t)) return;
          }
          for ([
            ,
            e,
          ] of ModelManager_1.ModelManager.DailyTaskModel.GetAllDailyQuest()) {
            var r = e.GetCurrentActiveChildQuestNode();
            r &&
              ModelManager_1.ModelManager.GeneralLogicTreeModel.ForceShowDailyQuestInfo(
                e.TreeId,
                r.NodeId,
              );
          }
        }
      }),
      (this.Woo = (e, t, r) => {
        var n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
        if (
          n &&
          4 === n.Type &&
          ("SingleHangUpOnline" !== n.OnlineType ||
            !ModelManager_1.ModelManager.GameModeModel.IsMulti)
        )
          switch (r) {
            case 0:
              n.IsRangeTrack(t) ? n.StartTextExpress(1) : this.Koo(n),
                this.Qoo(n),
                (n.TriggerQuestTips = !0);
              break;
            case 1:
              n.IsRangeTrack(t) && n.EndTextExpress(1);
          }
      }),
      (this.Xoo = (e) => {
        4 === e.Type &&
          ModelManager_1.ModelManager.DailyTaskModel.AddDailyQuest(e);
      }),
      (this.DSe = (e, t) => {
        switch (t) {
          case Protocol_1.Aki.Protocol.tTs.Proto_Finish:
          case Protocol_1.Aki.Protocol.tTs.Proto_Delete:
            ModelManager_1.ModelManager.DailyTaskModel.RemoveDailyQuest(e);
        }
      });
  }
  OnDestroy() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.FWe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange,
        this.Woo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddNewQuest,
        this.Xoo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.DSe,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.FWe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange,
        this.Woo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddNewQuest,
        this.Xoo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.DSe,
      );
  }
  joo(e) {
    return (
      !!e &&
      !!(e = e.Entity.GetComponent(1)) &&
      Vector_1.Vector.Distance(
        e.ActorLocationProxy,
        GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
      ) <
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "dailyquest_trackinfo_mini",
        )
    );
  }
  Qoo(e) {
    var t;
    e &&
      4 === e.Type &&
      !e.TriggerQuestTips &&
      ((e = ModelManager_1.ModelManager.QuestNewModel.GetQuestName(e.Id)),
      (t =
        ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          "TriggerMission",
        )),
      (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)),
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
        6,
        void 0,
        void 0,
        [e],
        [t],
      ));
  }
  Koo(e) {
    e &&
      4 === e.Type &&
      !e.TriggerQuestTips &&
      ModelManager_1.ModelManager.GeneralLogicTreeModel.ForceShowDailyQuestInfo(
        e.TreeId,
        e.GetCurrentActiveChildQuestNode().NodeId,
      );
  }
  CreateMarksOnWakeUp() {
    var e = ModelManager_1.ModelManager.DailyTaskModel.GetAllDailyQuest();
    if (e) for (var [, t] of e) t.CreateMapMarks();
  }
}
exports.DailyQuestAssistant = DailyQuestAssistant;
//# sourceMappingURL=DailyQuestAssistant.js.map
