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
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class DailyQuestAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.Kio = !1),
      (this.Uje = () => {
        if (
          ModelManager_1.ModelManager.LoginModel.GetTodayFirstTimeLogin() &&
          !this.Kio
        ) {
          var e;
          this.Kio = !0;
          for (const n of ModelManager_1.ModelManager.DailyTaskModel.GetDailyTaskCorrelativeEntities()) {
            var r =
              ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n);
            if (this.Qio(r)) return;
          }
          for ([
            ,
            e,
          ] of ModelManager_1.ModelManager.DailyTaskModel.GetAllDailyQuest()) {
            var t = e.GetCurrentActiveChildQuestNode();
            t &&
              ModelManager_1.ModelManager.GeneralLogicTreeModel.ForceShowDailyQuestInfo(
                e.TreeId,
                t.NodeId,
              );
          }
        }
      }),
      (this.Xio = (e, r, t) => {
        var n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
        if (
          n &&
          4 === n.Type &&
          ("SingleHangUpOnline" !== n.OnlineType ||
            !ModelManager_1.ModelManager.GameModeModel.IsMulti)
        )
          switch (t) {
            case 0:
              n.IsRangeTrack(r) ? n.StartTextExpress(1) : this.$io(n),
                this.Yio(n),
                (n.TriggerQuestTips = !0);
              break;
            case 1:
              n.IsRangeTrack(r) && n.EndTextExpress(1);
          }
      }),
      (this.Jio = (e) => {
        4 === e.Type &&
          ModelManager_1.ModelManager.DailyTaskModel.AddDailyQuest(e);
      }),
      (this.DEe = (e, r) => {
        r === Protocol_1.Aki.Protocol.kMs.Proto_Finish &&
          ModelManager_1.ModelManager.DailyTaskModel.RemoveDailyQuest(e);
      });
  }
  OnDestroy() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.Uje,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange,
        this.Xio,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddNewQuest,
        this.Jio,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.DEe,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.Uje,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange,
        this.Xio,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddNewQuest,
        this.Jio,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.DEe,
      );
  }
  Qio(e) {
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
  Yio(e) {
    var r;
    e &&
      4 === e.Type &&
      !e.TriggerQuestTips &&
      ((e = ModelManager_1.ModelManager.QuestNewModel.GetQuestName(e.Id)),
      (r =
        ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          "TriggerMission",
        )),
      (r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r)),
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
        6,
        void 0,
        void 0,
        [e],
        [r],
      ));
  }
  $io(e) {
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
    if (e) for (var [, r] of e) r.CreateMapMarks();
  }
}
exports.DailyQuestAssistant = DailyQuestAssistant;
//# sourceMappingURL=DailyQuestAssistant.js.map
