"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemConfig = void 0);
const BackgroundCard_1 = require("../../../Core/Define/Config/BackgroundCard"),
  ItemInfo_1 = require("../../../Core/Define/Config/ItemInfo"),
  PhantomItem_1 = require("../../../Core/Define/Config/PhantomItem"),
  PreviewItem_1 = require("../../../Core/Define/Config/PreviewItem"),
  RogueCurrency_1 = require("../../../Core/Define/Config/RogueCurrency"),
  RoleInfo_1 = require("../../../Core/Define/Config/RoleInfo"),
  WeaponConf_1 = require("../../../Core/Define/Config/WeaponConf"),
  ModelUtil_1 = require("../../../Core/Utils/ModelUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
class ItemConfig {
  constructor() {
    (this.ItemDataType = 0),
      (this.ItemType = void 0),
      (this.MainTypeId = 1),
      (this.Name = ""),
      (this.TypeDescription = void 0),
      (this.AttributesDescription = ""),
      (this.ObtainedShowDescription = ""),
      (this.BgDescription = void 0),
      (this.ShowInBag = !1),
      (this.Icon = ""),
      (this.IconMiddle = void 0),
      (this.IconSmall = void 0),
      (this.Mesh = void 0),
      (this.QualityId = 0),
      (this.ItemAccess = void 0),
      (this.SortIndex = 0),
      (this.RedDotDisableRule = 0),
      (this.Parameters = new Map()),
      (this.ItemBuffType = 0),
      (this.ShowTypes = void 0);
  }
  Refresh(i) {
    (this.Icon = i.Icon),
      (this.QualityId = i.QualityId),
      (this.AttributesDescription = i.AttributesDescription),
      i instanceof PreviewItem_1.PreviewItem ||
        ((this.ShowInBag = i.ShowInBag),
        (this.ObtainedShowDescription = i.ObtainedShowDescription)),
      i instanceof ItemInfo_1.ItemInfo
        ? this.Cmi(i)
        : i instanceof PhantomItem_1.PhantomItem
          ? this.gmi(i)
          : i instanceof WeaponConf_1.WeaponConf
            ? this.fmi(i)
            : (i instanceof RoleInfo_1.RoleInfo && this.pmi(i),
              i instanceof BackgroundCard_1.BackgroundCard && this.vmi(i),
              i instanceof PreviewItem_1.PreviewItem && this.Mmi(i),
              i instanceof RogueCurrency_1.RogueCurrency && this.Emi(i));
  }
  Cmi(i) {
    (this.ItemDataType = 0),
      (this.ItemType = i.ItemType),
      (this.MainTypeId = i.MainTypeId),
      (this.Name = i.Name),
      (this.ItemBuffType = i.ItemBuffType);
    var t,
      s,
      h = i.ShowTypes[0];
    h
      ? (h =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemShowTypeConfig(
            h,
          )) && (this.TypeDescription = h.Name)
      : (this.TypeDescription = void 0),
      (this.BgDescription = i.BgDescription),
      (this.IconMiddle = i.IconMiddle),
      (this.IconSmall = i.IconSmall),
      (this.Mesh = i.Mesh),
      (this.ItemAccess = i.ItemAccess),
      (this.RedDotDisableRule = i.RedDotDisableRule),
      this.Parameters.clear();
    for ([t, s] of i.Parameters) this.Parameters.set(t, s);
    (this.SortIndex = i.SortIndex), (this.ShowTypes = i.ShowTypes);
  }
  gmi(i) {
    (this.ItemDataType = 3),
      (this.ItemType = 9),
      (this.MainTypeId = 3),
      (this.Name = i.MonsterName),
      (this.TypeDescription = i.TypeDescription),
      (this.IconMiddle = i.IconMiddle),
      (this.IconSmall = i.IconSmall),
      (this.Mesh = i.Mesh),
      (this.ItemAccess = i.ItemAccess),
      this.Parameters.clear(),
      (this.SortIndex = i.SortIndex),
      (this.RedDotDisableRule = i.RedDotDisableRule),
      (this.ItemBuffType = 0);
  }
  Emi(i) {
    (this.ItemDataType = 8),
      (this.QualityId = i.QualityId),
      (this.ItemType = 15),
      (this.MainTypeId = 1),
      (this.TypeDescription = i.TypeDescription),
      (this.BgDescription = i.BgDescription),
      (this.IconMiddle = i.IconMiddle),
      (this.IconSmall = i.IconSmall),
      (this.ItemAccess = i.ItemAccess),
      this.Parameters.clear(),
      (this.SortIndex = i.SortIndex),
      (this.RedDotDisableRule = i.RedDotDisableRule),
      (this.ItemBuffType = 0),
      (this.Name = i.Title);
  }
  fmi(i) {
    (this.ItemDataType = 2),
      (this.ItemType = 2),
      (this.MainTypeId = 2),
      (this.Name = i.WeaponName),
      (this.TypeDescription = i.TypeDescription),
      (this.BgDescription = i.BgDescription),
      (this.IconMiddle = i.IconMiddle),
      (this.IconSmall = i.IconSmall),
      (this.Mesh = i.Mesh),
      (this.ItemAccess = i.ItemAccess),
      this.Parameters.clear(),
      (this.SortIndex = i.SortIndex),
      (this.RedDotDisableRule = i.RedDotDisableRule),
      (this.ItemBuffType = 0);
  }
  pmi(i) {
    var t = ModelUtil_1.ModelUtil.GetModelConfig(i.MeshId);
    (this.ItemDataType = 1),
      (this.ItemType = void 0),
      (this.MainTypeId = 1),
      (this.Name = i.Name),
      (this.TypeDescription = void 0),
      (this.BgDescription = void 0),
      (this.IconMiddle = i.RoleHeadIconBig),
      (this.IconSmall = i.RoleHeadIcon),
      (this.Icon = i.RoleHeadIconLarge),
      (this.Mesh = t?.网格体.ToAssetPathName()),
      (this.ItemAccess = void 0),
      this.Parameters.clear(),
      (this.SortIndex = 0),
      (this.RedDotDisableRule = i.RedDotDisableRule),
      (this.ItemBuffType = 0);
  }
  vmi(i) {
    (this.ItemDataType = 6),
      (this.ItemType = 14),
      (this.MainTypeId = 8),
      (this.Name = i.Title),
      (this.TypeDescription = i.TypeDescription),
      (this.BgDescription = i.BgDescription),
      (this.IconMiddle = i.IconMiddle),
      (this.IconSmall = i.IconSmall),
      (this.Mesh = void 0),
      (this.ItemAccess = i.ItemAccess),
      this.Parameters.clear(),
      (this.SortIndex = 0),
      (this.RedDotDisableRule = i.RedDotDisableRule),
      (this.ItemBuffType = 0);
  }
  Mmi(i) {
    (this.ItemDataType = 7),
      (this.ItemType = 9),
      (this.MainTypeId = 3),
      (this.Name = i.Name);
    var t = i.ShowTypes[0];
    t
      ? (t =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemShowTypeConfig(
            t,
          )) && (this.TypeDescription = t.Name)
      : (this.TypeDescription = void 0),
      (this.BgDescription = i.BgDescription),
      (this.IconMiddle = i.IconMiddle),
      (this.IconSmall = i.IconSmall),
      (this.Mesh = void 0),
      (this.ItemAccess = i.PreviewItemAccess),
      this.Parameters.clear(),
      (this.SortIndex = 0),
      (this.RedDotDisableRule = 0),
      (this.ItemBuffType = 0),
      (this.ShowTypes = i.ShowTypes);
  }
}
exports.ItemConfig = ItemConfig;
//# sourceMappingURL=ItemConfig.js.map
