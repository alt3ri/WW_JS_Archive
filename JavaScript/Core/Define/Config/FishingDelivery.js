"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingDelivery = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class FishingDelivery {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get NeedItems() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.needitemsLength(),
      this.needitemsKey,
      this.needitemsValue,
      this,
    );
  }
  needitemsKey(t) {
    return this.needitems(t)?.key();
  }
  needitemsValue(t) {
    return this.needitems(t)?.value();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsFishingDelivery(t, e) {
    return (e || new FishingDelivery()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetNeeditemsAt(t, e) {
    return this.needitems(t);
  }
  needitems(t, e) {
    var i = this.J7.__offset(this.z7, 6);
    return i
      ? (e || new DicIntIntArray_1.DicIntIntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  needitemsLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.FishingDelivery = FishingDelivery;
//# sourceMappingURL=FishingDelivery.js.map
