"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyAdventureSmallGridItem = void 0);
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class DailyAdventureSmallGridItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments), (this.Mne = 0);
  }
  OnRefresh(e, t, l) {
    this.Refresh(e);
  }
  Refresh(e) {
    var t = e.Item,
      l = t[1],
      t =
        ((this.Mne = t[0].ItemId),
        {
          Data: e,
          Type: 4,
          ItemConfigId: this.Mne,
          BottomText: 0 < l ? "" + l : "",
          IsReceivedVisible: e.HasClaimed,
        });
    this.Apply(t);
  }
  OnCanExecuteChange() {
    return !1;
  }
  OnExtendToggleClicked() {}
}
exports.DailyAdventureSmallGridItem = DailyAdventureSmallGridItem;
//# sourceMappingURL=DailyAdventureSmallGridItem.js.map
