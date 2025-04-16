"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAISplinePoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class LevelAISplinePoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsLevelAISplinePoint(t, i) {
    return (i || new LevelAISplinePoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLevelAISplinePoint(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new LevelAISplinePoint()).__init(
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
  actions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 20);
    return e
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startLevelAISplinePoint(t) {
    t.startObject(9);
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
  static addActions(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static createActionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endLevelAISplinePoint(t) {
    return t.endObject();
  }
}
exports.LevelAISplinePoint = LevelAISplinePoint;
//# sourceMappingURL=level-aispline-point.js.map
