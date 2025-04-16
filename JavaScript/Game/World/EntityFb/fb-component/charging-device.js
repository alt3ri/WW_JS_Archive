"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChargingDevice = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChargingDevice {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChargingDevice(t, e) {
    return (e || new ChargingDevice()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChargingDevice(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChargingDevice()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  maxValue() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  initValue() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  progressPerformanceAttribute() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  increaseSpeed() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  hitExtraValue() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startChargingDevice(t) {
    t.startObject(6);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMaxValue(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addInitValue(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addProgressPerformanceAttribute(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addIncreaseSpeed(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addHitExtraValue(t, e) {
    t.addFieldInt32(5, e, 0);
  }
  static endChargingDevice(t) {
    return t.endObject();
  }
  static createChargingDevice(t, e, i, r, s, a, h) {
    return (
      ChargingDevice.startChargingDevice(t),
      ChargingDevice.addType(t, e),
      ChargingDevice.addMaxValue(t, i),
      ChargingDevice.addInitValue(t, r),
      ChargingDevice.addProgressPerformanceAttribute(t, s),
      ChargingDevice.addIncreaseSpeed(t, a),
      ChargingDevice.addHitExtraValue(t, h),
      ChargingDevice.endChargingDevice(t)
    );
  }
}
exports.ChargingDevice = ChargingDevice;
//# sourceMappingURL=charging-device.js.map
