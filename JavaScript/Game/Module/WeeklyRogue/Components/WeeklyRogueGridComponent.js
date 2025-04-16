"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueShopDiscount = exports.WeeklyRougeShopDiscountTag =
    void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  MediumItemGridComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridComponent"),
  RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRougeShopDiscountTag extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemDiscountTag";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnRefresh(e) {
    e = 100 * (1 - e.qN_ / e.kN_);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(0),
      "RogueInfoViewShopDiscount",
      e,
    );
  }
}
exports.WeeklyRougeShopDiscountTag = WeeklyRougeShopDiscountTag;
class WeeklyRogueShopDiscount extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemDiscount";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [0, UE.UITexture],
    ];
  }
  OnRefresh(e) {
    e.qN_ !== e.kN_
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(1),
          "RogueInfoViewShopPriceWithDiscount",
          e.qN_,
          e.kN_,
        )
      : LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(1),
          "RogueInfoViewShopPrice",
          e.kN_,
        );
    e = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueCurrencyConfig(
      RoguelikeDefine_1.INSIDE_CURRENCY_ID,
    );
    this.SetTextureByPath(e?.IconSmall ?? "", this.GetTexture(0));
  }
}
exports.WeeklyRogueShopDiscount = WeeklyRogueShopDiscount;
//# sourceMappingURL=WeeklyRogueGridComponent.js.map
