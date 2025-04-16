"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MaxAlertValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MaxAlertValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsMaxAlertValue(t, e) {
    return (e || new MaxAlertValue()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMaxAlertValue(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new MaxAlertValue()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startMaxAlertValue(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static endMaxAlertValue(t) {
    return t.endObject();
  }
  static createMaxAlertValue(t, e) {
    return (
      MaxAlertValue.startMaxAlertValue(t),
      MaxAlertValue.addType(t, e),
      MaxAlertValue.endMaxAlertValue(t)
    );
  }
}
exports.MaxAlertValue = MaxAlertValue;
//# sourceMappingURL=max-alert-value.js.map
