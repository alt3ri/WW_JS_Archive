"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportToAndEnterFishingBoat = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportToAndEnterFishingBoat {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTeleportToAndEnterFishingBoat(t, e) {
    return (e || new TeleportToAndEnterFishingBoat()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleportToAndEnterFishingBoat(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TeleportToAndEnterFishingBoat()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startTeleportToAndEnterFishingBoat(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endTeleportToAndEnterFishingBoat(t) {
    return t.endObject();
  }
  static createTeleportToAndEnterFishingBoat(t, e) {
    return (
      TeleportToAndEnterFishingBoat.startTeleportToAndEnterFishingBoat(t),
      TeleportToAndEnterFishingBoat.addType(t, e),
      TeleportToAndEnterFishingBoat.endTeleportToAndEnterFishingBoat(t)
    );
  }
}
exports.TeleportToAndEnterFishingBoat = TeleportToAndEnterFishingBoat;
//# sourceMappingURL=teleport-to-and-enter-fishing-boat.js.map
