"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SlashTowerPrefabConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SlashTowerPrefabConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsSlashTowerPrefabConfig(e, r) {
    return (r || new SlashTowerPrefabConfig()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSlashTowerPrefabConfig(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new SlashTowerPrefabConfig()).__init(
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
  static startSlashTowerPrefabConfig(e) {
    e.startObject(2);
  }
  static addType(e, r) {
    e.addFieldInt8(0, r, 0);
  }
  static addIndex(e, r) {
    e.addFieldInt32(1, r, 0);
  }
  static endSlashTowerPrefabConfig(e) {
    return e.endObject();
  }
  static createSlashTowerPrefabConfig(e, r, t) {
    return (
      SlashTowerPrefabConfig.startSlashTowerPrefabConfig(e),
      SlashTowerPrefabConfig.addType(e, r),
      SlashTowerPrefabConfig.addIndex(e, t),
      SlashTowerPrefabConfig.endSlashTowerPrefabConfig(e)
    );
  }
}
exports.SlashTowerPrefabConfig = SlashTowerPrefabConfig;
//# sourceMappingURL=slash-tower-prefab-config.js.map
