"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayItemData = void 0);
const PayItem_1 = require("../../../Core/Define/Config/PayItem"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PayShopItemBase_1 = require("../PayShop/PayShopTab/TabItem/PayShopItemBase");
class PayItemData {
  constructor() {
    (this.XOi = void 0),
      (this.$Oi = 0),
      (this.Amount = ""),
      (this.ProductId = ""),
      (this.PayItemId = 0),
      (this.ItemId = 0),
      (this.ItemCount = 0),
      (this.BonusItemCount = 0),
      (this.SpecialBonusItemCount = 0),
      (this.CanSpecialBonus = !1),
      (this.StageImage = "");
  }
  Phrase(t) {
    (this.$Oi = t.sBs ?? 0),
      (this.Amount = t.$6n),
      (this.ProductId = t.uBs),
      (this.PayItemId = t.s5n ?? 0),
      (this.ItemId = t.L8n ?? 0),
      (this.ItemCount = t.n9n ?? 0),
      (this.BonusItemCount = t.aBs ?? 0),
      (this.SpecialBonusItemCount = t.hBs ?? 0),
      (this.StageImage = t._Bs ?? ""),
      ModelManager_1.ModelManager.RechargeModel.SetRechargeInfo(
        this.$Oi,
        this.Amount.toString(),
        this.ProductId,
      ),
      t instanceof PayItem_1.PayItem ||
        (this.CanSpecialBonus = t.lBs ?? void 0),
      (this.XOi = new PayShopItemBase_1.PayShopItemBaseSt()),
      this.XOi.PhrasePromPayItemData(this);
  }
  ConvertPayItemDataToPayShopItemBaseSt() {
    return this.XOi.Refresh(this), this.XOi;
  }
  GetPayItemShowName() {
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          this.ItemId,
        ).Name,
      ),
      e =
        ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          "GoodsName",
        ),
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    return StringUtils_1.StringUtils.Format(e, t, this.ItemCount.toString());
  }
  GetDirectPriceText() {
    var t = ModelManager_1.ModelManager.KuroSdkModel?.GetQueryProductShowPrice(
      this.$Oi.toString(),
    );
    return (
      t || ConfigManager_1.ConfigManager.PayItemConfig.GetPayShow(this.$Oi)
    );
  }
  GetIfCanShow() {
    if (
      !ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(this.PayItemId)
        .IsDisplay
    )
      return !1;
    var t =
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedConfirmSdkProductInfo();
    if (
      t &&
      !ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(
        this.ProductId,
      )
    )
      return !1;
    return !0;
  }
}
exports.PayItemData = PayItemData;
//# sourceMappingURL=PayItemDefine.js.map
