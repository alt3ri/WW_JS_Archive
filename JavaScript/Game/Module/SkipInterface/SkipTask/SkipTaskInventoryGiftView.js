"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToInventoryGiftView = void 0);
const ItemAccessedPathById_1 = require("../../../../Core/Define/ConfigQuery/ItemAccessedPathById"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  SkipTask_1 = require("./SkipTask");
class SkipToInventoryGiftView extends SkipTask_1.SkipTask {
  OnRun(e, r, i, o) {
    if (UiManager_1.UiManager.IsViewShow("InventoryGiftView"))
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "IsInView",
      );
    else {
      if (ItemAccessedPathById_1.configItemAccessedPathById.GetConfig(o)) {
        let e = !1;
        for (const n of ConfigManager_1.ConfigManager.ItemAccessedFromGiftPathConfig.GetGiftItemGroupById(
          o,
        )) {
          var a =
            ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
              n,
            );
          if (
            0 < a &&
            ControllerHolder_1.ControllerHolder.InventoryController.TryUseGiftItemWithSelectedItem(
              n,
              o,
              1,
            )
          ) {
            (e = !0),
              UiManager_1.UiManager.IsViewShow("ItemTipsView") &&
                UiManager_1.UiManager.CloseView("ItemTipsView");
            break;
          }
        }
        e || this.wec();
      }
      this.Finish();
    }
  }
  wec() {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
      "InventoryToGift_GiftNotFound",
    );
  }
}
exports.SkipToInventoryGiftView = SkipToInventoryGiftView;
//# sourceMappingURL=SkipTaskInventoryGiftView.js.map
