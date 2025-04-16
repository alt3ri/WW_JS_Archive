"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PulseDeviceFoundation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PulseDeviceFoundation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsPulseDeviceFoundation(e, t) {
    return (t || new PulseDeviceFoundation()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsPulseDeviceFoundation(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new PulseDeviceFoundation()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startPulseDeviceFoundation(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endPulseDeviceFoundation(e) {
    return e.endObject();
  }
  static createPulseDeviceFoundation(e, t) {
    return (
      PulseDeviceFoundation.startPulseDeviceFoundation(e),
      PulseDeviceFoundation.addType(e, t),
      PulseDeviceFoundation.endPulseDeviceFoundation(e)
    );
  }
}
exports.PulseDeviceFoundation = PulseDeviceFoundation;
//# sourceMappingURL=pulse-device-foundation.js.map
