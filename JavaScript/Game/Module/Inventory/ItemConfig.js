"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemConfig = void 0);
const ModelUtil_1 = require("../../../Core/Utils/ModelUtil"),
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
      (this.ItemAccess = []),
      (this.SortIndex = 0),
      (this.RedDotDisableRule = 0),
      (this.Parameters = new Map()),
      (this.ItemBuffType = 0),
      (this.ShowTypes = []);
  }
  Refresh(i, s) {
    switch (
      ((this.Icon = i.Icon),
      (this.QualityId = i.QualityId),
      (this.AttributesDescription = i.AttributesDescription),
      s)
    ) {
      case 0:
      case 5:
        this.Cmi(i);
        break;
      case 3:
      case 4:
        this.gmi(i);
        break;
      case 2:
        this.fmi(i);
        break;
      case 1:
        this.pmi(i);
        break;
      case 6:
        this.vmi(i);
        break;
      case 7:
        this.Mmi(i);
        break;
      case 8:
        this.Emi(i);
        break;
      case 9:
        this.t8c(i);
        break;
      case 11:
        this.eMl(i);
        break;
      case 10:
        this.Ktl(i);
        break;
      case 14:
        this.GBc(i);
        break;
      case 12:
        this.u3l(i);
        break;
      case 13:
        this.bCc(i);
    }
  }
  Cmi(i) {
    (this.ItemDataType = 0),
      (this.ItemType = i.ItemType),
      (this.MainTypeId = i.MainTypeId),
      (this.Name = i.Name),
      (this.ItemBuffType = i.ItemBuffType),
      (this.ShowInBag = i.ShowInBag),
      (this.ObtainedShowDescription = i.ObtainedShowDescription);
    var s,
      t,
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
    for ([s, t] of i.Parameters) this.Parameters.set(s, t);
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
      (this.ItemBuffType = 0),
      (this.ShowInBag = i.ShowInBag),
      (this.ObtainedShowDescription = i.ObtainedShowDescription);
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
      (this.Name = i.Title),
      (this.ShowInBag = i.ShowInBag),
      (this.ObtainedShowDescription = i.ObtainedShowDescription);
  }
  t8c(i) {
    (this.ItemDataType = 9),
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
      (this.Name = i.Title),
      (this.ShowInBag = i.ShowInBag),
      (this.ObtainedShowDescription = i.ObtainedShowDescription);
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
      (this.ItemBuffType = 0),
      (this.ShowInBag = i.ShowInBag),
      (this.ObtainedShowDescription = i.ObtainedShowDescription);
  }
  GBc(i) {
    (this.ItemDataType = 14),
      (this.QualityId = i.QualityId),
      (this.ItemType = 24),
      (this.MainTypeId = 1),
      (this.Name = i.Name),
      (this.TypeDescription = i.TypeDescription),
      (this.BgDescription = i.BgDescription),
      (this.IconMiddle = i.IconMiddle),
      (this.IconSmall = i.IconSmall),
      (this.Mesh = i.Mesh),
      (this.ItemAccess = i.ItemAccess),
      this.Parameters.clear(),
      (this.SortIndex = i.SortIndex),
      (this.RedDotDisableRule = i.RedDotDisableRule),
      (this.ShowInBag = i.ShowInBag),
      (this.ObtainedShowDescription = i.ObtainedShowDescription);
  }
  Ktl(i) {
    (this.ItemDataType = 10),
      (this.ItemType = 18),
      (this.MainTypeId = 1),
      (this.Name = i.Name),
      (this.TypeDescription = i.TypeDescription),
      (this.BgDescription = i.BgDescription),
      (this.IconMiddle = i.IconMiddle),
      (this.IconSmall = i.IconSmall),
      (this.Mesh = i.Mesh),
      (this.ItemAccess = i.ItemAccess),
      this.Parameters.clear(),
      (this.SortIndex = i.SortIndex),
      (this.RedDotDisableRule = i.RedDotDisableRule),
      (this.ShowInBag = i.ShowInBag),
      (this.ObtainedShowDescription = i.ObtainedShowDescription);
  }
  u3l(i) {
    (this.ItemDataType = 12),
      (this.ItemType = 21),
      (this.MainTypeId = 1),
      (this.Name = i.Name),
      (this.TypeDescription = i.TypeDescription),
      (this.BgDescription = i.BgDescription),
      (this.IconMiddle = i.IconMiddle),
      (this.IconSmall = i.IconSmall),
      (this.ItemAccess = i.ItemAccess),
      this.Parameters.clear(),
      (this.SortIndex = i.SortIndex),
      (this.RedDotDisableRule = i.RedDotDisableRule),
      (this.ShowInBag = i.ShowInBag),
      (this.ObtainedShowDescription = i.ObtainedShowDescription);
  }
  eMl(i) {
    (this.ItemDataType = 11),
      (this.ItemType = 19),
      (this.MainTypeId = 1),
      (this.Name = i.Name),
      (this.TypeDescription = i.TypeDescription),
      (this.BgDescription = i.BgDescription),
      (this.IconMiddle = i.IconMiddle),
      (this.IconSmall = i.IconSmall),
      (this.ItemAccess = i.ItemAccess),
      this.Parameters.clear(),
      (this.SortIndex = i.SortIndex),
      (this.RedDotDisableRule = i.RedDotDisableRule),
      (this.ShowInBag = i.ShowInBag),
      (this.ObtainedShowDescription = i.ObtainedShowDescription);
  }
  bCc(i) {
    (this.ItemDataType = 13),
      (this.ItemType = 60006),
      (this.MainTypeId = 1),
      (this.Name = i.Name),
      (this.TypeDescription = i.TypeDescription),
      (this.BgDescription = i.BgDescription),
      (this.IconMiddle = i.IconMiddle),
      (this.IconSmall = i.IconSmall),
      (this.ItemAccess = void 0),
      this.Parameters.clear(),
      (this.SortIndex = 0),
      (this.RedDotDisableRule = 0),
      (this.ShowInBag = !0),
      (this.ObtainedShowDescription = ""),
      (this.AttributesDescription = i.AttributesDescription);
    i = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(
      i.QualityId,
    );
    this.Mesh = i?.Mesh ?? "";
  }
  pmi(i) {
    var s = ModelUtil_1.ModelUtil.GetModelConfig(i.MeshId);
    (this.ItemDataType = 1),
      (this.ItemType = void 0),
      (this.MainTypeId = 1),
      (this.Name = i.Name),
      (this.TypeDescription = void 0),
      (this.BgDescription = void 0),
      (this.IconMiddle = i.RoleHeadIconBig),
      (this.IconSmall = i.RoleHeadIcon),
      (this.Icon = i.RoleHeadIconLarge),
      (this.Mesh = s?.网格体.ToAssetPathName()),
      (this.ItemAccess = void 0),
      this.Parameters.clear(),
      (this.SortIndex = 0),
      (this.RedDotDisableRule = i.RedDotDisableRule),
      (this.ItemBuffType = 0),
      (this.ShowInBag = i.ShowInBag),
      (this.ObtainedShowDescription = i.ObtainedShowDescription);
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
      (this.ItemBuffType = 0),
      (this.ShowInBag = i.ShowInBag),
      (this.ObtainedShowDescription = i.ObtainedShowDescription);
  }
  Mmi(i) {
    (this.ItemDataType = 7),
      (this.ItemType = 9),
      (this.MainTypeId = 3),
      (this.Name = i.Name);
    var s = i.ShowTypes[0];
    s
      ? (s =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemShowTypeConfig(
            s,
          )) && (this.TypeDescription = s.Name)
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
