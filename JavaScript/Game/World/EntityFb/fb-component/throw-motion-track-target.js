"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ThrowMotionTrackTarget = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class ThrowMotionTrackTarget {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsThrowMotionTrackTarget(t, r) {
    return (r || new ThrowMotionTrackTarget()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsThrowMotionTrackTarget(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ThrowMotionTrackTarget()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  velocity() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  velocityCurve(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  velocityOffset(t) {
    var r = this.bb.__offset(this.bb_pos, 10);
    return r
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + r),
          this.bb,
        )
      : void 0;
  }
  angularVelocity() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  angularVelocityCurve(t) {
    var r = this.bb.__offset(this.bb_pos, 14);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  static startThrowMotionTrackTarget(t) {
    t.startObject(6);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addVelocity(t, r) {
    t.addFieldFloat32(1, r, 0);
  }
  static addVelocityCurve(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static addVelocityOffset(t, r) {
    t.addFieldOffset(3, r, 0);
  }
  static addAngularVelocity(t, r) {
    t.addFieldFloat32(4, r, 0);
  }
  static addAngularVelocityCurve(t, r) {
    t.addFieldOffset(5, r, 0);
  }
  static endThrowMotionTrackTarget(t) {
    return t.endObject();
  }
}
exports.ThrowMotionTrackTarget = ThrowMotionTrackTarget;
//# sourceMappingURL=throw-motion-track-target.js.map
