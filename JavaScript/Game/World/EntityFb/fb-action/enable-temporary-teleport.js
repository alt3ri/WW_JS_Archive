"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableTemporaryTeleport = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableTemporaryTeleport {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsEnableTemporaryTeleport(e, t) {
    return (t || new EnableTemporaryTeleport()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsEnableTemporaryTeleport(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new EnableTemporaryTeleport()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  enable() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  rangeEntity() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startEnableTemporaryTeleport(e) {
    e.startObject(2);
  }
  static addEnable(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addRangeEntity(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endEnableTemporaryTeleport(e) {
    return e.endObject();
  }
  static createEnableTemporaryTeleport(e, t, r) {
    return (
      EnableTemporaryTeleport.startEnableTemporaryTeleport(e),
      EnableTemporaryTeleport.addEnable(e, t),
      EnableTemporaryTeleport.addRangeEntity(e, r),
      EnableTemporaryTeleport.endEnableTemporaryTeleport(e)
    );
  }
}
exports.EnableTemporaryTeleport = EnableTemporaryTeleport;
//# sourceMappingURL=enable-temporary-teleport.js.map
