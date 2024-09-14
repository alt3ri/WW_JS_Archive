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
    (this.uMo = t.Lxs), (this.x5e = new Map()), this.UpdateShopItemList(t.eGs);
  }
  get UpdateTime() {
    return this.uMo;
  }
  UpdateRefreshTime(t) {
    this.uMo = t;
  }
  UpdateShopItemList(t) {
    this.x5e.clear();
    for (const e of t) this.x5e.set(e.s5n, e);
  }
  GetItemInfo(t) {
    return this.x5e.get(t);
  }
  GetItemList() {
    return this.x5e;
  }
}
exports.Shop = Shop;
//# sourceMappingURL=ShopDefine.js.map
