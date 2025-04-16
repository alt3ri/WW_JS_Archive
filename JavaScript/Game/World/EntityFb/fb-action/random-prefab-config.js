"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RandomPrefabConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RandomPrefabConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsRandomPrefabConfig(t, a) {
    return (a || new RandomPrefabConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRandomPrefabConfig(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new RandomPrefabConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  randomPrefabId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startRandomPrefabConfig(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldInt8(0, a, 0);
  }
  static addRandomPrefabId(t, a) {
    t.addFieldInt32(1, a, 0);
  }
  static endRandomPrefabConfig(t) {
    return t.endObject();
  }
  static createRandomPrefabConfig(t, a, e) {
    return (
      RandomPrefabConfig.startRandomPrefabConfig(t),
      RandomPrefabConfig.addType(t, a),
      RandomPrefabConfig.addRandomPrefabId(t, e),
      RandomPrefabConfig.endRandomPrefabConfig(t)
    );
  }
}
exports.RandomPrefabConfig = RandomPrefabConfig;
//# sourceMappingURL=random-prefab-config.js.map
