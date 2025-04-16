"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhysicsConstraintComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_physics_attach_target_js_1 = require("../fb-component/union-physics-attach-target.js"),
  physics_angular_limit_js_1 = require("../fb-physics/physics-angular-limit.js");
class PhysicsConstraintComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsPhysicsConstraintComponent(t, s) {
    return (s || new PhysicsConstraintComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPhysicsConstraintComponent(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new PhysicsConstraintComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  effectPath(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  attachTargetType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_physics_attach_target_js_1.UnionPhysicsAttachTarget.NONE;
  }
  attachTarget(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s ? this.bb.__union(t, this.bb_pos + s) : void 0;
  }
  angularLimit(t) {
    var s = this.bb.__offset(this.bb_pos, 12);
    return s
      ? (t || new physics_angular_limit_js_1.PhysicsAngularLimit()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  dampingCoefficient() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startPhysicsConstraintComponent(t) {
    t.startObject(6);
  }
  static addDisabled(t, s) {
    t.addFieldInt8(0, +s, 0);
  }
  static addEffectPath(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addAttachTargetType(t, s) {
    t.addFieldInt8(
      2,
      s,
      union_physics_attach_target_js_1.UnionPhysicsAttachTarget.NONE,
    );
  }
  static addAttachTarget(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static addAngularLimit(t, s) {
    t.addFieldOffset(4, s, 0);
  }
  static addDampingCoefficient(t, s) {
    t.addFieldFloat32(5, s, 0);
  }
  static endPhysicsConstraintComponent(t) {
    return t.endObject();
  }
}
exports.PhysicsConstraintComponent = PhysicsConstraintComponent;
//# sourceMappingURL=physics-constraint-component.js.map
