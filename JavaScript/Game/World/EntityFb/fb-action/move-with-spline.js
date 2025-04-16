"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoveWithSpline = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  check_climb_js_1 = require("../fb-action/check-climb.js"),
  npc_follow_config_js_1 = require("../fb-action/npc-follow-config.js"),
  union_spline_move_target_js_1 = require("../fb-action/union-spline-move-target.js");
class MoveWithSpline {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsMoveWithSpline(t, i) {
    return (i || new MoveWithSpline()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMoveWithSpline(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new MoveWithSpline()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  moveTargetType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_spline_move_target_js_1.UnionSplineMoveTarget.NONE;
  }
  moveTarget(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  checkClimb(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new check_climb_js_1.CheckClimb()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  moveState() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  startPointIndex() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  endPointIndex() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isFollowStrictly() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isForceToFirstPoint() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isLookDir() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  npcFollow(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    return i
      ? (t || new npc_follow_config_js_1.NpcFollowConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  npcCollisionEnabled() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startMoveWithSpline(t) {
    t.startObject(12);
  }
  static addMoveTargetType(t, i) {
    t.addFieldInt8(
      0,
      i,
      union_spline_move_target_js_1.UnionSplineMoveTarget.NONE,
    );
  }
  static addMoveTarget(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addSplineEntityId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addCheckClimb(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addMoveState(t, i) {
    t.addFieldInt8(4, i, 0);
  }
  static addStartPointIndex(t, i) {
    t.addFieldInt32(5, i, 0);
  }
  static addEndPointIndex(t, i) {
    t.addFieldInt32(6, i, 0);
  }
  static addIsFollowStrictly(t, i) {
    t.addFieldInt8(7, +i, 0);
  }
  static addIsForceToFirstPoint(t, i) {
    t.addFieldInt8(8, +i, 0);
  }
  static addIsLookDir(t, i) {
    t.addFieldInt8(9, +i, 0);
  }
  static addNpcFollow(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static addNpcCollisionEnabled(t, i) {
    t.addFieldInt8(11, +i, 0);
  }
  static endMoveWithSpline(t) {
    return t.endObject();
  }
}
exports.MoveWithSpline = MoveWithSpline;
//# sourceMappingURL=move-with-spline.js.map
