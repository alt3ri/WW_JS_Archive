"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMoonChasingController = void 0);
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../../../ActivityControllerBase"),
  ActivityMoonChasingData_1 = require("./ActivityMoonChasingData"),
  ActivitySubViewMoonChasing_1 = require("./ActivitySubViewMoonChasing");
class ActivityMoonChasingController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    for (const t of ModelManager_1.ModelManager.ActivityModel.GetActivitiesByType(
      Protocol_1.Aki.Protocol.oks.Proto_TrackMoonActivity,
    )) {
      var o = t;
      let e = [];
      for (const i of (e =
        0 === o.ActivityFlowState
          ? ["MoonChasingMainView", "RewardMainView", "MoonChasingHandbookView"]
          : [
              "MoonChasingMemoryView",
              "MoonChasingMemoryDetailView",
              "RewardMainView",
              "MoonChasingHandbookView",
            ]))
        if (UiManager_1.UiManager.IsViewOpen(i)) return !0;
    }
    return !1;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityMoonChasingMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewMoonChasing_1.ActivitySubViewMoonChasing();
  }
  OnCreateActivityData(e) {
    return new ActivityMoonChasingData_1.ActivityMoonChasingData();
  }
  OnActivityFirstUnlock(e) {
    0 === e.ActivityFlowState &&
      UiManager_1.UiManager.OpenView("ActivityUnlockTipMoonChasingView");
  }
  static RefreshActivityRedDot() {
    ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(
      Protocol_1.Aki.Protocol.oks.Proto_TrackMoonActivity,
    ).forEach((e) => {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        e.Id,
      );
    });
  }
  static TrackMoonActivityTargetRewardRequest(o, t) {
    var e = new Protocol_1.Aki.Protocol.s$s();
    (e.J4n = t),
      (e.T6n = o),
      Net_1.Net.Call(19345, e, (e) => {
        e &&
          (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                25931,
              )
            : (e =
                ModelManager_1.ModelManager.ActivityModel.GetActivityById(o)) &&
              e.SetRewardState(t, 2));
      });
  }
}
exports.ActivityMoonChasingController = ActivityMoonChasingController;
//# sourceMappingURL=ActivityMoonChasingController.js.map
