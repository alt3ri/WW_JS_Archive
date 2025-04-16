"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponSkinData = void 0);
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  WeaponSkinDefine_1 = require("./WeaponSkinDefine");
class WeaponSkinData {
  constructor(e, n) {
    (this.SkinId = WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID),
      (this.RoleId = 0),
      (this.SkinId = e),
      (this.RoleId = n);
  }
  get IsEmptyData() {
    return this.SkinId === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID;
  }
  get QualityId() {
    if (!this.IsEmptyData)
      return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        this.SkinId,
      )?.QualityId;
  }
  GetIsLock() {
    return (
      !this.IsEmptyData &&
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        this.SkinId,
      ) <= 0
    );
  }
  IsCurrentEquipSkinId() {
    var e = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(
      this.RoleId,
    );
    return this.SkinId === e;
  }
  get Name() {
    return this.IsEmptyData
      ? ConfigManager_1.ConfigManager.SkinConfig.GetDefaultWeaponSkinName()
      : ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(
          this.SkinId,
        ).Name;
  }
  get Description() {
    return this.IsEmptyData
      ? ConfigManager_1.ConfigManager.SkinConfig.GetDefaultWeaponSkinDescription()
      : ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(
          this.SkinId,
        ).BgDescription;
  }
  get IsNew() {
    return (
      !this.IsEmptyData &&
      ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.WeaponSkinRedDot,
        this.SkinId,
      )
    );
  }
}
exports.WeaponSkinData = WeaponSkinData;
//# sourceMappingURL=WeaponSkinGridData.js.map
