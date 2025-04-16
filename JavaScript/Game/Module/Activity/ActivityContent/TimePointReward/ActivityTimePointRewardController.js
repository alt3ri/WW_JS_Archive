"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTimePointRewardController =
    exports.TIME_AWARD_SEASON2_ACTIVITY_ID =
    exports.TIME_AWARD_SEASON1_ACTIVITY_ID =
      void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  CelebrationAwardSubView_1 = require("../CelebrationAward/CelebrationAwardSubView"),
  ActivitySubViewTimePointReward_1 = require("./ActivitySubViewTimePointReward"),
  ActivityTimePointRewardData_1 = require("./ActivityTimePointRewardData");
(exports.TIME_AWARD_SEASON1_ACTIVITY_ID = 102000001),
  (exports.TIME_AWARD_SEASON2_ACTIVITY_ID = 102000002);
class ActivityTimePointRewardController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return e.Id === exports.TIME_AWARD_SEASON1_ACTIVITY_ID
      ? "UiItem_ActivityTimePointReward"
      : e.Id === exports.TIME_AWARD_SEASON2_ACTIVITY_ID
        ? "UiItem_WelfareInfoA"
        : "";
  }
  OnCreateSubPageComponent(e) {
    return new (
      e.Id !== exports.TIME_AWARD_SEASON1_ACTIVITY_ID &&
      e.Id === exports.TIME_AWARD_SEASON2_ACTIVITY_ID
        ? CelebrationAwardSubView_1.CelebrationAwardSubView
        : ActivitySubViewTimePointReward_1.ActivitySubViewTimePointReward
    )();
  }
  OnCreateActivityData(e) {
    return new ActivityTimePointRewardData_1.ActivityTimePointRewardData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  static GetRewardById(t, r) {
    var e = Protocol_1.Aki.Protocol.RYs.create();
    (e.s5n = r),
      Net_1.Net.Call(29139, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              20983,
            )
          : ModelManager_1.ModelManager.ActivityModel.GetActivityById(
              t,
            ).SetRewardToGotState(r);
      });
  }
}
exports.ActivityTimePointRewardController = ActivityTimePointRewardController;
//# sourceMappingURL=ActivityTimePointRewardController.js.map
