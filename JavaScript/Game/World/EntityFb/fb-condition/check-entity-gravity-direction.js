"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckEntityGravityDirection = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_gravity_direction_js_1 = require("../fb-common/union-gravity-direction.js"),
  union_check_target_js_1 = require("../fb-condition/union-check-target.js");
class CheckEntityGravityDirection {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCheckEntityGravityDirection(t, i) {
    return (i || new CheckEntityGravityDirection()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckEntityGravityDirection(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CheckEntityGravityDirection()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  targetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_check_target_js_1.UnionCheckTarget.NONE;
  }
  target(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  gravityDirectionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_gravity_direction_js_1.UnionGravityDirection.NONE;
  }
  gravityDirection(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startCheckEntityGravityDirection(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTargetType(t, i) {
    t.addFieldInt8(1, i, union_check_target_js_1.UnionCheckTarget.NONE);
  }
  static addTarget(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addGravityDirectionType(t, i) {
    t.addFieldInt8(
      3,
      i,
      union_gravity_direction_js_1.UnionGravityDirection.NONE,
    );
  }
  static addGravityDirection(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endCheckEntityGravityDirection(t) {
    return t.endObject();
  }
  static createCheckEntityGravityDirection(t, i, r, e, n, c) {
    return (
      CheckEntityGravityDirection.startCheckEntityGravityDirection(t),
      CheckEntityGravityDirection.addType(t, i),
      CheckEntityGravityDirection.addTargetType(t, r),
      CheckEntityGravityDirection.addTarget(t, e),
      CheckEntityGravityDirection.addGravityDirectionType(t, n),
      CheckEntityGravityDirection.addGravityDirection(t, c),
      CheckEntityGravityDirection.endCheckEntityGravityDirection(t)
    );
  }
}
exports.CheckEntityGravityDirection = CheckEntityGravityDirection;
//# sourceMappingURL=check-entity-gravity-direction.js.map
