"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableLevelPlayConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableLevelPlayConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsEnableLevelPlayConfig(e, t) {
    return (t || new EnableLevelPlayConfig()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsEnableLevelPlayConfig(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new EnableLevelPlayConfig()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  levelPlayId() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  enable() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startEnableLevelPlayConfig(e) {
    e.startObject(2);
  }
  static addLevelPlayId(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addEnable(e, t) {
    e.addFieldInt8(1, +t, 0);
  }
  static endEnableLevelPlayConfig(e) {
    return e.endObject();
  }
  static createEnableLevelPlayConfig(e, t, l) {
    return (
      EnableLevelPlayConfig.startEnableLevelPlayConfig(e),
      EnableLevelPlayConfig.addLevelPlayId(e, t),
      EnableLevelPlayConfig.addEnable(e, l),
      EnableLevelPlayConfig.endEnableLevelPlayConfig(e)
    );
  }
}
exports.EnableLevelPlayConfig = EnableLevelPlayConfig;
//# sourceMappingURL=enable-level-play-config.js.map
