"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSplineMove = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_spline_move_pattern_js_1 = require("../fb-action/union-spline-move-pattern.js"),
  union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class OpenSplineMove {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsOpenSplineMove(t, e) {
    return (e || new OpenSplineMove()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOpenSplineMove(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new OpenSplineMove()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  targetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_entity_js_1.UnionTargetEntity.NONE;
  }
  target(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  patternType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_spline_move_pattern_js_1.UnionSplineMovePattern.NONE;
  }
  pattern(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startOpenSplineMove(t) {
    t.startObject(6);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetType(t, e) {
    t.addFieldInt8(1, e, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTarget(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addSplineEntityId(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addPatternType(t, e) {
    t.addFieldInt8(
      4,
      e,
      union_spline_move_pattern_js_1.UnionSplineMovePattern.NONE,
    );
  }
  static addPattern(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static endOpenSplineMove(t) {
    return t.endObject();
  }
  static createOpenSplineMove(t, e, i, n, s, r, p) {
    return (
      OpenSplineMove.startOpenSplineMove(t),
      OpenSplineMove.addType(t, e),
      OpenSplineMove.addTargetType(t, i),
      OpenSplineMove.addTarget(t, n),
      OpenSplineMove.addSplineEntityId(t, s),
      OpenSplineMove.addPatternType(t, r),
      OpenSplineMove.addPattern(t, p),
      OpenSplineMove.endOpenSplineMove(t)
    );
  }
}
exports.OpenSplineMove = OpenSplineMove;
//# sourceMappingURL=open-spline-move.js.map
