"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SplineMove = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_state_condition_js_1 = require("../fb-condition/entity-state-condition.js");
class SplineMove {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsSplineMove(t, i) {
    return (i || new SplineMove()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSplineMove(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SplineMove()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  stateConditions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (i || new entity_state_condition_js_1.EntityStateCondition()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  stateConditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  speed() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isCircle() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isLookDir() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSplineMove(t) {
    t.startObject(5);
  }
  static addStateConditions(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static createStateConditionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startStateConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addSpeed(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addSplineEntityId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addIsCircle(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static addIsLookDir(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static endSplineMove(t) {
    return t.endObject();
  }
  static createSplineMove(t, i, e, s, n, r) {
    return (
      SplineMove.startSplineMove(t),
      SplineMove.addStateConditions(t, i),
      SplineMove.addSpeed(t, e),
      SplineMove.addSplineEntityId(t, s),
      SplineMove.addIsCircle(t, n),
      SplineMove.addIsLookDir(t, r),
      SplineMove.endSplineMove(t)
    );
  }
}
exports.SplineMove = SplineMove;
//# sourceMappingURL=spline-move.js.map
