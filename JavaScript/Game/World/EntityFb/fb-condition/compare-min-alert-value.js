"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareMinAlertValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareMinAlertValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCompareMinAlertValue(e, t) {
    return (t || new CompareMinAlertValue()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCompareMinAlertValue(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CompareMinAlertValue()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  static startCompareMinAlertValue(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static endCompareMinAlertValue(e) {
    return e.endObject();
  }
  static createCompareMinAlertValue(e, t) {
    return (
      CompareMinAlertValue.startCompareMinAlertValue(e),
      CompareMinAlertValue.addType(e, t),
      CompareMinAlertValue.endCompareMinAlertValue(e)
    );
  }
}
exports.CompareMinAlertValue = CompareMinAlertValue;
//# sourceMappingURL=compare-min-alert-value.js.map
