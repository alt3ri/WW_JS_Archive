"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskPayShop = void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const SkipTask_1 = require("./SkipTask");
class SkipTaskPayShop extends SkipTask_1.SkipTask {
  OnRun(e, r, o) {
    let a;
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
                  ? StringUtils_1.StringUtils.IsEmpty(o) || Number(o) === 0
                    ? (e =
                        ModelManager_1.ModelManager.ItemTipsModel.GetCurrentItemTipsData()) &&
                      (e =
                        ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfigByItemConfigId(
                          e.ConfigId,
                        ))
                      ? ModelManager_1.ModelManager.PayShopModel.CheckGoodIfShowInTab(
                          4,
                          e.Id,
                        )
                        ? ControllerHolder_1.ControllerHolder.PayShopController.OpenExchangePopView(
                            e.Id,
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
// # sourceMappingURL=SkipTaskPayShop.js.map
