"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashLevelUpRewardItemGrid = exports.CalabashRewardItemData =
    void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class CalabashRewardItemData {
  constructor() {
    (this.ReceiveState = 0), (this.ItemData = void 0);
  }
}
exports.CalabashRewardItemData = CalabashRewardItemData;
class CalabashLevelUpRewardItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments), (this.Mne = 0);
  }
  OnRefresh(e, t, r) {
    this.Mne = e.ItemData[0].ItemId;
    var a = e.ItemData[1];
    this.Qpt(this.Mne, a, e);
  }
  Qpt(e, t, r) {
    if (
      ((this.Mne = e),
      1 ===
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          this.Mne,
        ))
    ) {
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Mne);
      const a = {
        Data: r,
        Type: 2,
        ItemConfigId: this.Mne,
        BottomText: 0 < (t ?? 0) ? "" + t : "",
        QualityId: e.QualityId,
        IsReceivedVisible: 3 === r?.ReceiveState,
      };
      void this.Apply(a);
    } else {
      const a = {
        Data: r,
        Type: 4,
        ItemConfigId: this.Mne,
        BottomText: 0 < (t ?? 0) ? "" + t : "",
        IsReceivedVisible: 3 === r?.ReceiveState,
      };
      this.Apply(a);
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
exports.CalabashLevelUpRewardItemGrid = CalabashLevelUpRewardItemGrid;
//# sourceMappingURL=CalabashLevelUpRewardItemGrid.js.map
