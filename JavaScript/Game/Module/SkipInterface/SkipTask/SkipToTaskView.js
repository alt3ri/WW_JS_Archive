"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToTaskView = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  MoonChasingMainViewModel_1 = require("../../Activity/ActivityContent/MoonChasing/Main/MoonChasingMainViewModel"),
  SkipToMoonChasingBase_1 = require("./SkipToMoonChasingBase");
class SkipToTaskView extends SkipToMoonChasingBase_1.SkipToMoonChasingBase {
  OnRun(i) {
    var e;
    this.CheckMainViewOpen()
      ? (((e = (e = UiManager_1.UiManager.GetViewByName("MoonChasingMainView"))
          ? e.OpenParam
          : new MoonChasingMainViewModel_1.MoonChasingMainViewModel()).SkipTarget =
          3),
        (e.TaskType = 1),
        (e.IsLastTask = !0),
        UiManager_1.UiManager.IsViewOpen("RewardMainView") &&
          UiManager_1.UiManager.CloseView("RewardMainView"))
      : this.SkipToMap(parseInt(i));
  }
}
exports.SkipToTaskView = SkipToTaskView;
//# sourceMappingURL=SkipToTaskView.js.map
