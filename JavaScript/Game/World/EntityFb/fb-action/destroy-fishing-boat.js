"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DestroyFishingBoat = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DestroyFishingBoat {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsDestroyFishingBoat(t, s) {
    return (s || new DestroyFishingBoat()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDestroyFishingBoat(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new DestroyFishingBoat()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startDestroyFishingBoat(t) {
    t.startObject(0);
  }
  static endDestroyFishingBoat(t) {
    return t.endObject();
  }
  static createDestroyFishingBoat(t) {
    return (
      DestroyFishingBoat.startDestroyFishingBoat(t),
      DestroyFishingBoat.endDestroyFishingBoat(t)
    );
  }
}
exports.DestroyFishingBoat = DestroyFishingBoat;
//# sourceMappingURL=destroy-fishing-boat.js.map
