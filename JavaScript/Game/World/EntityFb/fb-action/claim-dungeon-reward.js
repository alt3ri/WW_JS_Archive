"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ClaimDungeonReward = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ClaimDungeonReward {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsClaimDungeonReward(e, t) {
    return (t || new ClaimDungeonReward()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsClaimDungeonReward(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ClaimDungeonReward()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  static startClaimDungeonReward(e) {
    e.startObject(0);
  }
  static endClaimDungeonReward(e) {
    return e.endObject();
  }
  static createClaimDungeonReward(e) {
    return (
      ClaimDungeonReward.startClaimDungeonReward(e),
      ClaimDungeonReward.endClaimDungeonReward(e)
    );
  }
}
exports.ClaimDungeonReward = ClaimDungeonReward;
//# sourceMappingURL=claim-dungeon-reward.js.map
