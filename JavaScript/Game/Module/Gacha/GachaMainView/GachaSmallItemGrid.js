"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaSmallItemGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class GachaSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, o, a) {
    if (
      1 ===
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e)
    ) {
      const t = { Type: 2, ItemConfigId: e, Data: void 0 };
      void this.Apply(t);
    } else {
      const t = { Data: void 0, Type: 4, ItemConfigId: e };
      this.Apply(t), this.SetToggleInteractive(!1);
    }
  }
  OnCanExecuteChange() {
    return !1;
  }
  OnExtendToggleClicked() {}
}
exports.GachaSmallItemGrid = GachaSmallItemGrid;
//# sourceMappingURL=GachaSmallItemGrid.js.map
