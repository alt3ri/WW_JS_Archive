"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomAlertValueChangeSpeed = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CustomAlertValueChangeSpeed {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCustomAlertValueChangeSpeed(e, t) {
    return (t || new CustomAlertValueChangeSpeed()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCustomAlertValueChangeSpeed(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CustomAlertValueChangeSpeed()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  customValue() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  static startCustomAlertValueChangeSpeed(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addCustomValue(e, t) {
    e.addFieldFloat32(1, t, 0);
  }
  static endCustomAlertValueChangeSpeed(e) {
    return e.endObject();
  }
  static createCustomAlertValueChangeSpeed(e, t, s) {
    return (
      CustomAlertValueChangeSpeed.startCustomAlertValueChangeSpeed(e),
      CustomAlertValueChangeSpeed.addType(e, t),
      CustomAlertValueChangeSpeed.addCustomValue(e, s),
      CustomAlertValueChangeSpeed.endCustomAlertValueChangeSpeed(e)
    );
  }
}
exports.CustomAlertValueChangeSpeed = CustomAlertValueChangeSpeed;
//# sourceMappingURL=custom-alert-value-change-speed.js.map
