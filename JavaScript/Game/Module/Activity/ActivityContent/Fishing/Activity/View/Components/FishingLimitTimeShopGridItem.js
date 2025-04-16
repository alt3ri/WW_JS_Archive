"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingLimitTimeShopGridItem = void 0);
const PayShopGoods_1 = require("../../../../../../PayShop/PayShopData/PayShopGoods"),
  PayShopItem_1 = require("../../../../../../PayShop/PayShopTab/TabItem/PayShopItem");
class FishingLimitTimeShopGridItem extends PayShopItem_1.PayShopItem {
  constructor(t) {
    super(),
      (this.ActivityDataBase = t),
      (this.b2a = (t, e) => {
        this.SetNewFlagState(e.GetIfNeedRemind());
      });
  }
  OnStart() {
    super.OnStart(), this.SetExtraFunction(this.b2a), this.SetRedDotState(!1);
  }
  Refresh(t, e, s) {
    t instanceof PayShopGoods_1.PayShopGoods &&
      (super.Refresh(t, e, s), this.SetNewFlagState(t.GetIfNeedRemind()));
  }
}
exports.FishingLimitTimeShopGridItem = FishingLimitTimeShopGridItem;
//# sourceMappingURL=FishingLimitTimeShopGridItem.js.map
