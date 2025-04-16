"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PathLineMove = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PathLineMove {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPathLineMove(t, e) {
    return (e || new PathLineMove()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPathLineMove(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PathLineMove()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  maxOffsetDistance() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  isOneWay() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  layerVerticalLimit() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startPathLineMove(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMaxOffsetDistance(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static addIsOneWay(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addLayerVerticalLimit(t, e) {
    t.addFieldFloat32(3, e, 0);
  }
  static endPathLineMove(t) {
    return t.endObject();
  }
  static createPathLineMove(t, e, i, s, a) {
    return (
      PathLineMove.startPathLineMove(t),
      PathLineMove.addType(t, e),
      PathLineMove.addMaxOffsetDistance(t, i),
      PathLineMove.addIsOneWay(t, s),
      PathLineMove.addLayerVerticalLimit(t, a),
      PathLineMove.endPathLineMove(t)
    );
  }
}
exports.PathLineMove = PathLineMove;
//# sourceMappingURL=path-line-move.js.map
