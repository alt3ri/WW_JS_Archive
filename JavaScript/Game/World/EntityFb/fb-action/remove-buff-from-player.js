"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RemoveBuffFromPlayer = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RemoveBuffFromPlayer {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsRemoveBuffFromPlayer(e, t) {
    return (t || new RemoveBuffFromPlayer()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRemoveBuffFromPlayer(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new RemoveBuffFromPlayer()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  buffIds(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readInt64(this.bb.__vector(this.bb_pos + t) + 8 * e)
      : BigInt(0);
  }
  buffIdsLength() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startRemoveBuffFromPlayer(e) {
    e.startObject(1);
  }
  static addBuffIds(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static createBuffIdsVector(t, r) {
    t.startVector(8, r.length, 8);
    for (let e = r.length - 1; 0 <= e; e--) t.addInt64(r[e]);
    return t.endVector();
  }
  static startBuffIdsVector(e, t) {
    e.startVector(8, t, 8);
  }
  static endRemoveBuffFromPlayer(e) {
    return e.endObject();
  }
  static createRemoveBuffFromPlayer(e, t) {
    return (
      RemoveBuffFromPlayer.startRemoveBuffFromPlayer(e),
      RemoveBuffFromPlayer.addBuffIds(e, t),
      RemoveBuffFromPlayer.endRemoveBuffFromPlayer(e)
    );
  }
}
exports.RemoveBuffFromPlayer = RemoveBuffFromPlayer;
//# sourceMappingURL=remove-buff-from-player.js.map
