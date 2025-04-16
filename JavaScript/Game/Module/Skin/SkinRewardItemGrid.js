"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkinRewardItemGrid = exports.SkinRewardData = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LoopScrollSmallItemGrid_1 = require("../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class SkinRewardData {
  constructor() {
    (this.ItemData = void 0), (this.FinishState = !1);
  }
}
exports.SkinRewardData = SkinRewardData;
class SkinRewardItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments), (this.Mne = 0);
  }
  OnRefresh(e, r, t) {
    this.Refresh(e);
  }
  Refresh(e) {
    var r = e.ItemData[0],
      r =
        ((this.Mne = r.ItemId),
        {
          Data: e,
          Type: 4,
          ItemConfigId: this.Mne,
          IsReceivedVisible: e.FinishState,
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
exports.SkinRewardItemGrid = SkinRewardItemGrid;
//# sourceMappingURL=SkinRewardItemGrid.js.map
