"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScratchTicketRewardItemGrid = void 0);
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  LoopScrollSmallItemGrid_1 = require("../../../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class ScratchTicketRewardItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments), (this.Mne = 0);
  }
  OnRefresh(e, r, t) {
    this.Refresh(e);
  }
  Refresh(e) {
    var r = e[0],
      t = e[1],
      r =
        ((this.Mne = r.ItemId),
        {
          Data: e,
          Type: 4,
          ItemConfigId: this.Mne,
          BottomText: t.toString(),
          IsReceivedVisible: 0 === t,
        });
    this.Apply(r);
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
exports.ScratchTicketRewardItemGrid = ScratchTicketRewardItemGrid;
//# sourceMappingURL=ScratchTicketRewardItemGrid.js.map
