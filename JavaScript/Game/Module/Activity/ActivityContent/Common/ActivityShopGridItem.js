"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityShopGridItem = void 0);
const PayShopGoods_1 = require("../../../PayShop/PayShopData/PayShopGoods"),
  PayShopItem_1 = require("../../../PayShop/PayShopTab/TabItem/PayShopItem");
class ActivityShopGridItem extends PayShopItem_1.PayShopItem {
  constructor() {
    super(...arguments),
      (this.b2a = (t, o) => {
        this.SetNewFlagState(o.GetIfNeedRemind());
      });
  }
  OnStart() {
    super.OnStart(), this.SetExtraFunction(this.b2a), this.SetRedDotState(!1);
  }
  Refresh(t, o, e) {
    t instanceof PayShopGoods_1.PayShopGoods &&
      (super.Refresh(t, o, e), this.SetNewFlagState(t.GetIfNeedRemind()));
  }
}
exports.ActivityShopGridItem = ActivityShopGridItem;
//# sourceMappingURL=ActivityShopGridItem.js.map
