"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnlockTeleportTrigger = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockTeleportTrigger {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsUnlockTeleportTrigger(e, r) {
    return (r || new UnlockTeleportTrigger()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsUnlockTeleportTrigger(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new UnlockTeleportTrigger()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  teleportId() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startUnlockTeleportTrigger(e) {
    e.startObject(1);
  }
  static addTeleportId(e, r) {
    e.addFieldInt32(0, r, 0);
  }
  static endUnlockTeleportTrigger(e) {
    return e.endObject();
  }
  static createUnlockTeleportTrigger(e, r) {
    return (
      UnlockTeleportTrigger.startUnlockTeleportTrigger(e),
      UnlockTeleportTrigger.addTeleportId(e, r),
      UnlockTeleportTrigger.endUnlockTeleportTrigger(e)
    );
  }
}
exports.UnlockTeleportTrigger = UnlockTeleportTrigger;
//# sourceMappingURL=unlock-teleport-trigger.js.map
