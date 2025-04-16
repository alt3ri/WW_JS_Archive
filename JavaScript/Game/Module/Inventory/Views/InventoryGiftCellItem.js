"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryGiftCellItem = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiManager_1 = require("../../../Ui/UiManager"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
class InventoryGiftCellItem extends SmallItemGrid_1.SmallItemGrid {
  constructor() {
    super(...arguments), (this.Tgl = void 0);
  }
  RefreshByConfigId(e) {
    if (
      ((this.Tgl = e),
      1 ===
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          e.ItemId,
        ))
    ) {
      var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.ItemId);
      const i = {
        Data: void 0,
        Type: 2,
        ItemConfigId: e.ItemId,
        BottomText: "",
        QualityId: t.QualityId,
        IsReceivedVisible: !1,
      };
      void this.Apply(i);
    } else if (void 0 !== this.Tgl.PhantomItemData) {
      const i = {
        Data: void 0,
        Type: 3,
        ItemConfigId: e.ItemId,
        BottomText: "",
        IsReceivedVisible: !1,
        FetterGroupId: this.Tgl.PhantomItemData.Kws,
      };
      void this.Apply(i);
    } else {
      const i = {
        Data: void 0,
        Type: 4,
        ItemConfigId: e.ItemId,
        BottomText: "",
        IsReceivedVisible: !1,
      };
      this.Apply(i);
    }
  }
  OnCanExecuteChange() {
    return !1;
  }
  OnExtendToggleClicked() {
    var e = UiManager_1.UiManager.IsViewShow("InventoryView");
    this.Tgl.PhantomItemData
      ? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByExtraParam(
          this.Tgl.IncId,
          this.Tgl.PhantomItemData.s5n,
          this.Tgl.PhantomItemData,
          e,
        )
      : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(
          this.Tgl.IncId,
          this.Tgl.ItemId,
          e,
        );
  }
}
exports.InventoryGiftCellItem = InventoryGiftCellItem;
//# sourceMappingURL=InventoryGiftCellItem.js.map
