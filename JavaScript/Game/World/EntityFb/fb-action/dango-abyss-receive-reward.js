"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssReceiveReward = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DangoAbyssReceiveReward {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, s) {
    return (this.bb_pos = e), (this.bb = s), this;
  }
  static getRootAsDangoAbyssReceiveReward(e, s) {
    return (s || new DangoAbyssReceiveReward()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsDangoAbyssReceiveReward(e, s) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new DangoAbyssReceiveReward()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  static startDangoAbyssReceiveReward(e) {
    e.startObject(0);
  }
  static endDangoAbyssReceiveReward(e) {
    return e.endObject();
  }
  static createDangoAbyssReceiveReward(e) {
    return (
      DangoAbyssReceiveReward.startDangoAbyssReceiveReward(e),
      DangoAbyssReceiveReward.endDangoAbyssReceiveReward(e)
    );
  }
}
exports.DangoAbyssReceiveReward = DangoAbyssReceiveReward;
//# sourceMappingURL=dango-abyss-receive-reward.js.map
