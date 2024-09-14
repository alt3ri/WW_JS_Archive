"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityCollectionController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityController_1 = require("../../ActivityController"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityCollectionData_1 = require("./ActivityCollectionData"),
  ActivitySubViewCollection_1 = require("./ActivitySubViewCollection");
class ActivityCollectionController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.DSe = (e, t) => {
        var o,
          i,
          r,
          n = ActivityCollectionController.vNe();
        n &&
          (r = n.QuestStateMap.get(e)) &&
          (([o] = n.GetCurrentProgress()),
          (i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e)),
          ([r] =
            ((r.QuestState = i),
            n.QuestStateMap.set(e, r),
            ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
              n.Id,
              e,
              0,
              0,
              2 === i ? 1 : 0,
            ),
            n.GetCurrentProgress())),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            ActivityCollectionController.CurrentActivityId,
          ),
          r !== o) &&
          ActivityController_1.ActivityController.OpenActivityById(
            ActivityCollectionController.CurrentActivityId,
          );
      });
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityCollection_Complete";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewCollection_1.ActivitySubViewCollection();
  }
  OnCreateActivityData(e) {
    return new ActivityCollectionData_1.ActivityCollectionData();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DSe,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DSe,
    );
  }
  OnRegisterNetEvent() {}
  OnUnRegisterNetEvent() {}
  static vNe() {
    return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(
      ActivityCollectionController.CurrentActivityId,
    );
  }
  static RequestCollectionQuestReward(e) {
    var t = new Protocol_1.Aki.Protocol.nos();
    (t.V6n = e),
      Net_1.Net.Call(24951, t, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            28115,
          );
      });
  }
}
(exports.ActivityCollectionController =
  ActivityCollectionController).CurrentActivityId = 0;
//# sourceMappingURL=ActivityCollectionController.js.map
