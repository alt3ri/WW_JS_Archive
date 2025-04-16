"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PieceIndex = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PieceIndex {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsPieceIndex(e, t) {
    return (t || new PieceIndex()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsPieceIndex(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new PieceIndex()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  rowIndex() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  columnIndex() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startPieceIndex(e) {
    e.startObject(2);
  }
  static addRowIndex(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addColumnIndex(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endPieceIndex(e) {
    return e.endObject();
  }
  static createPieceIndex(e, t, i) {
    return (
      PieceIndex.startPieceIndex(e),
      PieceIndex.addRowIndex(e, t),
      PieceIndex.addColumnIndex(e, i),
      PieceIndex.endPieceIndex(e)
    );
  }
}
exports.PieceIndex = PieceIndex;
//# sourceMappingURL=piece-index.js.map
