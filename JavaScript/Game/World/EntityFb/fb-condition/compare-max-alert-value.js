"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareMaxAlertValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareMaxAlertValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCompareMaxAlertValue(e, t) {
    return (t || new CompareMaxAlertValue()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCompareMaxAlertValue(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CompareMaxAlertValue()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  static startCompareMaxAlertValue(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static endCompareMaxAlertValue(e) {
    return e.endObject();
  }
  static createCompareMaxAlertValue(e, t) {
    return (
      CompareMaxAlertValue.startCompareMaxAlertValue(e),
      CompareMaxAlertValue.addType(e, t),
      CompareMaxAlertValue.endCompareMaxAlertValue(e)
    );
  }
}
exports.CompareMaxAlertValue = CompareMaxAlertValue;
//# sourceMappingURL=compare-max-alert-value.js.map
