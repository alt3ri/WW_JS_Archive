"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonItemSmallItemGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LoopScrollSmallItemGrid_1 = require("../SmallItemGrid/LoopScrollSmallItemGrid");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CommonItemSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments), (this.Mne = 0);
  }
  OnRefresh(e, t, o) {
    this.Refresh(e);
  }
  Refresh(e) {
    var t = e[0];
    const o = e[1];
    var t =
      ((this.Mne = t.ItemId),
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        this.Mne,
      ));
    if (t === 1) {
      const i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        this.Mne,
      );
      const r = {
        Data: e,
        ElementId: i.ElementId,
        Type: 2,
        ItemConfigId: this.Mne,
        BottomText: o > 0 ? "" + o : "",
        QualityId: i.QualityId,
      };
      void this.Apply(r);
    } else if (t === 3) {
      const r = {
        Data: e,
        Type: 3,
        ItemConfigId: this.Mne,
        BottomText: o > 0 ? "" + o : "",
      };
      void this.Apply(r);
    } else {
      const r = {
        Data: e,
        Type: 4,
        ItemConfigId: this.Mne,
        BottomText: o > 0 ? "" + o : "",
      };
      this.Apply(r);
    }
  }
  RefreshByConfigId(e, t, o, i = !1) {
    if (
      ((this.Mne = e),
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        this.Mne,
      ) === 1)
    ) {
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Mne);
      const r = {
        Data: o,
        Type: 2,
        ItemConfigId: this.Mne,
        BottomText: t && t > 0 ? "" + t : "",
        QualityId: e.QualityId,
        IsReceivedVisible: i,
      };
      void this.Apply(r);
    } else {
      const r = {
        Data: o,
        Type: 4,
        ItemConfigId: this.Mne,
        BottomText: t && t > 0 ? "" + t : "",
        IsReceivedVisible: i,
      };
      this.Apply(r);
    }
  }
  OnCanExecuteChange() {
    return !1;
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
      this.Mne,
    );
  }
}
exports.CommonItemSmallItemGrid = CommonItemSmallItemGrid;
// # sourceMappingURL=CommonItemSmallItemGrid.js.map
