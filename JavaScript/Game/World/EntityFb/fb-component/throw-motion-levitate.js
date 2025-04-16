"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ThrowMotionLevitate = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  render_trajectory_config_js_1 = require("../fb-component/render-trajectory-config.js");
class ThrowMotionLevitate {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsThrowMotionLevitate(t, i) {
    return (i || new ThrowMotionLevitate()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsThrowMotionLevitate(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ThrowMotionLevitate()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  velocity() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  velocityCurve(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  moveTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  rayRadius() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  renderTrajectoryConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i
      ? (
          t || new render_trajectory_config_js_1.RenderTrajectoryConfig()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  static startThrowMotionLevitate(t) {
    t.startObject(6);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addVelocity(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addVelocityCurve(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addMoveTime(t, i) {
    t.addFieldFloat32(3, i, 0);
  }
  static addRayRadius(t, i) {
    t.addFieldFloat32(4, i, 0);
  }
  static addRenderTrajectoryConfig(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static endThrowMotionLevitate(t) {
    return t.endObject();
  }
}
exports.ThrowMotionLevitate = ThrowMotionLevitate;
//# sourceMappingURL=throw-motion-levitate.js.map
