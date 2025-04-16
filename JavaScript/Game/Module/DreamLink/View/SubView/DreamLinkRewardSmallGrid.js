"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkRewardSmallGrid = void 0);
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class DreamLinkRewardSmallGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments), (this.$Tt = void 0), (this.Mne = 0);
  }
  OnRefresh(e, r, t) {
    var l = (this.$Tt = e).Item,
      o = l[1],
      l =
        ((this.Mne = l[0].ItemId),
        {
          Data: e,
          Type: 4,
          ItemConfigId: this.Mne,
          BottomText: 0 < o ? "" + o : "",
          IsReceivedVisible: 2 === e.Status,
        });
    this.Apply(l), this.SetReceivableVisible(0 === e.Status);
  }
  OnCanExecuteChange() {
    return !1;
  }
  OnExtendToggleClicked() {
    0 === this.$Tt.Status
      ? this.$Tt.ReceiveDelegate()
      : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.Mne,
        );
  }
}
exports.DreamLinkRewardSmallGrid = DreamLinkRewardSmallGrid;
//# sourceMappingURL=DreamLinkRewardSmallGrid.js.map
