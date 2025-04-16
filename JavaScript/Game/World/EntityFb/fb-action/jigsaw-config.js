"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.JigsawConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  jigsaw_piece_js_1 = require("../fb-action/jigsaw-piece.js");
class JigsawConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsJigsawConfig(i, t) {
    return (t || new JigsawConfig()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsJigsawConfig(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new JigsawConfig()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  row() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  column() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  size() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  shape(i) {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  pieces(i, t) {
    var s = this.bb.__offset(this.bb_pos, 12);
    return s
      ? (t || new jigsaw_piece_js_1.JigsawPiece()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * i),
          this.bb,
        )
      : void 0;
  }
  piecesLength() {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
  }
  static startJigsawConfig(i) {
    i.startObject(5);
  }
  static addRow(i, t) {
    i.addFieldInt32(0, t, 0);
  }
  static addColumn(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addSize(i, t) {
    i.addFieldInt32(2, t, 0);
  }
  static addShape(i, t) {
    i.addFieldOffset(3, t, 0);
  }
  static addPieces(i, t) {
    i.addFieldOffset(4, t, 0);
  }
  static createPiecesVector(t, s) {
    t.startVector(4, s.length, 4);
    for (let i = s.length - 1; 0 <= i; i--) t.addOffset(s[i]);
    return t.endVector();
  }
  static startPiecesVector(i, t) {
    i.startVector(4, t, 4);
  }
  static endJigsawConfig(i) {
    return i.endObject();
  }
  static createJigsawConfig(i, t, s, e, a, r) {
    return (
      JigsawConfig.startJigsawConfig(i),
      JigsawConfig.addRow(i, t),
      JigsawConfig.addColumn(i, s),
      JigsawConfig.addSize(i, e),
      JigsawConfig.addShape(i, a),
      JigsawConfig.addPieces(i, r),
      JigsawConfig.endJigsawConfig(i)
    );
  }
}
exports.JigsawConfig = JigsawConfig;
//# sourceMappingURL=jigsaw-config.js.map
