"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ProjectileMotion = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  speed_curve_motion_js_1 = require("../fb-component/speed-curve-motion.js");
class ProjectileMotion {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsProjectileMotion(t, e) {
    return (e || new ProjectileMotion()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsProjectileMotion(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ProjectileMotion()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  velocity() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  angularVelocity() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  cameraShake(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  matchSpeedCurve(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e
      ? (t || new speed_curve_motion_js_1.SpeedCurveMotion()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startProjectileMotion(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addVelocity(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static addAngularVelocity(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static addCameraShake(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addMatchSpeedCurve(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endProjectileMotion(t) {
    return t.endObject();
  }
}
exports.ProjectileMotion = ProjectileMotion;
//# sourceMappingURL=projectile-motion.js.map
