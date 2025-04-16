"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenjuChess = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_adjust_player_camera_option_js_1 = require("../fb-action/union-adjust-player-camera-option.js");
class RenjuChess {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(s, e) {
    return (this.bb_pos = s), (this.bb = e), this;
  }
  static getRootAsRenjuChess(s, e) {
    return (e || new RenjuChess()).__init(
      s.readInt32(s.position()) + s.position(),
      s,
    );
  }
  static getSizePrefixedRootAsRenjuChess(s, e) {
    return (
      s.setPosition(s.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new RenjuChess()).__init(
        s.readInt32(s.position()) + s.position(),
        s,
      )
    );
  }
  type(s) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, s) : void 0;
  }
  chessboard() {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.readInt32(this.bb_pos + s) : 0;
  }
  cameraConfigType() {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? this.bb.readUint8(this.bb_pos + s)
      : union_adjust_player_camera_option_js_1.UnionAdjustPlayerCameraOption
          .NONE;
  }
  cameraConfig(s) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(s, this.bb_pos + e) : void 0;
  }
  static startRenjuChess(s) {
    s.startObject(4);
  }
  static addType(s, e) {
    s.addFieldOffset(0, e, 0);
  }
  static addChessboard(s, e) {
    s.addFieldInt32(1, e, 0);
  }
  static addCameraConfigType(s, e) {
    s.addFieldInt8(
      2,
      e,
      union_adjust_player_camera_option_js_1.UnionAdjustPlayerCameraOption.NONE,
    );
  }
  static addCameraConfig(s, e) {
    s.addFieldOffset(3, e, 0);
  }
  static endRenjuChess(s) {
    return s.endObject();
  }
  static createRenjuChess(s, e, t, i, r) {
    return (
      RenjuChess.startRenjuChess(s),
      RenjuChess.addType(s, e),
      RenjuChess.addChessboard(s, t),
      RenjuChess.addCameraConfigType(s, i),
      RenjuChess.addCameraConfig(s, r),
      RenjuChess.endRenjuChess(s)
    );
  }
}
exports.RenjuChess = RenjuChess;
//# sourceMappingURL=renju-chess.js.map
