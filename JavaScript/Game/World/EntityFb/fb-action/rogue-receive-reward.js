"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueReceiveReward = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RogueReceiveReward {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsRogueReceiveReward(e, t) {
    return (t || new RogueReceiveReward()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRogueReceiveReward(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new RogueReceiveReward()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  rogueRewardReceiveType(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startRogueReceiveReward(e) {
    e.startObject(1);
  }
  static addRogueRewardReceiveType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endRogueReceiveReward(e) {
    return e.endObject();
  }
  static createRogueReceiveReward(e, t) {
    return (
      RogueReceiveReward.startRogueReceiveReward(e),
      RogueReceiveReward.addRogueRewardReceiveType(e, t),
      RogueReceiveReward.endRogueReceiveReward(e)
    );
  }
}
exports.RogueReceiveReward = RogueReceiveReward;
//# sourceMappingURL=rogue-receive-reward.js.map
