"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportToLatestResetPointDirectly = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportToLatestResetPointDirectly {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTeleportToLatestResetPointDirectly(t, e) {
    return (e || new TeleportToLatestResetPointDirectly()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleportToLatestResetPointDirectly(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TeleportToLatestResetPointDirectly()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startTeleportToLatestResetPointDirectly(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endTeleportToLatestResetPointDirectly(t) {
    return t.endObject();
  }
  static createTeleportToLatestResetPointDirectly(t, e) {
    return (
      TeleportToLatestResetPointDirectly.startTeleportToLatestResetPointDirectly(
        t,
      ),
      TeleportToLatestResetPointDirectly.addType(t, e),
      TeleportToLatestResetPointDirectly.endTeleportToLatestResetPointDirectly(
        t,
      )
    );
  }
}
exports.TeleportToLatestResetPointDirectly = TeleportToLatestResetPointDirectly;
//# sourceMappingURL=teleport-to-latest-reset-point-directly.js.map
