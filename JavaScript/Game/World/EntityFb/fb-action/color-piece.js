"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ColorPiece = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ColorPiece {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsColorPiece(e, t) {
    return (t || new ColorPiece()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsColorPiece(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ColorPiece()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  color(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startColorPiece(e) {
    e.startObject(1);
  }
  static addColor(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endColorPiece(e) {
    return e.endObject();
  }
  static createColorPiece(e, t) {
    return (
      ColorPiece.startColorPiece(e),
      ColorPiece.addColor(e, t),
      ColorPiece.endColorPiece(e)
    );
  }
}
exports.ColorPiece = ColorPiece;
//# sourceMappingURL=color-piece.js.map
