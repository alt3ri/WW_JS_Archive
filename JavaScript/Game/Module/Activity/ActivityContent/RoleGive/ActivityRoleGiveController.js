"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRoleGiveController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
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
      (ActivityRoleGiveController.CurrentActivityId = e.J4n),
      new ActivityRoleGiveData_1.ActivityRoleGiveData()
    );
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  static TrackMoonActivityRewardRequest() {
    var e = new Protocol_1.Aki.Protocol.uLa();
    (e.T6n = ActivityRoleGiveController.CurrentActivityId),
      Net_1.Net.Call(17057, e, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            19154,
          );
        e = ActivityRoleGiveController.GetCurrentActivityData();
        e && (e.IsGetReward = !0);
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
