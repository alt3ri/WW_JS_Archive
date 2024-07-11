"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShop = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PayShop {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ShopTabViewType() {
    return this.shoptabviewtype();
  }
  get DynamicTabId() {
    return this.dynamictabid();
  }
  get Sort() {
    return this.sort();
  }
  get Name() {
    return this.name();
  }
  get Money() {
    return GameUtils_1.GameUtils.ConvertToArray(this.moneyLength(), (t) =>
      this.money(t),
    );
  }
  get Notice() {
    return this.notice();
  }
  get Enable() {
    return this.enable();
  }
  get Icon() {
    return this.icon();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsPayShop(t, i) {
    return (i || new PayShop()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  shoptabviewtype() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dynamictabid() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sort() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    const i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetMoneyAt(t) {
    return this.money(t);
  }
  money(t) {
    const i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  moneyLength() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  moneyArray() {
    const t = this.J7.__offset(this.z7, 14);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  notice(t) {
    const i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  enable() {
    const t = this.J7.__offset(this.z7, 18);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  icon(t) {
    const i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
}
exports.PayShop = PayShop;
// # sourceMappingURL=PayShop.js.map
