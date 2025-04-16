"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoveToRelativePosition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_move_to_point_type_js_1 = require("../fb-action/union-move-to-point-type.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class MoveToRelativePosition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsMoveToRelativePosition(t, i) {
    return (i || new MoveToRelativePosition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMoveToRelativePosition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new MoveToRelativePosition()).__init(
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
  moveMotionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_move_to_point_type_js_1.UnionMoveToPointType.NONE;
  }
  moveMotion(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startMoveToRelativePosition(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPoint(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addMoveMotionType(t, i) {
    t.addFieldInt8(
      2,
      i,
      union_move_to_point_type_js_1.UnionMoveToPointType.NONE,
    );
  }
  static addMoveMotion(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endMoveToRelativePosition(t) {
    return t.endObject();
  }
}
exports.MoveToRelativePosition = MoveToRelativePosition;
//# sourceMappingURL=move-to-relative-position.js.map
