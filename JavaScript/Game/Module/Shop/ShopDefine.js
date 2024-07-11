"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Shop =
    exports.SECONDS_PRE_HOUR =
    exports.SECONDS_PRE_MIN =
    exports.SECONDS_PER_DAY =
      void 0),
  (exports.SECONDS_PER_DAY = 86400),
  (exports.SECONDS_PRE_MIN = 60),
  (exports.SECONDS_PRE_HOUR = 3600);
class Shop {
  constructor(t) {
    (this.dvo = t.eAs), (this.g4e = new Map()), this.UpdateShopItemList(t.Dxs);
  }
  get UpdateTime() {
    return this.dvo;
  }
  UpdateRefreshTime(t) {
    this.dvo = t;
  }
  UpdateShopItemList(t) {
    this.g4e.clear();
    for (const e of t) this.g4e.set(e.Ekn, e);
  }
  GetItemInfo(t) {
    return this.g4e.get(t);
  }
  GetItemList() {
    return this.g4e;
  }
}
exports.Shop = Shop;
//# sourceMappingURL=ShopDefine.js.map
