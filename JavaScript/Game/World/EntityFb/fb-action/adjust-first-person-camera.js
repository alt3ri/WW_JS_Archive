"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdjustFirstPersonCamera = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  base_curve_js_1 = require("../fb-action/base-curve.js"),
  union_gravity_direction_js_1 = require("../fb-common/union-gravity-direction.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class AdjustFirstPersonCamera {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsAdjustFirstPersonCamera(t, i) {
    return (i || new AdjustFirstPersonCamera()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAdjustFirstPersonCamera(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new AdjustFirstPersonCamera()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  priority() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  fadeInTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  fadeInCurve(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new base_curve_js_1.BaseCurve()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  fadeOutTime() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  fadeOutCurve(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i
      ? (t || new base_curve_js_1.BaseCurve()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  armLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  minumArmLength() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  maxiumArmLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  offset(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  armOffset(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  fov() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  isDisableResetFocus() {
    var t = this.bb.__offset(this.bb_pos, 28);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  gravityDirectionType() {
    var t = this.bb.__offset(this.bb_pos, 30);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_gravity_direction_js_1.UnionGravityDirection.NONE;
  }
  gravityDirection(t) {
    var i = this.bb.__offset(this.bb_pos, 32);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startAdjustFirstPersonCamera(t) {
    t.startObject(15);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPriority(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addFadeInTime(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static addFadeInCurve(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addFadeOutTime(t, i) {
    t.addFieldFloat32(4, i, 0);
  }
  static addFadeOutCurve(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addArmLength(t, i) {
    t.addFieldFloat32(6, i, 0);
  }
  static addMinumArmLength(t, i) {
    t.addFieldFloat32(7, i, 0);
  }
  static addMaxiumArmLength(t, i) {
    t.addFieldFloat32(8, i, 0);
  }
  static addOffset(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addArmOffset(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static addFov(t, i) {
    t.addFieldFloat32(11, i, 0);
  }
  static addIsDisableResetFocus(t, i) {
    t.addFieldInt8(12, +i, 0);
  }
  static addGravityDirectionType(t, i) {
    t.addFieldInt8(
      13,
      i,
      union_gravity_direction_js_1.UnionGravityDirection.NONE,
    );
  }
  static addGravityDirection(t, i) {
    t.addFieldOffset(14, i, 0);
  }
  static endAdjustFirstPersonCamera(t) {
    return t.endObject();
  }
}
exports.AdjustFirstPersonCamera = AdjustFirstPersonCamera;
//# sourceMappingURL=adjust-first-person-camera.js.map
