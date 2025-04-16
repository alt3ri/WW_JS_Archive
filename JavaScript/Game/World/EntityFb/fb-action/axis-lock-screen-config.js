"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AxisLockScreenConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AxisLockScreenConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsAxisLockScreenConfig(e, i) {
    return (i || new AxisLockScreenConfig()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsAxisLockScreenConfig(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new AxisLockScreenConfig()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  triggerAngle() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  fadeInTime() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  fadeOutTime() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  static startAxisLockScreenConfig(e) {
    e.startObject(3);
  }
  static addTriggerAngle(e, i) {
    e.addFieldFloat32(0, i, 0);
  }
  static addFadeInTime(e, i) {
    e.addFieldFloat32(1, i, 0);
  }
  static addFadeOutTime(e, i) {
    e.addFieldFloat32(2, i, 0);
  }
  static endAxisLockScreenConfig(e) {
    return e.endObject();
  }
  static createAxisLockScreenConfig(e, i, t, s) {
    return (
      AxisLockScreenConfig.startAxisLockScreenConfig(e),
      AxisLockScreenConfig.addTriggerAngle(e, i),
      AxisLockScreenConfig.addFadeInTime(e, t),
      AxisLockScreenConfig.addFadeOutTime(e, s),
      AxisLockScreenConfig.endAxisLockScreenConfig(e)
    );
  }
}
exports.AxisLockScreenConfig = AxisLockScreenConfig;
//# sourceMappingURL=axis-lock-screen-config.js.map
