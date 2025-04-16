"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActiveRenjuPiece = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  jigsaw_item_matched_config_js_1 = require("../fb-component/jigsaw-item-matched-config.js"),
  renju_config_js_1 = require("../fb-component/renju-config.js");
class ActiveRenjuPiece {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsActiveRenjuPiece(e, t) {
    return (t || new ActiveRenjuPiece()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsActiveRenjuPiece(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ActiveRenjuPiece()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  renjuConfig(e, t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new renju_config_js_1.RenjuConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  renjuConfigLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  exitMatchedConfig(e, t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (
          t || new jigsaw_item_matched_config_js_1.JigsawItemMatchedConfig()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  exitMatchedConfigLength() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startActiveRenjuPiece(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addRenjuConfig(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createRenjuConfigVector(t, i) {
    t.startVector(4, i.length, 4);
    for (let e = i.length - 1; 0 <= e; e--) t.addOffset(i[e]);
    return t.endVector();
  }
  static startRenjuConfigVector(e, t) {
    e.startVector(4, t, 4);
  }
  static addExitMatchedConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static createExitMatchedConfigVector(t, i) {
    t.startVector(4, i.length, 4);
    for (let e = i.length - 1; 0 <= e; e--) t.addOffset(i[e]);
    return t.endVector();
  }
  static startExitMatchedConfigVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endActiveRenjuPiece(e) {
    return e.endObject();
  }
  static createActiveRenjuPiece(e, t, i, s) {
    return (
      ActiveRenjuPiece.startActiveRenjuPiece(e),
      ActiveRenjuPiece.addType(e, t),
      ActiveRenjuPiece.addRenjuConfig(e, i),
      ActiveRenjuPiece.addExitMatchedConfig(e, s),
      ActiveRenjuPiece.endActiveRenjuPiece(e)
    );
  }
}
exports.ActiveRenjuPiece = ActiveRenjuPiece;
//# sourceMappingURL=active-renju-piece.js.map
