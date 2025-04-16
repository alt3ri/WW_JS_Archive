"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetPieceState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  jigsaw_piece_js_1 = require("../fb-action/jigsaw-piece.js");
class SetPieceState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetPieceState(t, e) {
    return (e || new SetPieceState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetPieceState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetPieceState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  pieceState(t, e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (e || new jigsaw_piece_js_1.JigsawPiece()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  pieceStateLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startSetPieceState(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addPieceState(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createPieceStateVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startPieceStateVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endSetPieceState(t) {
    return t.endObject();
  }
  static createSetPieceState(t, e, i, s) {
    return (
      SetPieceState.startSetPieceState(t),
      SetPieceState.addType(t, e),
      SetPieceState.addEntityId(t, i),
      SetPieceState.addPieceState(t, s),
      SetPieceState.endSetPieceState(t)
    );
  }
}
exports.SetPieceState = SetPieceState;
//# sourceMappingURL=set-piece-state.js.map
