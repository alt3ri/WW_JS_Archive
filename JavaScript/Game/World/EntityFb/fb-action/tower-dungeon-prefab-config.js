"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDungeonPrefabConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TowerDungeonPrefabConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsTowerDungeonPrefabConfig(e, r) {
    return (r || new TowerDungeonPrefabConfig()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsTowerDungeonPrefabConfig(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new TowerDungeonPrefabConfig()).__init(
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
  static startTowerDungeonPrefabConfig(e) {
    e.startObject(2);
  }
  static addType(e, r) {
    e.addFieldInt8(0, r, 0);
  }
  static addIndex(e, r) {
    e.addFieldInt32(1, r, 0);
  }
  static endTowerDungeonPrefabConfig(e) {
    return e.endObject();
  }
  static createTowerDungeonPrefabConfig(e, r, t) {
    return (
      TowerDungeonPrefabConfig.startTowerDungeonPrefabConfig(e),
      TowerDungeonPrefabConfig.addType(e, r),
      TowerDungeonPrefabConfig.addIndex(e, t),
      TowerDungeonPrefabConfig.endTowerDungeonPrefabConfig(e)
    );
  }
}
exports.TowerDungeonPrefabConfig = TowerDungeonPrefabConfig;
//# sourceMappingURL=tower-dungeon-prefab-config.js.map
