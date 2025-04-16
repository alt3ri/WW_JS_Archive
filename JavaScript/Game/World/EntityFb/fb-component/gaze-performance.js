"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GazePerformance = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GazePerformance {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsGazePerformance(e, t) {
    return (t || new GazePerformance()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsGazePerformance(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new GazePerformance()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  fadeInTime() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  stayTime() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  fadeOutTime() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  lockCamera() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startGazePerformance(e) {
    e.startObject(4);
  }
  static addFadeInTime(e, t) {
    e.addFieldFloat32(0, t, 0);
  }
  static addStayTime(e, t) {
    e.addFieldFloat32(1, t, 0);
  }
  static addFadeOutTime(e, t) {
    e.addFieldFloat32(2, t, 0);
  }
  static addLockCamera(e, t) {
    e.addFieldInt8(3, +t, 0);
  }
  static endGazePerformance(e) {
    return e.endObject();
  }
  static createGazePerformance(e, t, r, a, s) {
    return (
      GazePerformance.startGazePerformance(e),
      GazePerformance.addFadeInTime(e, t),
      GazePerformance.addStayTime(e, r),
      GazePerformance.addFadeOutTime(e, a),
      GazePerformance.addLockCamera(e, s),
      GazePerformance.endGazePerformance(e)
    );
  }
}
exports.GazePerformance = GazePerformance;
//# sourceMappingURL=gaze-performance.js.map
