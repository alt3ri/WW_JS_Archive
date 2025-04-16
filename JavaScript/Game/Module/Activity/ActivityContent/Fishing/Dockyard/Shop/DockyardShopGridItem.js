"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardShopGridItem = void 0);
const PayShopGoods_1 = require("../../../../../PayShop/PayShopData/PayShopGoods"),
  PayShopItem_1 = require("../../../../../PayShop/PayShopTab/TabItem/PayShopItem");
class DockyardShopGridItem extends PayShopItem_1.PayShopItem {
  constructor() {
    super(...arguments),
      (this.b2a = (o, e) => {
        this.SetNewFlagState(e.GetIfNeedRemind());
      });
  }
  OnStart() {
    super.OnStart(), this.SetExtraFunction(this.b2a), this.SetRedDotState(!1);
  }
  Refresh(o, e, t) {
    o instanceof PayShopGoods_1.PayShopGoods &&
      (super.Refresh(o, e, t), this.SetNewFlagState(o.GetIfNeedRemind()));
  }
}
exports.DockyardShopGridItem = DockyardShopGridItem;
//# sourceMappingURL=DockyardShopGridItem.js.map
