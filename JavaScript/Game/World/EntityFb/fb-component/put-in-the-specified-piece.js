"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PutInTheSpecifiedPiece = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  jigsaw_piece_match_js_1 = require("../fb-component/jigsaw-piece-match.js");
class PutInTheSpecifiedPiece {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsPutInTheSpecifiedPiece(e, t) {
    return (t || new PutInTheSpecifiedPiece()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsPutInTheSpecifiedPiece(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new PutInTheSpecifiedPiece()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  matchList(e, t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new jigsaw_piece_match_js_1.JigsawPieceMatch()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  matchListLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startPutInTheSpecifiedPiece(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addMatchList(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createMatchListVector(t, i) {
    t.startVector(4, i.length, 4);
    for (let e = i.length - 1; 0 <= e; e--) t.addOffset(i[e]);
    return t.endVector();
  }
  static startMatchListVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endPutInTheSpecifiedPiece(e) {
    return e.endObject();
  }
  static createPutInTheSpecifiedPiece(e, t, i) {
    return (
      PutInTheSpecifiedPiece.startPutInTheSpecifiedPiece(e),
      PutInTheSpecifiedPiece.addType(e, t),
      PutInTheSpecifiedPiece.addMatchList(e, i),
      PutInTheSpecifiedPiece.endPutInTheSpecifiedPiece(e)
    );
  }
}
exports.PutInTheSpecifiedPiece = PutInTheSpecifiedPiece;
//# sourceMappingURL=put-in-the-specified-piece.js.map
