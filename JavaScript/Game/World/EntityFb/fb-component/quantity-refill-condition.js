"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuantityRefillCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class QuantityRefillCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsQuantityRefillCondition(t, i) {
    return (i || new QuantityRefillCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsQuantityRefillCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new QuantityRefillCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  quantity() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  delayRefill() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startQuantityRefillCondition(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addQuantity(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addDelayRefill(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static endQuantityRefillCondition(t) {
    return t.endObject();
  }
  static createQuantityRefillCondition(t, i, n, e) {
    return (
      QuantityRefillCondition.startQuantityRefillCondition(t),
      QuantityRefillCondition.addType(t, i),
      QuantityRefillCondition.addQuantity(t, n),
      QuantityRefillCondition.addDelayRefill(t, e),
      QuantityRefillCondition.endQuantityRefillCondition(t)
    );
  }
}
exports.QuantityRefillCondition = QuantityRefillCondition;
//# sourceMappingURL=quantity-refill-condition.js.map
