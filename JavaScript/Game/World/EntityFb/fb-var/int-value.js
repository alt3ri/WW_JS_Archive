"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.IntValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class IntValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsIntValue(t, e) {
    return (e || new IntValue()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsIntValue(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new IntValue()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  v() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startIntValue(t) {
    t.startObject(1);
  }
  static addV(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endIntValue(t) {
    return t.endObject();
  }
  static createIntValue(t, e) {
    return (
      IntValue.startIntValue(t), IntValue.addV(t, e), IntValue.endIntValue(t)
    );
  }
}
exports.IntValue = IntValue;
//# sourceMappingURL=int-value.js.map
