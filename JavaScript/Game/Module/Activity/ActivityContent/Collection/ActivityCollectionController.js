"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityCollectionController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityController_1 = require("../../ActivityController");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityCollectionData_1 = require("./ActivityCollectionData");
const ActivitySubViewCollection_1 = require("./ActivitySubViewCollection");
class ActivityCollectionController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.DEe = (e, t) => {
        let o;
        let i;
        const r = ActivityCollectionController.vNe();
        r &&
          (i = r.QuestStateMap.get(e)) &&
          (([o] = r.GetCurrentProgress()),
          (t = t) !== Protocol_1.Aki.Protocol.kMs.Proto_Delete) &&
          ((i.QuestState = t),
          r.QuestStateMap.set(e, i),
          ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
            r.Id,
            e,
            0,
            0,
            t === Protocol_1.Aki.Protocol.kMs.Gms ? 1 : 0,
          ),
          ([i] = r.GetCurrentProgress()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            ActivityCollectionController.CurrentActivityId,
          ),
          i !== o) &&
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
      this.DEe,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DEe,
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
    const t = new Protocol_1.Aki.Protocol.oes();
    (t.o3n = e),
      Net_1.Net.Call(13506, t, (e) => {
        e &&
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            5125,
          );
      });
  }
}
(exports.ActivityCollectionController =
  ActivityCollectionController).CurrentActivityId = 0;
// # sourceMappingURL=ActivityCollectionController.js.map
