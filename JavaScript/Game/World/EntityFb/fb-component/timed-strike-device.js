"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimedStrikeDevice = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TimedStrikeDevice {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsTimedStrikeDevice(e, t) {
    return (t || new TimedStrikeDevice()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsTimedStrikeDevice(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new TimedStrikeDevice()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  maxValue() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  initValue() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  progressPerformanceAttribute() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  addValue() {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  timeout() {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  fallbackValue() {
    var e = this.bb.__offset(this.bb_pos, 16);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  fallbackInterval() {
    var e = this.bb.__offset(this.bb_pos, 18);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  zeroValuePerformanceAttribute() {
    var e = this.bb.__offset(this.bb_pos, 20);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  ascendPerformanceAttribute() {
    var e = this.bb.__offset(this.bb_pos, 22);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  descendPerformanceAttribute() {
    var e = this.bb.__offset(this.bb_pos, 24);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startTimedStrikeDevice(e) {
    e.startObject(11);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addMaxValue(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addInitValue(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static addProgressPerformanceAttribute(e, t) {
    e.addFieldInt32(3, t, 0);
  }
  static addAddValue(e, t) {
    e.addFieldInt32(4, t, 0);
  }
  static addTimeout(e, t) {
    e.addFieldInt32(5, t, 0);
  }
  static addFallbackValue(e, t) {
    e.addFieldInt32(6, t, 0);
  }
  static addFallbackInterval(e, t) {
    e.addFieldInt32(7, t, 0);
  }
  static addZeroValuePerformanceAttribute(e, t) {
    e.addFieldInt32(8, t, 0);
  }
  static addAscendPerformanceAttribute(e, t) {
    e.addFieldInt32(9, t, 0);
  }
  static addDescendPerformanceAttribute(e, t) {
    e.addFieldInt32(10, t, 0);
  }
  static endTimedStrikeDevice(e) {
    return e.endObject();
  }
  static createTimedStrikeDevice(e, t, i, r, s, a, c, d, h, u, n, v) {
    return (
      TimedStrikeDevice.startTimedStrikeDevice(e),
      TimedStrikeDevice.addType(e, t),
      TimedStrikeDevice.addMaxValue(e, i),
      TimedStrikeDevice.addInitValue(e, r),
      TimedStrikeDevice.addProgressPerformanceAttribute(e, s),
      TimedStrikeDevice.addAddValue(e, a),
      TimedStrikeDevice.addTimeout(e, c),
      TimedStrikeDevice.addFallbackValue(e, d),
      TimedStrikeDevice.addFallbackInterval(e, h),
      TimedStrikeDevice.addZeroValuePerformanceAttribute(e, u),
      TimedStrikeDevice.addAscendPerformanceAttribute(e, n),
      TimedStrikeDevice.addDescendPerformanceAttribute(e, v),
      TimedStrikeDevice.endTimedStrikeDevice(e)
    );
  }
}
exports.TimedStrikeDevice = TimedStrikeDevice;
//# sourceMappingURL=timed-strike-device.js.map
