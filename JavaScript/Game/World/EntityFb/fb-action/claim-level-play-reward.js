"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ClaimLevelPlayReward = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ClaimLevelPlayReward {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, a) {
    return (this.bb_pos = e), (this.bb = a), this;
  }
  static getRootAsClaimLevelPlayReward(e, a) {
    return (a || new ClaimLevelPlayReward()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsClaimLevelPlayReward(e, a) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new ClaimLevelPlayReward()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  static startClaimLevelPlayReward(e) {
    e.startObject(0);
  }
  static endClaimLevelPlayReward(e) {
    return e.endObject();
  }
  static createClaimLevelPlayReward(e) {
    return (
      ClaimLevelPlayReward.startClaimLevelPlayReward(e),
      ClaimLevelPlayReward.endClaimLevelPlayReward(e)
    );
  }
}
exports.ClaimLevelPlayReward = ClaimLevelPlayReward;
//# sourceMappingURL=claim-level-play-reward.js.map
