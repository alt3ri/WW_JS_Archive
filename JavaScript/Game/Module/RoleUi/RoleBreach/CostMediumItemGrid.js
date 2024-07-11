"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CostMediumItemGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class CostMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(t, e, o) {
    const r = t.ItemId;
    const i =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(r);
    if (i) {
      const m = { Type: 4 };
      if (t.OnlyTextFlag)
        (m.Type = 4),
          (m.Data = t),
          (m.ItemConfigId = r),
          (m.StarLevel = i.QualityId),
          (m.BottomText = t.Count.toString());
      else {
        let d = t.SelectedCount;
        const s = t.Count;
        let e = "Text_ItemEnoughText_Text";
        d < s && (e = "Text_ItemNotEnoughText_Text");
        d = [d, s];
        (m.Data = t),
          (m.ItemConfigId = r),
          (m.StarLevel = i.QualityId),
          (m.BottomTextId = e),
          (m.BottomTextParameter = d);
      }
      (m.IsOmitBottomText = !1), this.Apply(m);
    }
  }
}
exports.CostMediumItemGrid = CostMediumItemGrid;
// # sourceMappingURL=CostMediumItemGrid.js.map
