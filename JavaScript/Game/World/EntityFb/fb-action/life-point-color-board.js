"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LifePointColorBoard = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  color_piece_js_1 = require("../fb-action/color-piece.js");
class LifePointColorBoard {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsLifePointColorBoard(t, o) {
    return (o || new LifePointColorBoard()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLifePointColorBoard(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new LifePointColorBoard()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  config(t, o) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r
      ? (o || new color_piece_js_1.ColorPiece()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  configLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  colors(t, o) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r
      ? this.bb.__string(this.bb.__vector(this.bb_pos + r) + 4 * t, o)
      : void 0;
  }
  colorsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  targetColor(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  static startLifePointColorBoard(t) {
    t.startObject(3);
  }
  static addConfig(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static createConfigVector(o, r) {
    o.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) o.addOffset(r[t]);
    return o.endVector();
  }
  static startConfigVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addColors(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static createColorsVector(o, r) {
    o.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) o.addOffset(r[t]);
    return o.endVector();
  }
  static startColorsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addTargetColor(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static endLifePointColorBoard(t) {
    return t.endObject();
  }
  static createLifePointColorBoard(t, o, r, i) {
    return (
      LifePointColorBoard.startLifePointColorBoard(t),
      LifePointColorBoard.addConfig(t, o),
      LifePointColorBoard.addColors(t, r),
      LifePointColorBoard.addTargetColor(t, i),
      LifePointColorBoard.endLifePointColorBoard(t)
    );
  }
}
exports.LifePointColorBoard = LifePointColorBoard;
//# sourceMappingURL=life-point-color-board.js.map
