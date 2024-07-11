"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopGoods = void 0);
class PayShopGoods {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ShopId() {
    return this.shopid();
  }
  get TabId() {
    return this.tabid();
  }
  get ItemId() {
    return this.itemid();
  }
  get Sort() {
    return this.sort();
  }
  get ItemCount() {
    return this.itemcount();
  }
  get ConditionId() {
    return this.conditionid();
  }
  get BuyConditionId() {
    return this.buyconditionid();
  }
  get BuyLimit() {
    return this.buylimit();
  }
  get SellTimeText() {
    return this.selltimetext();
  }
  get MoneyId() {
    return this.moneyid();
  }
  get Price() {
    return this.price();
  }
  get PromotionPrice() {
    return this.promotionprice();
  }
  get PromotionShow() {
    return this.promotionshow();
  }
  get PromotionTimeText() {
    return this.promotiontimetext();
  }
  get Banner() {
    return this.banner();
  }
  get Enable() {
    return this.enable();
  }
  get Show() {
    return this.show();
  }
  get Tag() {
    return this.tag();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsPayShopGoods(t, i) {
    return (i || new PayShopGoods()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  shopid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tabid() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  itemid() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sort() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 10;
  }
  itemcount() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  conditionid() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  buyconditionid() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  buylimit() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  selltimetext(t) {
    const i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  moneyid() {
    const t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  price() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  promotionprice() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  promotionshow() {
    const t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  promotiontimetext(t) {
    const i = this.J7.__offset(this.z7, 32);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  banner(t) {
    const i = this.J7.__offset(this.z7, 34);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  enable() {
    const t = this.J7.__offset(this.z7, 36);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  show() {
    const t = this.J7.__offset(this.z7, 38);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  tag() {
    const t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.PayShopGoods = PayShopGoods;
// # sourceMappingURL=PayShopGoods.js.map
