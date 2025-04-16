"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MinAlertValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MinAlertValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsMinAlertValue(t, e) {
    return (e || new MinAlertValue()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMinAlertValue(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new MinAlertValue()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startMinAlertValue(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static endMinAlertValue(t) {
    return t.endObject();
  }
  static createMinAlertValue(t, e) {
    return (
      MinAlertValue.startMinAlertValue(t),
      MinAlertValue.addType(t, e),
      MinAlertValue.endMinAlertValue(t)
    );
  }
}
exports.MinAlertValue = MinAlertValue;
//# sourceMappingURL=min-alert-value.js.map
