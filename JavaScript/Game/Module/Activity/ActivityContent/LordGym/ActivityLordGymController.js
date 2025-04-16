"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityLordGymController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  LordGymActivityData_1 = require("./LordGymActivityData"),
  LordGymActivitySubView_1 = require("./LordGymActivitySubView");
class ActivityLordGymController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(t) {}
  OnGetActivityResource(t) {
    return "UiItem_ActivityLordGym";
  }
  OnCreateSubPageComponent(t) {
    return new LordGymActivitySubView_1.LordGymActivitySubView();
  }
  OnCreateActivityData(t) {
    return new LordGymActivityData_1.LordGymActivityData();
  }
  static GetCurrentActivityData() {
    var t =
      ModelManager_1.ModelManager.ActivityModel?.GetCurrentActivitiesByType(
        Protocol_1.Aki.Protocol.uks.Proto_NewLordGym,
      );
    let e = void 0;
    return (
      t?.forEach((t) => {
        e = t;
      }),
      e
    );
  }
}
exports.ActivityLordGymController = ActivityLordGymController;
//# sourceMappingURL=ActivityLordGymController.js.map
