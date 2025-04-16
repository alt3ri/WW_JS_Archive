"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PatrolSplinePoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class PatrolSplinePoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsPatrolSplinePoint(t, i) {
    return (i || new PatrolSplinePoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPatrolSplinePoint(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new PatrolSplinePoint()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  position(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  arriveTangent(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  leaveTangent(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  lineType(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  rotation(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  moveState() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  charPositionState() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  moveSpeed() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  ignorePoint() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  stayTime() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isHide() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  actions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 26);
    return s
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startPatrolSplinePoint(t) {
    t.startObject(12);
  }
  static addPosition(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addArriveTangent(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addLeaveTangent(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addLineType(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addRotation(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addMoveState(t, i) {
    t.addFieldInt8(5, i, 0);
  }
  static addCharPositionState(t, i) {
    t.addFieldInt8(6, i, 0);
  }
  static addMoveSpeed(t, i) {
    t.addFieldInt32(7, i, 0);
  }
  static addIgnorePoint(t, i) {
    t.addFieldInt8(8, +i, 0);
  }
  static addStayTime(t, i) {
    t.addFieldInt32(9, i, 0);
  }
  static addIsHide(t, i) {
    t.addFieldInt8(10, +i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static createActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endPatrolSplinePoint(t) {
    return t.endObject();
  }
}
exports.PatrolSplinePoint = PatrolSplinePoint;
//# sourceMappingURL=patrol-spline-point.js.map
