"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomAlertValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CustomAlertValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCustomAlertValue(t, e) {
    return (e || new CustomAlertValue()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCustomAlertValue(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CustomAlertValue()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  customValue() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startCustomAlertValue(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addCustomValue(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static endCustomAlertValue(t) {
    return t.endObject();
  }
  static createCustomAlertValue(t, e, s) {
    return (
      CustomAlertValue.startCustomAlertValue(t),
      CustomAlertValue.addType(t, e),
      CustomAlertValue.addCustomValue(t, s),
      CustomAlertValue.endCustomAlertValue(t)
    );
  }
}
exports.CustomAlertValue = CustomAlertValue;
//# sourceMappingURL=custom-alert-value.js.map
