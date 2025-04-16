"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGridSkinComponent = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridSkinComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemBSkin";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UIText],
    ];
  }
  OnRefresh(e) {
    this.SetActive(!0);
    var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        this.QSl(e),
      ),
      r = (this.SetTextureByPath(r, this.GetTexture(1)), this.s5l(e));
    this.SetSpriteByPath(r, this.GetSprite(0), !1), this.mbl(e), this.dbl(e);
  }
  s5l(e) {
    var e = e.SkinId,
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    return void 0 === e
      ? ""
      : ((e = e.QualityId),
        ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(e)
          .SkinItemBg);
  }
  QSl(e) {
    var e = e.SkinId,
      r =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          e,
        );
    return 10 === r
      ? "T_IconFilterSkin3"
      : 11 === r
        ? 0 <
          ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(
            e,
          ).GetSuitWeaponSkinId()
          ? "T_IconFilterSkin1"
          : "T_IconFilterSkin2"
        : 14 === r
          ? ((r = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(e)),
            ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinBottomIconResourceId(
              r.SkinType,
            ))
          : "";
  }
  mbl(e) {
    var e = e.SkinId;
    let r = !1;
    11 ===
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        e,
      ) &&
      0 <
        ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(
          e,
        ).GetSuitWeaponSkinId() &&
      (r = !0),
      this.GetItem(2).SetUIActive(r),
      r &&
        ((e =
          ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(
            e,
          ).GetPayShopPreviewBuyRoleSuitWeaponTexturePath()),
        this.SetTextureByPath(e, this.GetTexture(3)));
  }
  dbl(e) {
    var e = e.BottomText,
      r = !StringUtils_1.StringUtils.IsEmpty(e);
    this.GetItem(4).SetUIActive(r), r && this.GetText(5).SetText(e);
  }
  GetLayoutLevel() {
    return 1;
  }
}
exports.SmallItemGridSkinComponent = SmallItemGridSkinComponent;
//# sourceMappingURL=SmallItemGridSkinComponent.js.map
