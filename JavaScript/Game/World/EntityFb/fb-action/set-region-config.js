"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetRegionConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetRegionConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetRegionConfig(t, e) {
    return (e || new SetRegionConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetRegionConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetRegionConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startSetRegionConfig(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSetRegionConfig(t) {
    return t.endObject();
  }
  static createSetRegionConfig(t, e) {
    return (
      SetRegionConfig.startSetRegionConfig(t),
      SetRegionConfig.addType(t, e),
      SetRegionConfig.endSetRegionConfig(t)
    );
  }
}
exports.SetRegionConfig = SetRegionConfig;
//# sourceMappingURL=set-region-config.js.map
