"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddOrSubAlertValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AddOrSubAlertValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsAddOrSubAlertValue(t, e) {
    return (e || new AddOrSubAlertValue()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAddOrSubAlertValue(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new AddOrSubAlertValue()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  deltaValue() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startAddOrSubAlertValue(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addDeltaValue(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static endAddOrSubAlertValue(t) {
    return t.endObject();
  }
  static createAddOrSubAlertValue(t, e, r) {
    return (
      AddOrSubAlertValue.startAddOrSubAlertValue(t),
      AddOrSubAlertValue.addType(t, e),
      AddOrSubAlertValue.addDeltaValue(t, r),
      AddOrSubAlertValue.endAddOrSubAlertValue(t)
    );
  }
}
exports.AddOrSubAlertValue = AddOrSubAlertValue;
//# sourceMappingURL=add-or-sub-alert-value.js.map
