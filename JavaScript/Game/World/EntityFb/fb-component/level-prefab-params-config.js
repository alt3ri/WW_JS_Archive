"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPrefabParamsConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_params_preset_js_1 = require("../fb-var/union-params-preset.js");
class LevelPrefabParamsConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsLevelPrefabParamsConfig(e, r) {
    return (r || new LevelPrefabParamsConfig()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsLevelPrefabParamsConfig(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new LevelPrefabParamsConfig()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  referenceActorKey(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, e) : void 0;
  }
  paramsType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_params_preset_js_1.UnionParamsPreset.NONE;
  }
  params(e) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r ? this.bb.__union(e, this.bb_pos + r) : void 0;
  }
  static startLevelPrefabParamsConfig(e) {
    e.startObject(3);
  }
  static addReferenceActorKey(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static addParamsType(e, r) {
    e.addFieldInt8(1, r, union_params_preset_js_1.UnionParamsPreset.NONE);
  }
  static addParams(e, r) {
    e.addFieldOffset(2, r, 0);
  }
  static endLevelPrefabParamsConfig(e) {
    return e.endObject();
  }
  static createLevelPrefabParamsConfig(e, r, a, s) {
    return (
      LevelPrefabParamsConfig.startLevelPrefabParamsConfig(e),
      LevelPrefabParamsConfig.addReferenceActorKey(e, r),
      LevelPrefabParamsConfig.addParamsType(e, a),
      LevelPrefabParamsConfig.addParams(e, s),
      LevelPrefabParamsConfig.endLevelPrefabParamsConfig(e)
    );
  }
}
exports.LevelPrefabParamsConfig = LevelPrefabParamsConfig;
//# sourceMappingURL=level-prefab-params-config.js.map
