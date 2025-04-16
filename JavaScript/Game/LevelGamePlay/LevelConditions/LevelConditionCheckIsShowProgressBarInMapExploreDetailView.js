"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckIsShowProgressBarInMapExploreDetailView = void 0);
const UiManager_1 = require("../../Ui/UiManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckIsShowProgressBarInMapExploreDetailView extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var a = UiManager_1.UiManager.GetViewByName("MapExploreDetailView");
    return void 0 !== a && (a.IsShowProgressBar ?? !1);
  }
}
exports.LevelConditionCheckIsShowProgressBarInMapExploreDetailView =
  LevelConditionCheckIsShowProgressBarInMapExploreDetailView;
//# sourceMappingURL=LevelConditionCheckIsShowProgressBarInMapExploreDetailView.js.map
