"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerMediumItem = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  ShipTowerDefine_1 = require("../ShipTowerDefine");
class ShipTowerMediumItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments),
      (this.RefreshCallBack = void 0),
      (this.GetStageIdCallback = void 0);
  }
  OnStart() {
    this.SetToggleInteractive(!1);
  }
  OnRefresh(e, t, o) {
    this.RefreshCallBack?.(e);
  }
  Z8_(e) {
    return (
      1 ===
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        e.Id,
      )
    );
  }
  RefreshRecommend(e) {
    this.Z8_(e) ? this.RefreshRecommendRole(e) : this.RefreshRecommendBuff(e);
  }
  RefreshRecommendRole(e) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Id),
      o =
        t?.GetRoleConfig() ??
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.Id),
      e = {
        Type: 2,
        ItemConfigId: e.Id,
        SkinId: o.SkinId,
        BottomTextId: o.Name,
        IsDisable: !(void 0 !== t),
        ElementId: o.ElementId,
      };
    this.Apply(e);
  }
  RefreshRecommendBuff(e) {
    var t = ModelManager_1.ModelManager.ShipTowerModel?.GetBuffDataByBuffId(
        e.Id,
      ),
      o = ConfigManager_1.ConfigManager.ShipTowerConfig?.GetBuffCfgById(e.Id),
      o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
        o?.ItemId ?? 1,
      ),
      e = {
        Data: e,
        Type: 4,
        ItemConfigId: o.Id,
        BottomTextId: o.Name,
        IsDisable: !t?.IsCanUse(this.GetStageIdCallback?.()),
      };
    this.Apply(e);
  }
  RefreshRecord(e) {
    this.Z8_(e) ? this.RefreshRecordRole(e) : this.RefreshRecordBuff(e);
  }
  RefreshRecordRole(e) {
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.Id),
      e = {
        Type: 2,
        ItemConfigId: e.Id,
        SkinId: t.SkinId,
        BottomTextId: ShipTowerDefine_1.shipTowerTextKey.LevelShow,
        BottomTextParameter: [e.Count],
        ElementId: t.ElementId,
      };
    this.Apply(e);
  }
  RefreshRecordBuff(e) {
    var t = ConfigManager_1.ConfigManager.ShipTowerConfig?.GetBuffCfgById(e.Id),
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
        t?.ItemId ?? 1,
      ),
      e = { Data: e, Type: 4, ItemConfigId: t.Id, BottomTextId: t.Name };
    this.Apply(e);
  }
  OnForceSelected() {
    this.SetSelected(!0, !0);
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
}
exports.ShipTowerMediumItem = ShipTowerMediumItem;
//# sourceMappingURL=ShipTowerMediumItem.js.map
