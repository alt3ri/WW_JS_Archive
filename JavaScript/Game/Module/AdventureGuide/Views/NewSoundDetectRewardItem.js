"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundDetectRewardItem = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class NewSoundDetectRewardItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments), (this.Mne = -1);
  }
  OnRefresh(e) {
    var t = e.ItemData[0],
      o = e.ItemData[1],
      t = ((this.Mne = t.ItemId), e.HaveFinish),
      e = {
        Data: e,
        Type: 4,
        IsReceivedVisible: t,
        ItemConfigId: this.Mne,
        BottomText: 0 < o ? "" + o : "",
      };
    this.Apply(e);
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
exports.NewSoundDetectRewardItem = NewSoundDetectRewardItem;
//# sourceMappingURL=NewSoundDetectRewardItem.js.map
