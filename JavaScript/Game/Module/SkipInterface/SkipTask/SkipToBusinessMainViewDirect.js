"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToBusinessMainViewDirect = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  MoonChasingController_1 = require("../../Activity/ActivityContent/MoonChasing/Main/MoonChasingController"),
  SkipToMoonChasingBase_1 = require("./SkipToMoonChasingBase");
class SkipToBusinessMainViewDirect extends SkipToMoonChasingBase_1.SkipToMoonChasingBase {
  OnRun(i) {
    this.CheckMainViewOpen()
      ? (UiManager_1.UiManager.IsViewShow("ItemTipsView") &&
          UiManager_1.UiManager.CloseView("ItemTipsView"),
        UiManager_1.UiManager.IsViewOpen("BusinessMainView") ||
          MoonChasingController_1.MoonChasingController.OpenBusinessMainView())
      : this.SkipToMap(parseInt(i));
  }
}
exports.SkipToBusinessMainViewDirect = SkipToBusinessMainViewDirect;
//# sourceMappingURL=SkipToBusinessMainViewDirect.js.map
