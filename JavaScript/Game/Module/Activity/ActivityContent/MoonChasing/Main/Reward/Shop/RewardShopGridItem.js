"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardShopGridItem = void 0);
const PayShopItemBase_1 = require("../../../../../../PayShop/PayShopTab/TabItem/PayShopItemBase"),
  GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract");
class RewardShopGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.Data = void 0), (this.g3i = void 0);
  }
  OnStart() {
    (this.g3i = new PayShopItemBase_1.PayShopItemBase(this.RootItem)),
      this.g3i.Init();
  }
  Refresh(t, e, r) {
    (this.Data = t), this.g3i.Refresh(t.ConvertToPayShopBaseSt(), e, r);
  }
}
exports.RewardShopGridItem = RewardShopGridItem;
//# sourceMappingURL=RewardShopGridItem.js.map
