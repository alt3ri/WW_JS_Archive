"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GetRewardByInteract = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GetRewardByInteract {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsGetRewardByInteract(t, e) {
    return (e || new GetRewardByInteract()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGetRewardByInteract(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new GetRewardByInteract()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startGetRewardByInteract(t) {
    t.startObject(0);
  }
  static endGetRewardByInteract(t) {
    return t.endObject();
  }
  static createGetRewardByInteract(t) {
    return (
      GetRewardByInteract.startGetRewardByInteract(t),
      GetRewardByInteract.endGetRewardByInteract(t)
    );
  }
}
exports.GetRewardByInteract = GetRewardByInteract;
//# sourceMappingURL=get-reward-by-interact.js.map
