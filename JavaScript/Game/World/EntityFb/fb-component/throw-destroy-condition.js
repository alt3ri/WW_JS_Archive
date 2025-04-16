"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ThrowDestroyCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ThrowDestroyCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsThrowDestroyCondition(t, o) {
    return (o || new ThrowDestroyCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsThrowDestroyCondition(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new ThrowDestroyCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startThrowDestroyCondition(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addDelayTime(t, o) {
    t.addFieldFloat32(1, o, 0);
  }
  static endThrowDestroyCondition(t) {
    return t.endObject();
  }
  static createThrowDestroyCondition(t, o, i) {
    return (
      ThrowDestroyCondition.startThrowDestroyCondition(t),
      ThrowDestroyCondition.addType(t, o),
      ThrowDestroyCondition.addDelayTime(t, i),
      ThrowDestroyCondition.endThrowDestroyCondition(t)
    );
  }
}
exports.ThrowDestroyCondition = ThrowDestroyCondition;
//# sourceMappingURL=throw-destroy-condition.js.map
