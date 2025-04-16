"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpeedCurveMotion = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SpeedCurveMotion {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSpeedCurveMotion(e, t) {
    return (t || new SpeedCurveMotion()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSpeedCurveMotion(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SpeedCurveMotion()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  speedCurve(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startSpeedCurveMotion(e) {
    e.startObject(1);
  }
  static addSpeedCurve(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endSpeedCurveMotion(e) {
    return e.endObject();
  }
  static createSpeedCurveMotion(e, t) {
    return (
      SpeedCurveMotion.startSpeedCurveMotion(e),
      SpeedCurveMotion.addSpeedCurve(e, t),
      SpeedCurveMotion.endSpeedCurveMotion(e)
    );
  }
}
exports.SpeedCurveMotion = SpeedCurveMotion;
//# sourceMappingURL=speed-curve-motion.js.map
