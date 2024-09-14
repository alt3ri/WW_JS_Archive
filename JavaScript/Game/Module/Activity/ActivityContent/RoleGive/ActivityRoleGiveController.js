"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRoleGiveController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
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
    var e = new Protocol_1.Aki.Protocol.beh();
    (e.w6n = ActivityRoleGiveController.CurrentActivityId),
      Net_1.Net.Call(21232, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            21417,
          );
        e = ActivityRoleGiveController.GetCurrentActivityData();
        e &&
          ((e.IsGetReward = !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            ActivityRoleGiveController.CurrentActivityId,
          ));
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
