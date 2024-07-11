"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeliverMediumItemGrid = void 0);
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class DeliverMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, o, r) {
    let t, i, l;
    e.HasItem()
      ? ((t = e.GetNeedCount()),
        (l = e.GetCurrentCount()),
        (i = { Data: e, Type: 4, ItemConfigId: e.GetCurrentItemConfigId() }),
        e.GetItemRangeList().length > 1 &&
          (i.ReduceButtonInfo = { IsVisible: l > 0, LongPressConfigId: 1 }),
        l < t
          ? ((i.BottomTextId = "DeliverSlotCountNotEnough"),
            (i.BottomTextParameter = [l, t]))
          : (i.BottomText = l + "/" + t),
        this.Apply(i))
      : ((l = {
          Data: e,
          Type: 1,
          BottomText: e.GetCurrentCount() + "/" + e.GetNeedCount(),
        }),
        this.Apply(l));
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
  OnCanExecuteChange() {
    return !1;
  }
  OnExtendToggleClicked() {
    const e = this.Data;
    e.HasItem() &&
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
        e.GetCurrentItemConfigId(),
      );
  }
}
exports.DeliverMediumItemGrid = DeliverMediumItemGrid;
// # sourceMappingURL=DeliverMediumItemGrid.js.map
