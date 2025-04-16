"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CloseSplineMove = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class CloseSplineMove {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCloseSplineMove(e, t) {
    return (t || new CloseSplineMove()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCloseSplineMove(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CloseSplineMove()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  targetType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_target_entity_js_1.UnionTargetEntity.NONE;
  }
  target(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  splineEntityId() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startCloseSplineMove(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTargetType(e, t) {
    e.addFieldInt8(1, t, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTarget(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addSplineEntityId(e, t) {
    e.addFieldInt32(3, t, 0);
  }
  static endCloseSplineMove(e) {
    return e.endObject();
  }
  static createCloseSplineMove(e, t, i, s, o) {
    return (
      CloseSplineMove.startCloseSplineMove(e),
      CloseSplineMove.addType(e, t),
      CloseSplineMove.addTargetType(e, i),
      CloseSplineMove.addTarget(e, s),
      CloseSplineMove.addSplineEntityId(e, o),
      CloseSplineMove.endCloseSplineMove(e)
    );
  }
}
exports.CloseSplineMove = CloseSplineMove;
//# sourceMappingURL=close-spline-move.js.map
