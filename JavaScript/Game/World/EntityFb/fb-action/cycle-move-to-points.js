"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CycleMoveToPoints = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_move_to_point_type_js_1 = require("../fb-action/union-move-to-point-type.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class CycleMoveToPoints {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsCycleMoveToPoints(t, o) {
    return (o || new CycleMoveToPoints()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCycleMoveToPoints(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new CycleMoveToPoints()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  points(t, o) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (o || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  pointsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  isLoop() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  stopTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  moveMotionType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_move_to_point_type_js_1.UnionMoveToPointType.NONE;
  }
  moveMotion(t) {
    var o = this.bb.__offset(this.bb_pos, 14);
    return o ? this.bb.__union(t, this.bb_pos + o) : void 0;
  }
  static startCycleMoveToPoints(t) {
    t.startObject(6);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addPoints(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static createPointsVector(o, e) {
    o.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) o.addOffset(e[t]);
    return o.endVector();
  }
  static startPointsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addIsLoop(t, o) {
    t.addFieldInt8(2, +o, 0);
  }
  static addStopTime(t, o) {
    t.addFieldFloat32(3, o, 0);
  }
  static addMoveMotionType(t, o) {
    t.addFieldInt8(
      4,
      o,
      union_move_to_point_type_js_1.UnionMoveToPointType.NONE,
    );
  }
  static addMoveMotion(t, o) {
    t.addFieldOffset(5, o, 0);
  }
  static endCycleMoveToPoints(t) {
    return t.endObject();
  }
  static createCycleMoveToPoints(t, o, e, i, s, n, r) {
    return (
      CycleMoveToPoints.startCycleMoveToPoints(t),
      CycleMoveToPoints.addType(t, o),
      CycleMoveToPoints.addPoints(t, e),
      CycleMoveToPoints.addIsLoop(t, i),
      CycleMoveToPoints.addStopTime(t, s),
      CycleMoveToPoints.addMoveMotionType(t, n),
      CycleMoveToPoints.addMoveMotion(t, r),
      CycleMoveToPoints.endCycleMoveToPoints(t)
    );
  }
}
exports.CycleMoveToPoints = CycleMoveToPoints;
//# sourceMappingURL=cycle-move-to-points.js.map
