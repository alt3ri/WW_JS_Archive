"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BirthdayRewardItem = void 0);
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
class BirthdayRewardItem extends CommonItemSmallItemGrid_1.CommonItemSmallItemGrid {
  Refresh(e) {
    var t = e[0],
      m = e[1],
      t =
        ((this.ConfigId = t.ItemId),
        {
          Data: e,
          Type: 4,
          ItemConfigId: this.ConfigId,
          BottomText: 0 < m ? "" + m : "",
          IsReceivedVisible: this.ShowReceivedCallBack?.(e),
          IsBirthdayEffectVisible: 0 === this.GridIndex,
        });
    this.Apply(t);
  }
}
exports.BirthdayRewardItem = BirthdayRewardItem;
//# sourceMappingURL=BirthdayRewardItem.js.map
