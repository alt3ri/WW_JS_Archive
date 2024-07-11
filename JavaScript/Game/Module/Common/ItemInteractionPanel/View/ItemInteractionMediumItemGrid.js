"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemInteractionMediumItemGrid = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../MediumItemGrid/LoopScrollMediumItemGrid");
class ItemInteractionMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.hPt = 0), (this.WPt = void 0);
  }
  OnRefresh(e, t, i) {
    var s = (this.WPt = e).ItemConfigId,
      o =
        ((this.hPt =
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(s)),
        e.GetCurrentCount()),
      r = e.NeedCount,
      s = { Data: e, Type: 4, ItemConfigId: s, IsDisable: !e.IsEnable() };
    0 < o
      ? ((s.BottomTextId = "ItemCountSelected"),
        (s.BottomTextParameter = [o, this.hPt]),
        (s.ReduceButtonInfo = { IsVisible: !0, LongPressConfigId: 1 }))
      : this.hPt < r
        ? ((s.BottomTextId = "ItemCountNotEnough"),
          (s.BottomTextParameter = [this.hPt]))
        : (s.BottomText = this.hPt.toString()),
      this.Apply(s),
      this.SetSelected(e.IsSelected);
  }
  OnSelected(e) {
    this.WPt && (this.WPt.IsSelected = !0), this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.WPt && (this.WPt.IsSelected = !0), this.SetSelected(!1);
  }
}
exports.ItemInteractionMediumItemGrid = ItemInteractionMediumItemGrid;
//# sourceMappingURL=ItemInteractionMediumItemGrid.js.map
