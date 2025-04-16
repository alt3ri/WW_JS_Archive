"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonItemSmallItemGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  LoopScrollSmallItemGrid_1 = require("../SmallItemGrid/LoopScrollSmallItemGrid");
class CommonItemSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments),
      (this.ConfigId = 0),
      (this.thl = !0),
      (this.ShowReceivedCallBack = void 0);
  }
  OnRefresh(e, t, i) {
    this.Refresh(e);
  }
  Refresh(e) {
    var t = e[0],
      i = e[1],
      t =
        ((this.ConfigId = t.ItemId),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          this.ConfigId,
        ));
    if (1 === t) {
      var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        this.ConfigId,
      );
      const s = {
        Data: e,
        ElementId: o.ElementId,
        Type: 2,
        ItemConfigId: this.ConfigId,
        BottomText: 0 < i ? "" + i : "",
        QualityId: o.QualityId,
        IsReceivedVisible: this.ShowReceivedCallBack?.(e),
      };
      void this.Apply(s);
    } else if (3 === t) {
      const s = {
        Data: e,
        Type: 3,
        ItemConfigId: this.ConfigId,
        BottomText: 0 < i ? "" + i : "",
        IsReceivedVisible: this.ShowReceivedCallBack?.(e),
      };
      void this.Apply(s);
    } else {
      const s = {
        Data: e,
        Type: 4,
        ItemConfigId: this.ConfigId,
        BottomText: 0 < i ? "" + i : "",
        IsReceivedVisible: this.ShowReceivedCallBack?.(e),
      };
      this.Apply(s);
    }
  }
  RefreshByConfigId(e, t, i, o = !1) {
    if (
      ((this.ConfigId = e),
      1 ===
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          this.ConfigId,
        ))
    ) {
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.ConfigId);
      const s = {
        Data: i,
        Type: 2,
        ItemConfigId: this.ConfigId,
        BottomText: t && 0 < t ? "" + t : "",
        QualityId: e.QualityId,
        IsReceivedVisible: o,
      };
      void this.Apply(s);
    } else {
      const s = {
        Data: i,
        Type: 4,
        ItemConfigId: this.ConfigId,
        BottomText: t && 0 < t ? "" + t : "",
        IsReceivedVisible: o,
      };
      this.Apply(s);
    }
  }
  OnCanExecuteChange() {
    return !1;
  }
  SetAllowClickBack(e) {
    this.thl = e;
  }
  OnExtendToggleClicked() {
    this.thl &&
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
        this.ConfigId,
      );
  }
}
exports.CommonItemSmallItemGrid = CommonItemSmallItemGrid;
//# sourceMappingURL=CommonItemSmallItemGrid.js.map
