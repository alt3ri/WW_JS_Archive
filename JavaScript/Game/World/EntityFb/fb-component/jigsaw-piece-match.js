"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.JigsawPieceMatch = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  piece_index_js_1 = require("../fb-action/piece-index.js");
class JigsawPieceMatch {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsJigsawPieceMatch(t, e) {
    return (e || new JigsawPieceMatch()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsJigsawPieceMatch(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new JigsawPieceMatch()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  index(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new piece_index_js_1.PieceIndex()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startJigsawPieceMatch(t) {
    t.startObject(2);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIndex(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endJigsawPieceMatch(t) {
    return t.endObject();
  }
}
exports.JigsawPieceMatch = JigsawPieceMatch;
//# sourceMappingURL=jigsaw-piece-match.js.map
