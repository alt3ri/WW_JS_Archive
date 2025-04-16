"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PrefabStateConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PrefabStateConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPrefabStateConfig(t, e) {
    return (e || new PrefabStateConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPrefabStateConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PrefabStateConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  levelTag() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  sceneInteractionState() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startPrefabStateConfig(t) {
    t.startObject(2);
  }
  static addLevelTag(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addSceneInteractionState(t, e) {
    t.addFieldInt8(1, e, 0);
  }
  static endPrefabStateConfig(t) {
    return t.endObject();
  }
  static createPrefabStateConfig(t, e, a) {
    return (
      PrefabStateConfig.startPrefabStateConfig(t),
      PrefabStateConfig.addLevelTag(t, e),
      PrefabStateConfig.addSceneInteractionState(t, a),
      PrefabStateConfig.endPrefabStateConfig(t)
    );
  }
}
exports.PrefabStateConfig = PrefabStateConfig;
//# sourceMappingURL=prefab-state-config.js.map
