"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemInteractionMediumItemGrid = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../MediumItemGrid/LoopScrollMediumItemGrid");
class ItemInteractionMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.rAt = 0), (this.VAt = void 0);
  }
  OnRefresh(e, t, i) {
    var s = (this.VAt = e).ItemConfigId,
      r =
        ((this.rAt =
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(s)),
        e.GetCurrentCount()),
      o = e.NeedCount,
      s = { Data: e, Type: 4, ItemConfigId: s, IsDisable: !e.IsEnable() };
    0 < r
      ? ((s.BottomTextId = "ItemCountSelected"),
        (s.BottomTextParameter = [r, this.rAt]),
        (s.ReduceButtonInfo = { IsVisible: !0, LongPressConfigId: 1 }))
      : this.rAt < o
        ? ((s.BottomTextId = "ItemCountNotEnough"),
          (s.BottomTextParameter = [this.rAt]))
        : (s.BottomText = this.rAt.toString()),
      this.Apply(s),
      this.SetSelected(e.IsSelected);
  }
  OnSelected(e) {
    this.VAt && (this.VAt.IsSelected = !0), this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.VAt && (this.VAt.IsSelected = !0), this.SetSelected(!1);
  }
  OnCanExecuteChange() {
    return this.VAt.IsEnable();
  }
}
exports.ItemInteractionMediumItemGrid = ItemInteractionMediumItemGrid;
//# sourceMappingURL=ItemInteractionMediumItemGrid.js.map
