"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeliverMediumItemGrid = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class DeliverMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, o, r) {
    var t, i, l;
    e.HasItem()
      ? ((t = e.GetNeedCount()),
        (l = e.GetCurrentCount()),
        (i = { Data: e, Type: 4, ItemConfigId: e.GetCurrentItemConfigId() }),
        1 < e.GetItemRangeList().length &&
          (i.ReduceButtonInfo = { IsVisible: 0 < l, LongPressConfigId: 1 }),
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
    var e = this.Data;
    e.HasItem() &&
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
        e.GetCurrentItemConfigId(),
      );
  }
}
exports.DeliverMediumItemGrid = DeliverMediumItemGrid;
//# sourceMappingURL=DeliverMediumItemGrid.js.map
