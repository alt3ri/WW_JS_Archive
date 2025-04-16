"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformerAiMoveToPlayer = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PerformerAiMoveToPlayer {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsPerformerAiMoveToPlayer(e, r) {
    return (r || new PerformerAiMoveToPlayer()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsPerformerAiMoveToPlayer(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new PerformerAiMoveToPlayer()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, e) : void 0;
  }
  static startPerformerAiMoveToPlayer(e) {
    e.startObject(1);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static endPerformerAiMoveToPlayer(e) {
    return e.endObject();
  }
  static createPerformerAiMoveToPlayer(e, r) {
    return (
      PerformerAiMoveToPlayer.startPerformerAiMoveToPlayer(e),
      PerformerAiMoveToPlayer.addType(e, r),
      PerformerAiMoveToPlayer.endPerformerAiMoveToPlayer(e)
    );
  }
}
exports.PerformerAiMoveToPlayer = PerformerAiMoveToPlayer;
//# sourceMappingURL=performer-ai-move-to-player.js.map
