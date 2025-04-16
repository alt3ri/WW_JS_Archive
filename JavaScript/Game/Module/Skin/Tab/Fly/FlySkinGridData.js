"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlySkinGridData = void 0);
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class FlySkinGridData {
  constructor(e, t, i, r = void 0) {
    (this.SkinId = e),
      (this.RoleDataId = t),
      (this.SkinType = i),
      (this.SkinConfig = r);
  }
  get IsEmptyData() {
    return 0 === this.SkinId;
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
    return (
      ModelManager_1.ModelManager.FlySkinModel.GetRoleEquipFlySkinId(
        this.RoleDataId,
        this.SkinType,
      ) === this.SkinId
    );
  }
  GetName() {
    return this.IsEmptyData
      ? ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinName(
          this.SkinType,
        )
      : this.SkinConfig.Name;
  }
  GetTypeDescription() {
    return this.IsEmptyData
      ? ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinTypeDescription(
          this.SkinType,
        )
      : this.SkinConfig.TypeDescription;
  }
  GetDescription() {
    return this.IsEmptyData
      ? ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinDescription(
          this.SkinType,
        )
      : this.SkinConfig.BgDescription;
  }
  GetModelId() {
    return this.IsEmptyData
      ? ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinModelId(
          this.SkinType,
        )
      : this.SkinConfig.ModelId;
  }
  GetStandAnimPath() {
    return this.IsEmptyData
      ? ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinStandAnimPath(
          this.SkinType,
        )
      : this.SkinConfig.StandAnim;
  }
  GetIsNew() {
    return (
      !this.IsEmptyData &&
      ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot,
        this.SkinId,
      )
    );
  }
}
exports.FlySkinGridData = FlySkinGridData;
//# sourceMappingURL=FlySkinGridData.js.map
