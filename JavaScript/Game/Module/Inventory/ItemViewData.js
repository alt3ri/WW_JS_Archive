"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemViewData = void 0);
const UiPlayItemById_1 = require("../../../Core/Define/ConfigQuery/UiPlayItemById");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class ItemViewData {
  constructor(e) {
    this.Lci = e;
  }
  SetItemViewInfo(e) {
    this.Lci = e;
  }
  GetItemViewInfo() {
    return this.Lci;
  }
  Dci(e) {
    this.Lci.IsNewItem = e;
  }
  SetIsLock(e) {
    this.Lci.IsLock = e;
  }
  SetHasRedDot(e) {
    this.Lci.HasRedDot = e;
  }
  GetRedDotDisableRule() {
    var e = this.GetConfigId();
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    return e ? e.RedDotDisableRule : 0;
  }
  GetConfigId() {
    return this.Lci.ConfigId;
  }
  GetUniqueId() {
    return this.GetItemDataBase()?.GetUniqueId();
  }
  GetQuality() {
    return this.GetItemDataBase()?.GetQuality();
  }
  SetCount(e) {
    this.Lci.Count = e;
  }
  GetCount() {
    return this.Lci.Count;
  }
  SetStackId(e) {
    this.Lci.StackId = e;
  }
  GetStackId() {
    return this.Lci.StackId;
  }
  SetSelectOn(e) {
    this.Lci.IsSelectOn = e;
  }
  GetSelectOn() {
    return this.Lci.IsSelectOn;
  }
  SetSelectNum(e) {
    this.Lci.SelectOnNum = e;
  }
  GetSelectNum() {
    return this.Lci.SelectOnNum;
  }
  GetItemDataBase() {
    return this.Lci.ItemDataBase;
  }
  GetItemDataType() {
    return this.Lci.ItemDataType;
  }
  GetSortIndex() {
    return this.GetItemDataBase().GetSortIndex();
  }
  RemoveNewItem() {
    const e = ModelManager_1.ModelManager.InventoryModel;
    const t = this.GetItemDataType();
    const r = this.GetConfigId();
    const i = this.GetUniqueId();
    t === 0 ? e.RemoveNewCommonItem(r, i) : e.RemoveNewAttributeItem(i),
      this.Dci(!1);
  }
  RemoveRedDotItem() {
    const e = ModelManager_1.ModelManager.InventoryModel;
    const t = this.GetItemDataType();
    const r = this.GetConfigId();
    const i = this.GetUniqueId();
    t === 0 ? e.RemoveRedDotCommonItem(r, i) : e.RemoveRedDotAttributeItem(i),
      this.SetHasRedDot(!1);
  }
  IsBuffItem() {
    return ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(
      this.GetConfigId(),
    );
  }
  IsTeamBuffItem() {
    return ConfigManager_1.ConfigManager.BuffItemConfig.IsTeamBuffItem(
      this.GetConfigId(),
    );
  }
  GetUiPlayItem() {
    const e = this.GetConfigId();
    return UiPlayItemById_1.configUiPlayItemById.GetConfig(e);
  }
  GetItemType() {
    return this.GetItemDataBase()?.GetType();
  }
  GetAttributeLevel() {
    let e;
    const t = this.GetItemDataType();
    const r = this.GetUniqueId();
    return t === 3
      ? (e =
          ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
            r,
          ))
        ? e.GetPhantomLevel()
        : 0
      : t === 2
        ? ModelManager_1.ModelManager.WeaponModel.GetWeaponLevelById(r)
        : 0;
  }
  GetItemOperationType() {
    return this.Lci.ItemOperationMode;
  }
  IsItemCanDestroy() {
    switch (this.GetItemDataType()) {
      case 0:
        return this.GetItemDataBase().GetConfig().Destructible;
      case 2:
        var e = this.GetItemDataBase();
        var t = e.GetUniqueId();
        var t = t
          ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(t)
          : void 0;
        var r = e.GetIsLock();
        var i = !!t && t.GetRoleId() !== 0;
        var e = e.GetConfig().Destructible;
        var t = !!t && t.HasWeaponCultivated();
        return e && !r && !i && !t;
      case 3:
        (e = this.GetItemDataBase()),
          (r = e.GetUniqueId()),
          (i = e.GetIsLock()),
          (t =
            ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
              r,
            )),
          (r = !!t && t !== 0);
        return e.GetConfig().Destructible && !i && !r;
    }
    return !1;
  }
  IsEqual(e, t) {
    const r = this.GetConfigId() === e.GetConfigId();
    const i = this.GetUniqueId() === e.GetUniqueId();
    var e = this.GetStackId() === e.GetStackId();
    return t ? r && i && e : r && i;
  }
}
exports.ItemViewData = ItemViewData;
// # sourceMappingURL=ItemViewData.js.map
