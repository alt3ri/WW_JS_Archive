"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguePrefabConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RoguePrefabConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsRoguePrefabConfig(e, t) {
    return (t || new RoguePrefabConfig()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRoguePrefabConfig(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new RoguePrefabConfig()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  index() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startRoguePrefabConfig(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addIndex(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endRoguePrefabConfig(e) {
    return e.endObject();
  }
  static createRoguePrefabConfig(e, t, i) {
    return (
      RoguePrefabConfig.startRoguePrefabConfig(e),
      RoguePrefabConfig.addType(e, t),
      RoguePrefabConfig.addIndex(e, i),
      RoguePrefabConfig.endRoguePrefabConfig(e)
    );
  }
}
exports.RoguePrefabConfig = RoguePrefabConfig;
//# sourceMappingURL=rogue-prefab-config.js.map
