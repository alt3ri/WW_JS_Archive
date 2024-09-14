"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Lru_1 = require("../../../Core/Container/Lru"),
  AccessPathById_1 = require("../../../Core/Define/ConfigQuery/AccessPathById"),
  BackgroundCardById_1 = require("../../../Core/Define/ConfigQuery/BackgroundCardById"),
  ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
  ItemMainTypeAll_1 = require("../../../Core/Define/ConfigQuery/ItemMainTypeAll"),
  ItemMainTypeById_1 = require("../../../Core/Define/ConfigQuery/ItemMainTypeById"),
  ItemShowTypeById_1 = require("../../../Core/Define/ConfigQuery/ItemShowTypeById"),
  PackageCapacityAll_1 = require("../../../Core/Define/ConfigQuery/PackageCapacityAll"),
  PackageCapacityByPackageId_1 = require("../../../Core/Define/ConfigQuery/PackageCapacityByPackageId"),
  PhantomCustomizeItemByItemId_1 = require("../../../Core/Define/ConfigQuery/PhantomCustomizeItemByItemId"),
  PhantomItemByItemId_1 = require("../../../Core/Define/ConfigQuery/PhantomItemByItemId"),
  PhantomItemByMonsterId_1 = require("../../../Core/Define/ConfigQuery/PhantomItemByMonsterId"),
  PreviewItemById_1 = require("../../../Core/Define/ConfigQuery/PreviewItemById"),
  QualityInfoById_1 = require("../../../Core/Define/ConfigQuery/QualityInfoById"),
  RogueCurrencyById_1 = require("../../../Core/Define/ConfigQuery/RogueCurrencyById"),
  TypeInfoById_1 = require("../../../Core/Define/ConfigQuery/TypeInfoById"),
  WeaponConfByItemId_1 = require("../../../Core/Define/ConfigQuery/WeaponConfByItemId"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  InventoryDefine_1 = require("./InventoryDefine"),
  ItemConfig_1 = require("./ItemConfig"),
  ITEM_LRU_SIZE = 20;
class InventoryConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.Eci = new Map()),
      (this.Sci = new Map()),
      (this.yci = new Map()),
      (this.G9 = new Lru_1.Lru(ITEM_LRU_SIZE, (e) => this.ABa(e)));
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
  GetItemConfigData(e) {
    InventoryConfig.Ici.Start();
    var n = this.G9.Get(e);
    return (
      n
        ? (this.G9.Put(n), InventoryConfig.Ici.Stop())
        : ((n = this.G9.Create(e)), this.G9.Put(n), InventoryConfig.Ici.Stop()),
      n
    );
  }
  ABa(e) {
    let n = void 0;
    var r,
      t = this.GetItemDataTypeByConfigId(e);
    switch (t) {
      case 2:
        n = this.GetWeaponItemConfig(e);
        break;
      case 3:
        n = this.GetPhantomItemConfig(e);
        break;
      case 4:
        var i = this.GetPhantomCustomizeItemConfig(e);
        i && (n = this.GetPhantomItemConfig(i.PhantomId));
        break;
      case 0:
      case 5:
        n = this.GetItemConfig(e);
        break;
      case 1:
        n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
        break;
      case 6:
        n = BackgroundCardById_1.configBackgroundCardById.GetConfig(e);
        break;
      case 7:
        n = this.GetPreviewItemConfig(e);
        break;
      case 8:
        n = RogueCurrencyById_1.configRogueCurrencyById.GetConfig(e);
    }
    if (n) return (r = new ItemConfig_1.ItemConfig()).Refresh(n, t), r;
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
    var n =
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
    return (
      this.Eci.clear(), this.Sci.clear(), this.yci.clear(), this.G9.Clear(), !0
    );
  }
}
(exports.InventoryConfig = InventoryConfig).Ici =
  Stats_1.Stat.Create("GetItemConfigData");
//# sourceMappingURL=InventoryConfig.js.map
