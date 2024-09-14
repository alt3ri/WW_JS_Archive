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
      Protocol_1.Aki.Protocol.uks.Proto_TrackMoonActivity,
    )) {
      var o = t;
      let e = [];
      for (const i of (e =
        0 === o.ActivityFlowState
          ? [
              "MoonChasingMainView",
              "RewardMainView",
              "MoonChasingHandbookView",
              "BusinessMainView",
              "BusinessHelperView",
              "MoonChasingTaskView",
            ]
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
    return (
      ActivityMoonChasingController.y8a ||
        (ActivityMoonChasingController.E8a(),
        (ActivityMoonChasingController.y8a = !0)),
      new ActivityMoonChasingData_1.ActivityMoonChasingData()
    );
  }
  OnActivityFirstUnlock(e) {
    0 === e.ActivityFlowState &&
      UiManager_1.UiManager.OpenView("ActivityUnlockTipMoonChasingView");
  }
  static RefreshActivityRedDot() {
    ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(
      Protocol_1.Aki.Protocol.uks.Proto_TrackMoonActivity,
    ).forEach((e) => {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        e.Id,
      );
    });
  }
  static TrackMoonActivityTargetRewardRequest(o, t) {
    var e = new Protocol_1.Aki.Protocol.M$s();
    (e.s5n = t),
      (e.w6n = o),
      Net_1.Net.Call(19734, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                16368,
              )
            : (e =
                ModelManager_1.ModelManager.ActivityModel.GetActivityById(o)) &&
              e.SetRewardState(t, 2));
      });
  }
  static CheckIsActivityClose() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetActivitiesByType(
      Protocol_1.Aki.Protocol.uks.Proto_TrackMoonActivity,
    ))
      if (e.CheckIfClose()) {
        ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
        break;
      }
  }
  static E8a() {
    ControllerHolder_1.ControllerHolder.MoonChasingController.TrackMoonAllDataRequest();
  }
}
(exports.ActivityMoonChasingController = ActivityMoonChasingController).y8a =
  !1;
//# sourceMappingURL=ActivityMoonChasingController.js.map
