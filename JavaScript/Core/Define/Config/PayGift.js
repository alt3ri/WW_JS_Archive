"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayGift = void 0);
class PayGift {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ItemId() {
    return this.itemid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsPayGift(t, i) {
    return (i || new PayGift()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.PayGift = PayGift;
//# sourceMappingURL=PayGift.js.map
