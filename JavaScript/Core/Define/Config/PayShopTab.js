"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopTab = void 0);
class PayShopTab {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get ShopId() {
    return this.shopid();
  }
  get TabId() {
    return this.tabid();
  }
  get Sort() {
    return this.sort();
  }
  get Name() {
    return this.name();
  }
  get Logic() {
    return this.logic();
  }
  get Enable() {
    return this.enable();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsPayShopTab(t, s) {
    return (s || new PayShopTab()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  shopid() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tabid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sort() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    const s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  logic() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  enable() {
    const t = this.J7.__offset(this.z7, 14);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.PayShopTab = PayShopTab;
// # sourceMappingURL=PayShopTab.js.map
