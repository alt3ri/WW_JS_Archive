"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowardEntityConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TowardEntityConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsTowardEntityConfig(t, i) {
    return (i || new TowardEntityConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTowardEntityConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new TowardEntityConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  referenceActorKey(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  targetEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startTowardEntityConfig(t) {
    t.startObject(2);
  }
  static addReferenceActorKey(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTargetEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endTowardEntityConfig(t) {
    return t.endObject();
  }
  static createTowardEntityConfig(t, i, r) {
    return (
      TowardEntityConfig.startTowardEntityConfig(t),
      TowardEntityConfig.addReferenceActorKey(t, i),
      TowardEntityConfig.addTargetEntityId(t, r),
      TowardEntityConfig.endTowardEntityConfig(t)
    );
  }
}
exports.TowardEntityConfig = TowardEntityConfig;
//# sourceMappingURL=toward-entity-config.js.map
