"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnMatchingCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OnMatchingCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsOnMatchingCondition(t, i) {
    return (i || new OnMatchingCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOnMatchingCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new OnMatchingCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  bulletId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  static startOnMatchingCondition(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBulletId(t, i) {
    t.addFieldInt64(1, i, BigInt("0"));
  }
  static endOnMatchingCondition(t) {
    return t.endObject();
  }
  static createOnMatchingCondition(t, i, n) {
    return (
      OnMatchingCondition.startOnMatchingCondition(t),
      OnMatchingCondition.addType(t, i),
      OnMatchingCondition.addBulletId(t, n),
      OnMatchingCondition.endOnMatchingCondition(t)
    );
  }
}
exports.OnMatchingCondition = OnMatchingCondition;
//# sourceMappingURL=on-matching-condition.js.map
