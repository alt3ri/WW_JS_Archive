"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PowerTipsData = void 0);
const PayShopGoods_1 = require("../../PayShop/PayShopData/PayShopGoods"),
  PayShopGoodsData_1 = require("../../PayShop/PayShopData/PayShopGoodsData");
class PowerTipsData {
  constructor() {
    this.ItemId = 0;
  }
  ConvertToPayShopGoods() {
    var o = new PayShopGoodsData_1.PayShopGoodsData(),
      a =
        (o.PhraseFromTempData(this.ItemId, 0),
        new PayShopGoods_1.PayShopGoods(-1));
    return a.SetGoodsData(o), a;
  }
}
exports.PowerTipsData = PowerTipsData;
//# sourceMappingURL=PowerTipsData.js.map
