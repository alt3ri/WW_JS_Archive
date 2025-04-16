"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GravityFlipConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GravityFlipConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsGravityFlipConfig(t, i) {
    return (i || new GravityFlipConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGravityFlipConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new GravityFlipConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  locationEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startGravityFlipConfig(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addLocationEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endGravityFlipConfig(t) {
    return t.endObject();
  }
  static createGravityFlipConfig(t, i, r) {
    return (
      GravityFlipConfig.startGravityFlipConfig(t),
      GravityFlipConfig.addType(t, i),
      GravityFlipConfig.addLocationEntityId(t, r),
      GravityFlipConfig.endGravityFlipConfig(t)
    );
  }
}
exports.GravityFlipConfig = GravityFlipConfig;
//# sourceMappingURL=gravity-flip-config.js.map
