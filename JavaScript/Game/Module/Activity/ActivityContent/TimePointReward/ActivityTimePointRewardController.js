"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTimePointRewardController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivitySubViewTimePointReward_1 = require("./ActivitySubViewTimePointReward"),
  ActivityTimePointRewardData_1 = require("./ActivityTimePointRewardData");
class ActivityTimePointRewardController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityTimePointReward";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewTimePointReward_1.ActivitySubViewTimePointReward();
  }
  OnCreateActivityData(e) {
    return new ActivityTimePointRewardData_1.ActivityTimePointRewardData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  static GetRewardById(t, r) {
    var e = Protocol_1.Aki.Protocol.f6s.create();
    (e.Ekn = r),
      Net_1.Net.Call(4504, e, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              3145,
            )
          : ModelManager_1.ModelManager.ActivityModel.GetActivityById(
              t,
            ).SetRewardToGotState(r);
      });
  }
}
exports.ActivityTimePointRewardController = ActivityTimePointRewardController;
//# sourceMappingURL=ActivityTimePointRewardController.js.map
