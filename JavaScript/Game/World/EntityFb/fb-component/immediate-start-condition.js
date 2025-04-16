"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ImmediateStartCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ImmediateStartCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsImmediateStartCondition(t, i) {
    return (i || new ImmediateStartCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsImmediateStartCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ImmediateStartCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startImmediateStartCondition(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static endImmediateStartCondition(t) {
    return t.endObject();
  }
  static createImmediateStartCondition(t, i) {
    return (
      ImmediateStartCondition.startImmediateStartCondition(t),
      ImmediateStartCondition.addType(t, i),
      ImmediateStartCondition.endImmediateStartCondition(t)
    );
  }
}
exports.ImmediateStartCondition = ImmediateStartCondition;
//# sourceMappingURL=immediate-start-condition.js.map
