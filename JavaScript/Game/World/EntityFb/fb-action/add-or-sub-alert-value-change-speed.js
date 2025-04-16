"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddOrSubAlertValueChangeSpeed = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AddOrSubAlertValueChangeSpeed {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsAddOrSubAlertValueChangeSpeed(e, t) {
    return (t || new AddOrSubAlertValueChangeSpeed()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsAddOrSubAlertValueChangeSpeed(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new AddOrSubAlertValueChangeSpeed()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  deltaValue() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  static startAddOrSubAlertValueChangeSpeed(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addDeltaValue(e, t) {
    e.addFieldFloat32(1, t, 0);
  }
  static endAddOrSubAlertValueChangeSpeed(e) {
    return e.endObject();
  }
  static createAddOrSubAlertValueChangeSpeed(e, t, r) {
    return (
      AddOrSubAlertValueChangeSpeed.startAddOrSubAlertValueChangeSpeed(e),
      AddOrSubAlertValueChangeSpeed.addType(e, t),
      AddOrSubAlertValueChangeSpeed.addDeltaValue(e, r),
      AddOrSubAlertValueChangeSpeed.endAddOrSubAlertValueChangeSpeed(e)
    );
  }
}
exports.AddOrSubAlertValueChangeSpeed = AddOrSubAlertValueChangeSpeed;
//# sourceMappingURL=add-or-sub-alert-value-change-speed.js.map
