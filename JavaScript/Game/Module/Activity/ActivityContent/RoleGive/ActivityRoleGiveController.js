"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRoleGiveController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityRoleGiveData_1 = require("./ActivityRoleGiveData"),
  ActivitySubViewRoleGive_1 = require("./ActivitySubViewRoleGive");
class ActivityRoleGiveController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {
    throw new Error("Method not implemented.");
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityRoleXiangliyao";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewRoleGive_1.ActivitySubViewRoleGive();
  }
  OnCreateActivityData(e) {
    return (
      (ActivityRoleGiveController.CurrentActivityId = e.s5n),
      new ActivityRoleGiveData_1.ActivityRoleGiveData()
    );
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  static TrackMoonActivityRewardRequest() {
    var e = new Protocol_1.Aki.Protocol.Im_();
    (e.w6n = ActivityRoleGiveController.CurrentActivityId),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("MoonChasing", 34, "TrackMoonActivityRewardRequest", [
          "ActivityId:",
          ActivityRoleGiveController.CurrentActivityId,
        ]),
      Net_1.Net.Call(24078, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              19346,
            )
          : (e = ActivityRoleGiveController.GetCurrentActivityData()) &&
            ((e.IsGetReward = !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRedDot,
              ActivityRoleGiveController.CurrentActivityId,
            ),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "MoonChasing",
              34,
              "TrackMoonActivityRewardResponse",
              ["ActivityId:", ActivityRoleGiveController.CurrentActivityId],
            );
      });
  }
  static GetCurrentActivityData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      ActivityRoleGiveController.CurrentActivityId,
    );
    if (e) return e;
  }
}
(exports.ActivityRoleGiveController =
  ActivityRoleGiveController).CurrentActivityId = 0;
//# sourceMappingURL=ActivityRoleGiveController.js.map
