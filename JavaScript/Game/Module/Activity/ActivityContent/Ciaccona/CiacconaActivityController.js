"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaActivityController = void 0);
const ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  CiacconaActivityData_1 = require("./CiacconaActivityData"),
  CiacconaActivitySubView_1 = require("./CiacconaActivitySubView");
class CiacconaActivityController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView() {}
  OnGetActivityResource(t) {
    return "UiItem_ActivityXiaMain";
  }
  OnCreateSubPageComponent(t) {
    return new CiacconaActivitySubView_1.CiacconaActivitySubView();
  }
  OnCreateActivityData(t) {
    return new CiacconaActivityData_1.CiacconaActivityData();
  }
}
exports.CiacconaActivityController = CiacconaActivityController;
//# sourceMappingURL=CiacconaActivityController.js.map
