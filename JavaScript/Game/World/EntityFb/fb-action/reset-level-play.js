"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResetLevelPlay = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ResetLevelPlay {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsResetLevelPlay(e, t) {
    return (t || new ResetLevelPlay()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsResetLevelPlay(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ResetLevelPlay()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  resetLevelPlayList(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb.__vector(this.bb_pos + t) + 4 * e) : 0;
  }
  resetLevelPlayListLength() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  resetLevelPlayListArray() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + e),
          this.bb.__vector_len(this.bb_pos + e),
        )
      : void 0;
  }
  static startResetLevelPlay(e) {
    e.startObject(1);
  }
  static addResetLevelPlayList(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static createResetLevelPlayListVector(t, s) {
    t.startVector(4, s.length, 4);
    for (let e = s.length - 1; 0 <= e; e--) t.addInt32(s[e]);
    return t.endVector();
  }
  static startResetLevelPlayListVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endResetLevelPlay(e) {
    return e.endObject();
  }
  static createResetLevelPlay(e, t) {
    return (
      ResetLevelPlay.startResetLevelPlay(e),
      ResetLevelPlay.addResetLevelPlayList(e, t),
      ResetLevelPlay.endResetLevelPlay(e)
    );
  }
}
exports.ResetLevelPlay = ResetLevelPlay;
//# sourceMappingURL=reset-level-play.js.map
