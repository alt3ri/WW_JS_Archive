"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShopSkinData = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class ShopSkinData {
  constructor() {
    (this.vFi = void 0), (this.gyl = void 0), (this.pyl = new Map());
  }
  static Create(t) {
    var e = new ShopSkinData();
    return e.InitData(t), e;
  }
  InitData(t) {
    (this.vFi = t), this.pyl.clear();
    t = ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(
      t.GetPackageRewardId(),
    );
    if (t)
      for (const r of t.Content) {
        var e = r[0];
        11 ===
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          e,
        )
          ? (this.gyl = e)
          : this.pyl.set(e, r[1]);
      }
  }
  GetIfCanBuy() {
    return !(
      !this.GetPayShopGoods().IfCanBuy() ||
      (this.GetPayShopGoods().GetGoodsData()?.HasBuyLimit() &&
        0 === this.GetPayShopGoods().GetGoodsData()?.GetRemainingCount())
    );
  }
  GetCurrentGoodsData() {
    return this.vFi;
  }
  GetItemId() {
    return this.gyl;
  }
  GetAllReward() {
    var t = [],
      e = { IncId: 0, ItemId: this.GetItemId() };
    return t.push([e, 1]), t.push(...this.GetOtherReward()), t;
  }
  GetOtherReward() {
    var t,
      e,
      r = [];
    for ([t, e] of this.pyl) {
      var i = [{ IncId: 0, ItemId: t }, e];
      r.push(i);
    }
    return r;
  }
  GetPayShopGoods() {
    return this.vFi;
  }
  GetDiscountText() {
    var t = this.GetCurrentGoodsData();
    return t.HasDiscount() && 0 < (t = t.GetDiscount())
      ? StringUtils_1.StringUtils.Format("-{0}%", t.toString())
      : "";
  }
  GetDiscountTimeData() {
    var t = this.GetCurrentGoodsData();
    return t.HasDiscount() && 1 === (t = t.GetCountDownData())[0]
      ? t[1]
      : void 0;
  }
  GetPriceData() {
    return this.GetCurrentGoodsData().GetPriceData();
  }
  GetIfDirect() {
    return this.GetCurrentGoodsData().IsDirect();
  }
  GetDirectPriceText() {
    return this.GetCurrentGoodsData().GetDirectPriceText();
  }
  GetRoleSkinData() {
    return ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(
      this.GetItemId(),
    );
  }
  GetPayShopPreviewRoleTexturePath() {
    return this.GetRoleSkinData().GetPayShopPreviewRoleTexturePath();
  }
  GetPayShopPreviewRoleTextureBgPath() {
    return this.GetRoleSkinData().GetPayShopPreviewRoleTextureBgPath();
  }
  GetPayShopPreviewWeaponTexturePath() {
    return this.GetRoleSkinData().GetPayShopPreviewWeaponTexturePath();
  }
  GetPayShopPreviewBuyRoleTexturePath() {
    return this.GetRoleSkinData().GetPayShopPreviewBuyRoleTexturePath();
  }
  GetPayShopPreviewBuyRoleSuitWeaponTexturePath() {
    return this.GetRoleSkinData().GetPayShopPreviewBuyRoleSuitWeaponTexturePath();
  }
}
exports.ShopSkinData = ShopSkinData;
//# sourceMappingURL=ShopSkinData.js.map
