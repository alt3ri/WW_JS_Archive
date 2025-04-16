"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Pay = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class Pay {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get PayId() {
    return this.payid();
  }
  get Region() {
    return this.region();
  }
  get Amount() {
    return this.amount();
  }
  get GlobalAmount() {
    return this.globalamount();
  }
  get ProductId() {
    return this.productid();
  }
  get CurrencyType() {
    return this.currencytype();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsPay(t, s) {
    return (s || new Pay()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  payid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  region(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  amount() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  globalamount() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  productid(t) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  currencytype(t) {
    var s = this.J7.__offset(this.z7, 16),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.Pay = Pay;
//# sourceMappingURL=Pay.js.map
