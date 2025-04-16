"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PatrolSpline = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  patrol_range_js_1 = require("../fb-component/patrol-range.js"),
  patrol_spline_point_js_1 = require("../fb-component/patrol-spline-point.js"),
  union_patrol_cycle_option_js_1 = require("../fb-component/union-patrol-cycle-option.js");
class PatrolSpline {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsPatrolSpline(t, i) {
    return (i || new PatrolSpline()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPatrolSpline(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new PatrolSpline()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  cycleOptionType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_patrol_cycle_option_js_1.UnionPatrolCycleOption.NONE;
  }
  cycleOption(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  isNavigation() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  turnSpeed() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  isFloating() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  points(t, i) {
    var s = this.bb.__offset(this.bb_pos, 16);
    return s
      ? (i || new patrol_spline_point_js_1.PatrolSplinePoint()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  pointsLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  patrolRange(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i
      ? (t || new patrol_range_js_1.PatrolRange()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startPatrolSpline(t) {
    t.startObject(8);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCycleOptionType(t, i) {
    t.addFieldInt8(
      1,
      i,
      union_patrol_cycle_option_js_1.UnionPatrolCycleOption.NONE,
    );
  }
  static addCycleOption(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addIsNavigation(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static addTurnSpeed(t, i) {
    t.addFieldFloat32(4, i, 0);
  }
  static addIsFloating(t, i) {
    t.addFieldInt8(5, +i, 0);
  }
  static addPoints(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static createPointsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startPointsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addPatrolRange(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static endPatrolSpline(t) {
    return t.endObject();
  }
}
exports.PatrolSpline = PatrolSpline;
//# sourceMappingURL=patrol-spline.js.map
