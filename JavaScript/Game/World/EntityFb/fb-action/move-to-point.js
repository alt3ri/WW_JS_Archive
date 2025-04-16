"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoveToPoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_move_to_point_type_js_1 = require("../fb-action/union-move-to-point-type.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class MoveToPoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsMoveToPoint(t, i) {
    return (i || new MoveToPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMoveToPoint(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new MoveToPoint()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  point(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  moveMotionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_move_to_point_type_js_1.UnionMoveToPointType.NONE;
  }
  moveMotion(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startMoveToPoint(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPoint(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addTime(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static addMoveMotionType(t, i) {
    t.addFieldInt8(
      3,
      i,
      union_move_to_point_type_js_1.UnionMoveToPointType.NONE,
    );
  }
  static addMoveMotion(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endMoveToPoint(t) {
    return t.endObject();
  }
}
exports.MoveToPoint = MoveToPoint;
//# sourceMappingURL=move-to-point.js.map
