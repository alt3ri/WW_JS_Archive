"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewMoveWithSpline = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_new_spline_move_target_js_1 = require("../fb-action/union-new-spline-move-target.js");
class NewMoveWithSpline {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsNewMoveWithSpline(t, e) {
    return (e || new NewMoveWithSpline()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNewMoveWithSpline(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new NewMoveWithSpline()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  moveTargetType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_new_spline_move_target_js_1.UnionNewSplineMoveTarget.NONE;
  }
  moveTarget(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  startPointIndex() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  endPointIndex() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isForceToFirstPoint() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isFollowStrictly() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startNewMoveWithSpline(t) {
    t.startObject(7);
  }
  static addMoveTargetType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_new_spline_move_target_js_1.UnionNewSplineMoveTarget.NONE,
    );
  }
  static addMoveTarget(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addSplineEntityId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addStartPointIndex(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addEndPointIndex(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addIsForceToFirstPoint(t, e) {
    t.addFieldInt8(5, +e, 0);
  }
  static addIsFollowStrictly(t, e) {
    t.addFieldInt8(6, +e, 0);
  }
  static endNewMoveWithSpline(t) {
    return t.endObject();
  }
  static createNewMoveWithSpline(t, e, i, s, n, r, o, h) {
    return (
      NewMoveWithSpline.startNewMoveWithSpline(t),
      NewMoveWithSpline.addMoveTargetType(t, e),
      NewMoveWithSpline.addMoveTarget(t, i),
      NewMoveWithSpline.addSplineEntityId(t, s),
      NewMoveWithSpline.addStartPointIndex(t, n),
      NewMoveWithSpline.addEndPointIndex(t, r),
      NewMoveWithSpline.addIsForceToFirstPoint(t, o),
      NewMoveWithSpline.addIsFollowStrictly(t, h),
      NewMoveWithSpline.endNewMoveWithSpline(t)
    );
  }
}
exports.NewMoveWithSpline = NewMoveWithSpline;
//# sourceMappingURL=new-move-with-spline.js.map
