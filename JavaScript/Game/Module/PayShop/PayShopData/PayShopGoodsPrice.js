"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopGoodsPrice = void 0);
const PayShopDefine_1 = require("../PayShopDefine");
class PayShopGoodsPrice {
  constructor() {
    (this.Id = 0), (this.Count = 0), (this.PromotionCount = 0);
  }
  Phrase(s) {
    (this.Id = s.J4n ?? 0),
      (this.Count = s.o9n ?? 0),
      (this.PromotionCount = s.uBs ?? 0);
  }
  GetDiscount() {
    return Math.ceil(
      ((this.Count - this.PromotionCount) * PayShopDefine_1.DISCOUNT_PERCENT) /
        this.Count,
    );
  }
}
exports.PayShopGoodsPrice = PayShopGoodsPrice;
//# sourceMappingURL=PayShopGoodsPrice.js.map
