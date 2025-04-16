"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskPayShopToSpecifyTab = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiManager_1 = require("../../../Ui/UiManager"),
  PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData"),
  SkipTask_1 = require("./SkipTask");
class SkipTaskPayShopToSpecifyTab extends SkipTask_1.SkipTask {
  OnRun(e, a, r) {
    var o;
    this.Finish(),
      UiManager_1.UiManager.IsViewShow("PayShopRootView")
        ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "IsInView",
          )
        : (((o = new PayShopViewData_1.PayShopViewData()).PayShopId =
            Number(e)),
          (o.SwitchId = Number(a)),
          ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(
            o,
          ));
  }
}
exports.SkipTaskPayShopToSpecifyTab = SkipTaskPayShopToSpecifyTab;
//# sourceMappingURL=SkipTaskPayShopToSpecifyTab.js.map
