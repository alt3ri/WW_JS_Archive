"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PrefabEffectConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PrefabEffectConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPrefabEffectConfig(t, e) {
    return (e || new PrefabEffectConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPrefabEffectConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PrefabEffectConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  levelTag() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  sceneInteractionEffectState() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startPrefabEffectConfig(t) {
    t.startObject(2);
  }
  static addLevelTag(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addSceneInteractionEffectState(t, e) {
    t.addFieldInt8(1, e, 0);
  }
  static endPrefabEffectConfig(t) {
    return t.endObject();
  }
  static createPrefabEffectConfig(t, e, f) {
    return (
      PrefabEffectConfig.startPrefabEffectConfig(t),
      PrefabEffectConfig.addLevelTag(t, e),
      PrefabEffectConfig.addSceneInteractionEffectState(t, f),
      PrefabEffectConfig.endPrefabEffectConfig(t)
    );
  }
}
exports.PrefabEffectConfig = PrefabEffectConfig;
//# sourceMappingURL=prefab-effect-config.js.map
