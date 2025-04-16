"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.JigsawPiece = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  piece_index_js_1 = require("../fb-action/piece-index.js");
class JigsawPiece {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, e) {
    return (this.bb_pos = i), (this.bb = e), this;
  }
  static getRootAsJigsawPiece(i, e) {
    return (e || new JigsawPiece()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsJigsawPiece(i, e) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new JigsawPiece()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  index(i) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (i || new piece_index_js_1.PieceIndex()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  active() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  isCorrect() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  initState(i) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__string(this.bb_pos + e, i) : void 0;
  }
  static startJigsawPiece(i) {
    i.startObject(4);
  }
  static addIndex(i, e) {
    i.addFieldOffset(0, e, 0);
  }
  static addActive(i, e) {
    i.addFieldInt8(1, +e, 0);
  }
  static addIsCorrect(i, e) {
    i.addFieldInt8(2, +e, 0);
  }
  static addInitState(i, e) {
    i.addFieldOffset(3, e, 0);
  }
  static endJigsawPiece(i) {
    return i.endObject();
  }
  static createJigsawPiece(i, e, t, s, a) {
    return (
      JigsawPiece.startJigsawPiece(i),
      JigsawPiece.addIndex(i, e),
      JigsawPiece.addActive(i, t),
      JigsawPiece.addIsCorrect(i, s),
      JigsawPiece.addInitState(i, a),
      JigsawPiece.endJigsawPiece(i)
    );
  }
}
exports.JigsawPiece = JigsawPiece;
//# sourceMappingURL=jigsaw-piece.js.map
