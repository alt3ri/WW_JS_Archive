"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhysicsAngularLimit = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_angular_constraint_motion_js_1 = require("../fb-physics/union-angular-constraint-motion.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class PhysicsAngularLimit {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsPhysicsAngularLimit(t, i) {
    return (i || new PhysicsAngularLimit()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPhysicsAngularLimit(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new PhysicsAngularLimit()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  swing1MotionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_angular_constraint_motion_js_1.UnionAngularConstraintMotion.NONE;
  }
  swing1Motion(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  swing2MotionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_angular_constraint_motion_js_1.UnionAngularConstraintMotion.NONE;
  }
  swing2Motion(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  twistMotionType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_angular_constraint_motion_js_1.UnionAngularConstraintMotion.NONE;
  }
  twistMotion(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  angularRotationOffset(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startPhysicsAngularLimit(t) {
    t.startObject(7);
  }
  static addSwing1MotionType(t, i) {
    t.addFieldInt8(
      0,
      i,
      union_angular_constraint_motion_js_1.UnionAngularConstraintMotion.NONE,
    );
  }
  static addSwing1Motion(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addSwing2MotionType(t, i) {
    t.addFieldInt8(
      2,
      i,
      union_angular_constraint_motion_js_1.UnionAngularConstraintMotion.NONE,
    );
  }
  static addSwing2Motion(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addTwistMotionType(t, i) {
    t.addFieldInt8(
      4,
      i,
      union_angular_constraint_motion_js_1.UnionAngularConstraintMotion.NONE,
    );
  }
  static addTwistMotion(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addAngularRotationOffset(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static endPhysicsAngularLimit(t) {
    return t.endObject();
  }
}
exports.PhysicsAngularLimit = PhysicsAngularLimit;
//# sourceMappingURL=physics-angular-limit.js.map
