"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySmallItemGrid = void 0);
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class ActivitySmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments), (this.Mne = 0);
  }
  OnRefresh(e, t, r) {
    this.Refresh(e);
  }
  Refresh(e) {
    var t = e.Item;
    const r = t[1];
    var t =
      ((this.Mne = t[0].ItemId),
      {
        Data: e,
        Type: 4,
        ItemConfigId: this.Mne,
        BottomText: r > 0 ? "" + r : "",
        IsReceivedVisible: e.HasClaimed,
      });
    this.Apply(t);
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
exports.ActivitySmallItemGrid = ActivitySmallItemGrid;
// # sourceMappingURL=ActivitySmallItemGrid.js.map
