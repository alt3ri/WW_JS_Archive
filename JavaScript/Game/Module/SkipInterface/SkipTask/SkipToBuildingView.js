"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToBuildingView = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiManager_1 = require("../../../Ui/UiManager"),
  MoonChasingController_1 = require("../../Activity/ActivityContent/MoonChasing/Main/MoonChasingController"),
  MoonChasingMainViewModel_1 = require("../../Activity/ActivityContent/MoonChasing/Main/MoonChasingMainViewModel"),
  SkipToMoonChasingBase_1 = require("./SkipToMoonChasingBase");
class SkipToBuildingView extends SkipToMoonChasingBase_1.SkipToMoonChasingBase {
  OnRun(i, n) {
    var e;
    this.CheckMainViewOpen()
      ? ((((e = UiManager_1.UiManager.GetViewByName("MoonChasingMainView"))
          ? e.OpenParam
          : new MoonChasingMainViewModel_1.MoonChasingMainViewModel()
        ).SkipTarget = 2),
        UiManager_1.UiManager.IsViewOpen("RewardMainView") &&
          (n !== StringUtils_1.ZERO_STRING &&
            MoonChasingController_1.MoonChasingController.OpenBuildingTipsInfoView(
              parseInt(n),
            ),
          UiManager_1.UiManager.CloseView("RewardMainView")))
      : this.SkipToMap(parseInt(i));
  }
}
exports.SkipToBuildingView = SkipToBuildingView;
//# sourceMappingURL=SkipToBuildingView.js.map
