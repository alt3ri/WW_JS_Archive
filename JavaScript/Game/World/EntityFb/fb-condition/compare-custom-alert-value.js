"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareCustomAlertValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareCustomAlertValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCompareCustomAlertValue(t, e) {
    return (e || new CompareCustomAlertValue()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCompareCustomAlertValue(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CompareCustomAlertValue()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  compareValue() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startCompareCustomAlertValue(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addCompareValue(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static endCompareCustomAlertValue(t) {
    return t.endObject();
  }
  static createCompareCustomAlertValue(t, e, r) {
    return (
      CompareCustomAlertValue.startCompareCustomAlertValue(t),
      CompareCustomAlertValue.addType(t, e),
      CompareCustomAlertValue.addCompareValue(t, r),
      CompareCustomAlertValue.endCompareCustomAlertValue(t)
    );
  }
}
exports.CompareCustomAlertValue = CompareCustomAlertValue;
//# sourceMappingURL=compare-custom-alert-value.js.map
