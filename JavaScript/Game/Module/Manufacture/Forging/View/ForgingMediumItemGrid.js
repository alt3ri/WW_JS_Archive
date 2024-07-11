"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForgingMediumItemGrid = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const ForgingController_1 = require("../ForgingController");
class ForgingMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
  OnRefresh(i, r, e) {
    let o = i.ItemId;
    const t =
      ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(o).ItemId;
    const l =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    if (l) {
      const n = i.IsUnlock;
      let e = !1;
      e = n
        ? ForgingController_1.ForgingController.CheckCanForging(o)
        : ForgingController_1.ForgingController.CheckCanUnlock(o);
      o = {
        Type: 4,
        Data: i,
        ItemConfigId: t,
        BottomTextId: l.Name,
        IsProhibit: !n,
        IsNewVisible: i.IsNew,
        IsDisable: n > 0 && !e,
        IsRedDotVisible: e && !i.IsUnlock,
        StarLevel: l.QualityId,
        IsOmitBottomText: !0,
        IsTimeFlagVisible: i.ExistEndTime > 0,
      };
      this.Apply(o), this.SetSelected(r);
    }
  }
}
exports.ForgingMediumItemGrid = ForgingMediumItemGrid;
// # sourceMappingURL=ForgingMediumItemGrid.js.map
