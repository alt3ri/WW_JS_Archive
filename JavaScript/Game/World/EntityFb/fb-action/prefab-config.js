"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PrefabConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PrefabConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPrefabConfig(t, e) {
    return (e || new PrefabConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPrefabConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PrefabConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  prefabId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startPrefabConfig(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addPrefabId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endPrefabConfig(t) {
    return t.endObject();
  }
  static createPrefabConfig(t, e, r) {
    return (
      PrefabConfig.startPrefabConfig(t),
      PrefabConfig.addType(t, e),
      PrefabConfig.addPrefabId(t, r),
      PrefabConfig.endPrefabConfig(t)
    );
  }
}
exports.PrefabConfig = PrefabConfig;
//# sourceMappingURL=prefab-config.js.map
