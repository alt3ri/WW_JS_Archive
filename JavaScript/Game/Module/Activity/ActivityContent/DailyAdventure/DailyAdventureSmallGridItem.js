"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyAdventureSmallGridItem = void 0);
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
class DailyAdventureSmallGridItem extends SmallItemGrid_1.SmallItemGrid {
  constructor() {
    super(...arguments), (this.Mne = 0);
  }
  Refresh(e, t, i) {
    var l = e.Item,
      s = l[1],
      l =
        ((this.Mne = l[0].ItemId),
        {
          Data: e,
          Type: 4,
          ItemConfigId: this.Mne,
          BottomText: 0 < s ? "" + s : "",
          IsReceivedVisible: e.HasClaimed,
          IsReceivableVisible: t,
          IsLockVisible: i,
        });
    this.Apply(l);
  }
  OnCanExecuteChange() {
    return !1;
  }
  OnExtendToggleClicked() {}
}
exports.DailyAdventureSmallGridItem = DailyAdventureSmallGridItem;
//# sourceMappingURL=DailyAdventureSmallGridItem.js.map
