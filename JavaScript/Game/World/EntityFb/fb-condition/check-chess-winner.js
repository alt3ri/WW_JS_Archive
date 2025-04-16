"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckChessWinner = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckChessWinner {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, s) {
    return (this.bb_pos = e), (this.bb = s), this;
  }
  static getRootAsCheckChessWinner(e, s) {
    return (s || new CheckChessWinner()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCheckChessWinner(e, s) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new CheckChessWinner()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, e) : void 0;
  }
  chessboardId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  winner(e) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s ? this.bb.__string(this.bb_pos + s, e) : void 0;
  }
  static startCheckChessWinner(e) {
    e.startObject(3);
  }
  static addType(e, s) {
    e.addFieldOffset(0, s, 0);
  }
  static addChessboardId(e, s) {
    e.addFieldInt32(1, s, 0);
  }
  static addWinner(e, s) {
    e.addFieldOffset(2, s, 0);
  }
  static endCheckChessWinner(e) {
    return e.endObject();
  }
  static createCheckChessWinner(e, s, t, i) {
    return (
      CheckChessWinner.startCheckChessWinner(e),
      CheckChessWinner.addType(e, s),
      CheckChessWinner.addChessboardId(e, t),
      CheckChessWinner.addWinner(e, i),
      CheckChessWinner.endCheckChessWinner(e)
    );
  }
}
exports.CheckChessWinner = CheckChessWinner;
//# sourceMappingURL=check-chess-winner.js.map
