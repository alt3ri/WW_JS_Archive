"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityLinkageController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityLinkageData_1 = require("./ActivityLinkageData"),
  ActivityLinkageSubView_1 = require("./View/ActivityLinkageSubView");
class ActivityLinkageController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnGetActivityResource(e) {
    return "UiItem_LinkageMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivityLinkageSubView_1.ActivityLinkageSubView();
  }
  OnCreateActivityData(e) {
    return (
      (ActivityLinkageController.LOe = e.s5n),
      new ActivityLinkageData_1.ActivityLinkageData()
    );
  }
  static GetActivityLinkageData() {
    return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(this.LOe);
  }
  static RequestReward(t) {
    var e = new Protocol_1.Aki.Protocol.To1();
    (e.w6n = this.LOe),
      (e.Lo1 = t),
      Net_1.Net.Call(22090, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                17226,
              )
            : (e = this.GetActivityLinkageData()) && e.ReceiveReward(t));
      });
  }
}
(exports.ActivityLinkageController = ActivityLinkageController).LOe = 0;
//# sourceMappingURL=ActivityLinkageController.js.map
