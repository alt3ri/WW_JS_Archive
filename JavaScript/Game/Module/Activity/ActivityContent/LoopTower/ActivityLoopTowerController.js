"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityLoopTowerController = void 0);
const ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityLoopTowerData_1 = require("./ActivityLoopTowerData"),
  ActivitySubViewLoopTower_1 = require("./ActivitySubViewLoopTower");
class ActivityLoopTowerController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityLoopTower";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewLoopTower_1.ActivitySubViewLoopTower();
  }
  OnCreateActivityData(e) {
    return new ActivityLoopTowerData_1.ActivityLoopTowerData();
  }
  OnRegisterNetEvent() {}
  OnUnRegisterNetEvent() {}
}
(exports.ActivityLoopTowerController =
  ActivityLoopTowerController).CurrentActivityId = 0;
//# sourceMappingURL=ActivityLoopTowerController.js.map
