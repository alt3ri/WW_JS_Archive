"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckSubLevelStateConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckSubLevelStateConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCheckSubLevelStateConfig(e, t) {
    return (t || new CheckSubLevelStateConfig()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCheckSubLevelStateConfig(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckSubLevelStateConfig()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  subLevelName(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  subLevelState(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startCheckSubLevelStateConfig(e) {
    e.startObject(2);
  }
  static addSubLevelName(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addSubLevelState(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endCheckSubLevelStateConfig(e) {
    return e.endObject();
  }
  static createCheckSubLevelStateConfig(e, t, i) {
    return (
      CheckSubLevelStateConfig.startCheckSubLevelStateConfig(e),
      CheckSubLevelStateConfig.addSubLevelName(e, t),
      CheckSubLevelStateConfig.addSubLevelState(e, i),
      CheckSubLevelStateConfig.endCheckSubLevelStateConfig(e)
    );
  }
}
exports.CheckSubLevelStateConfig = CheckSubLevelStateConfig;
//# sourceMappingURL=check-sub-level-state-config.js.map
