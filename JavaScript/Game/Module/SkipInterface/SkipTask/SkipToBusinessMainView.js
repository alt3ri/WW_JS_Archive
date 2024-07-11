"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToBusinessMainView = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  MoonChasingMainViewModel_1 = require("../../Activity/ActivityContent/MoonChasing/Main/MoonChasingMainViewModel"),
  SkipToMoonChasingBase_1 = require("./SkipToMoonChasingBase");
class SkipToBusinessMainView extends SkipToMoonChasingBase_1.SkipToMoonChasingBase {
  OnRun(i) {
    var e;
    this.CheckMainViewOpen()
      ? ((((e = UiManager_1.UiManager.GetViewByName("MoonChasingMainView"))
          ? e.OpenParam
          : new MoonChasingMainViewModel_1.MoonChasingMainViewModel()
        ).SkipTarget = 1),
        UiManager_1.UiManager.IsViewOpen("RewardMainView") &&
          UiManager_1.UiManager.CloseView("RewardMainView"))
      : this.SkipToMap(parseInt(i));
  }
}
exports.SkipToBusinessMainView = SkipToBusinessMainView;
//# sourceMappingURL=SkipToBusinessMainView.js.map
