"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivateAllCorrectPiece = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActivateAllCorrectPiece {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsActivateAllCorrectPiece(t, e) {
    return (e || new ActivateAllCorrectPiece()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActivateAllCorrectPiece(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ActivateAllCorrectPiece()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startActivateAllCorrectPiece(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endActivateAllCorrectPiece(t) {
    return t.endObject();
  }
  static createActivateAllCorrectPiece(t, e) {
    return (
      ActivateAllCorrectPiece.startActivateAllCorrectPiece(t),
      ActivateAllCorrectPiece.addType(t, e),
      ActivateAllCorrectPiece.endActivateAllCorrectPiece(t)
    );
  }
}
exports.ActivateAllCorrectPiece = ActivateAllCorrectPiece;
//# sourceMappingURL=activate-all-correct-piece.js.map
