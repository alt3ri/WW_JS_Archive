"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopSkinItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ShopSkinData_1 = require("../../../Skin/Data/ShopSkinData"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class PayShopSkinItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.ayl = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UITexture],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ];
  }
  Refresh(t, i, s) {
    (this.ayl = ShopSkinData_1.ShopSkinData.Create(t)),
      this.lyl(this.ayl),
      this.syl(this.ayl),
      this.iyl(this.ayl),
      this.ryl(this.ayl),
      this.hyl(this.ayl),
      this.JSl(this.ayl),
      this.f7l(this.ayl);
  }
  f7l(t) {
    t = 0 < t.GetRoleSkinData().GetSuitWeaponSkinId();
    this.GetItem(6).SetUIActive(t), this.GetItem(7).SetUIActive(t);
  }
  lyl(t) {
    this.SetTextureByPath(
      t.GetPayShopPreviewBuyRoleTexturePath(),
      this.GetTexture(0),
    );
  }
  hyl(t) {
    t && "" !== (t = t.GetPayShopPreviewBuyRoleSuitWeaponTexturePath()) && t
      ? (this.GetTexture(4).SetUIActive(!0),
        this.SetTextureByPath(t, this.GetTexture(4)))
      : this.GetTexture(4).SetUIActive(!1);
  }
  syl(t) {
    var i;
    t
      ? ((i = t.GetIfDirect()),
        this.GetTexture(1).SetUIActive(!i),
        i ||
          ((i = t.GetPriceData()),
          this.SetItemIcon(this.GetTexture(1), i.CurrencyId)))
      : this.GetTexture(1).SetUIActive(!1);
  }
  ryl(t) {
    !t || t.GetIfDirect()
      ? this.GetText(3).SetText("")
      : (t = t.GetPriceData().OriginalPrice)
        ? (this.GetText(3).SetUIActive(!0),
          this.GetText(3).SetText(`<s>${t.toString()}</s>`))
        : this.GetText(3).SetUIActive(!1);
  }
  iyl(t) {
    var i;
    t
      ? t.GetIfDirect()
        ? ((i = t.GetDirectPriceText()), this.GetText(2).SetText(i))
        : ((i = t.GetPriceData().NowPrice),
          this.GetText(2).SetText(i.toString()))
      : this.GetText(2).SetText("");
  }
  JSl(t) {
    t
      ? ((t =
          0 < t.GetRoleSkinData().GetSuitWeaponSkinId()
            ? "T_ShopSkinBg1"
            : "T_ShopSkinBg"),
        (t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)),
        this.SetTextureByPath(t, this.GetTexture(5)))
      : this.GetTexture(5).SetUIActive(!1);
  }
}
exports.PayShopSkinItem = PayShopSkinItem;
//# sourceMappingURL=PayShopSkinItem.js.map
