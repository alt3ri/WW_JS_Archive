"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const AccessPathById_1 = require("../../../Core/Define/ConfigQuery/AccessPathById");
const BackgroundCardById_1 = require("../../../Core/Define/ConfigQuery/BackgroundCardById");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const ItemMainTypeAll_1 = require("../../../Core/Define/ConfigQuery/ItemMainTypeAll");
const ItemMainTypeById_1 = require("../../../Core/Define/ConfigQuery/ItemMainTypeById");
const ItemShowTypeById_1 = require("../../../Core/Define/ConfigQuery/ItemShowTypeById");
const PackageCapacityAll_1 = require("../../../Core/Define/ConfigQuery/PackageCapacityAll");
const PackageCapacityByPackageId_1 = require("../../../Core/Define/ConfigQuery/PackageCapacityByPackageId");
const PhantomCustomizeItemByItemId_1 = require("../../../Core/Define/ConfigQuery/PhantomCustomizeItemByItemId");
const PhantomItemByItemId_1 = require("../../../Core/Define/ConfigQuery/PhantomItemByItemId");
const PhantomItemByMonsterId_1 = require("../../../Core/Define/ConfigQuery/PhantomItemByMonsterId");
const PreviewItemById_1 = require("../../../Core/Define/ConfigQuery/PreviewItemById");
const QualityInfoById_1 = require("../../../Core/Define/ConfigQuery/QualityInfoById");
const RogueCurrencyById_1 = require("../../../Core/Define/ConfigQuery/RogueCurrencyById");
const TypeInfoById_1 = require("../../../Core/Define/ConfigQuery/TypeInfoById");
const WeaponConfByItemId_1 = require("../../../Core/Define/ConfigQuery/WeaponConfByItemId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const InventoryDefine_1 = require("./InventoryDefine");
const ItemConfig_1 = require("./ItemConfig");
class InventoryConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.Sui = new Map()),
      (this.Eui = new Map()),
      (this.yui = new Map()),
      (this.$0t = new ItemConfig_1.ItemConfig());
  }
  GetAllMainTypeConfig() {
    return ItemMainTypeAll_1.configItemMainTypeAll.GetConfigList();
  }
  GetItemMainTypeConfig(e) {
    return ItemMainTypeById_1.configItemMainTypeById.GetConfig(e);
  }
  GetItemMainTypeFilterSortUseWayId(e) {
    e = this.GetItemMainTypeConfig(e);
    if (e) return e.UseWayId;
  }
  GetAccessPathConfig(e) {
    return AccessPathById_1.configAccessPathById.GetConfig(e);
  }
  GetItemQualityConfig(e) {
    return QualityInfoById_1.configQualityInfoById.GetConfig(e);
  }
  GetItemConfigData(e, n = !1) {
    return n
      ? ((n = new ItemConfig_1.ItemConfig()),
        this.GetItemConfigDataRef(e, n),
        n)
      : (this.GetItemConfigDataRef(e, this.$0t), this.$0t);
  }
  GetItemConfigDataRef(e, n) {
    if (!n) return !1;
    let r = void 0;
    switch (this.GetItemDataTypeByConfigId(e)) {
      case 2:
        r = this.GetWeaponItemConfig(e);
        break;
      case 3:
        r = this.GetPhantomItemConfig(e);
        break;
      case 4:
        var t = this.GetPhantomCustomizeItemConfig(e);
        t && (r = this.GetPhantomItemConfig(t.PhantomId));
        break;
      case 0:
      case 5:
        r = this.GetItemConfig(e);
        break;
      case 1:
        r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
        break;
      case 6:
        r = BackgroundCardById_1.configBackgroundCardById.GetConfig(e);
        break;
      case 7:
        r = this.GetPreviewItemConfig(e);
        break;
      case 8:
        r = RogueCurrencyById_1.configRogueCurrencyById.GetConfig(e);
    }
    return !!r && (n?.Refresh(r), !0);
  }
  GetItemDataTypeByConfigId(e) {
    return e >= InventoryDefine_1.weaponIdRange[0] &&
      e <= InventoryDefine_1.weaponIdRange[1]
      ? 2
      : e >= InventoryDefine_1.phantomIdRange[0] &&
          e <= InventoryDefine_1.phantomIdRange[1]
        ? 3
        : e >= InventoryDefine_1.phantomSpecificIdRange[0] &&
            e <= InventoryDefine_1.phantomSpecificIdRange[1]
          ? 4
          : e >= InventoryDefine_1.roleIdRange[0] &&
              e <= InventoryDefine_1.roleIdRange[1]
            ? 1
            : e >= InventoryDefine_1.virtualIdRange[0] &&
                e <= InventoryDefine_1.virtualIdRange[1]
              ? 5
              : e >= InventoryDefine_1.cardIdRange[0] &&
                  e <= InventoryDefine_1.cardIdRange[1]
                ? 6
                : e >= InventoryDefine_1.previewItemIdRange[0] &&
                    e <= InventoryDefine_1.previewItemIdRange[1]
                  ? 7
                  : e >= InventoryDefine_1.rogueCurrencyIdRange[0] &&
                      e <= InventoryDefine_1.rogueCurrencyIdRange[1]
                    ? 8
                    : 0;
  }
  GetItemConfig(e) {
    return ItemInfoById_1.configItemInfoById.GetConfig(e);
  }
  GetPreviewItemConfig(e) {
    return PreviewItemById_1.configPreviewItemById.GetConfig(e);
  }
  GetWeaponItemConfig(e) {
    return WeaponConfByItemId_1.configWeaponConfByItemId.GetConfig(e);
  }
  GetPhantomItemConfig(e) {
    return PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(e);
  }
  GetPhantomCustomizeItemConfig(e) {
    return PhantomCustomizeItemByItemId_1.configPhantomCustomizeItemByItemId.GetConfig(
      e,
    );
  }
  GetPhantomItemConfigListByMonsterId(e) {
    const n =
      PhantomItemByMonsterId_1.configPhantomItemByMonsterId.GetConfigList(e);
    return (
      n ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Config", 9, "表格查询不到配置ID", ["MonsterId", e])),
      n
    );
  }
  GetCardItemConfig(e) {
    return BackgroundCardById_1.configBackgroundCardById.GetConfig(e);
  }
  GetAllPackageConfig() {
    return PackageCapacityAll_1.configPackageCapacityAll.GetConfigList();
  }
  GetPackageConfig(e) {
    return PackageCapacityByPackageId_1.configPackageCapacityByPackageId.GetConfig(
      e,
    );
  }
  GetItemTypeConfig(e) {
    return TypeInfoById_1.configTypeInfoById.GetConfig(e);
  }
  GetItemShowTypeConfig(e) {
    return ItemShowTypeById_1.configItemShowTypeById.GetConfig(e);
  }
  OnClear() {
    return this.Sui.clear(), this.Eui.clear(), this.yui.clear(), !0;
  }
}
(exports.InventoryConfig = InventoryConfig).Iui = void 0;
// # sourceMappingURL=InventoryConfig.js.map
