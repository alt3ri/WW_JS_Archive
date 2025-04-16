"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerceptionNotifyGatherToPlayer = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PerceptionNotifyGatherToPlayer {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPerceptionNotifyGatherToPlayer(t, e) {
    return (e || new PerceptionNotifyGatherToPlayer()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPerceptionNotifyGatherToPlayer(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PerceptionNotifyGatherToPlayer()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startPerceptionNotifyGatherToPlayer(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endPerceptionNotifyGatherToPlayer(t) {
    return t.endObject();
  }
  static createPerceptionNotifyGatherToPlayer(t, e) {
    return (
      PerceptionNotifyGatherToPlayer.startPerceptionNotifyGatherToPlayer(t),
      PerceptionNotifyGatherToPlayer.addType(t, e),
      PerceptionNotifyGatherToPlayer.endPerceptionNotifyGatherToPlayer(t)
    );
  }
}
exports.PerceptionNotifyGatherToPlayer = PerceptionNotifyGatherToPlayer;
//# sourceMappingURL=perception-notify-gather-to-player.js.map
