"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskPayShop = void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  SkipTask_1 = require("./SkipTask");
class SkipTaskPayShop extends SkipTask_1.SkipTask {
  OnRun(e, r, o) {
    var a;
    this.Finish(),
      UiManager_1.UiManager.IsViewShow("PayShopRootView")
        ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "IsInView",
          )
        : (((a = new PayShopViewData_1.PayShopViewData()).PayShopId = 4),
          ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(
            a,
            (e, r) => {
              e &&
                (UiManager_1.UiManager.IsViewOpen("PayShopRootView")
                  ? StringUtils_1.StringUtils.IsEmpty(o) || 0 === Number(o)
                    ? (e =
                        ModelManager_1.ModelManager.ItemTipsModel.GetCurrentItemTipsData()) &&
                      ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfigByItemConfigId(
                        e.ConfigId,
                      )
                      ? (e =
                          ModelManager_1.ModelManager.PayShopModel.GetGoodsInTab(
                            4,
                            e.ConfigId,
                          ))
                        ? ControllerHolder_1.ControllerHolder.PayShopController.OpenExchangePopView(
                            e.GetGoodsId(),
                          )
                        : (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                              "Shop_UnableBuy_Desc01",
                            ),
                          ),
                          this.Finish())
                      : this.Finish()
                    : ControllerHolder_1.ControllerHolder.PayShopController.OpenExchangePopView(
                        Number(o),
                      )
                  : this.Finish());
            },
          ));
  }
}
exports.SkipTaskPayShop = SkipTaskPayShop;
//# sourceMappingURL=SkipTaskPayShop.js.map
