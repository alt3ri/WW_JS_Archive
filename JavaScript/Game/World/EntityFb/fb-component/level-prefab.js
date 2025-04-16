"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPrefab = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  prefab_effect_config_js_1 = require("../fb-component/prefab-effect-config.js"),
  prefab_state_config_js_1 = require("../fb-component/prefab-state-config.js");
class LevelPrefab {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsLevelPrefab(t, e) {
    return (e || new LevelPrefab()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLevelPrefab(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new LevelPrefab()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  blueprintPath(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  prefabPath(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  nameOffsetZ() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  prefabStateList(t, e) {
    var r = this.bb.__offset(this.bb_pos, 12);
    return r
      ? (e || new prefab_state_config_js_1.PrefabStateConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  prefabStateListLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  effectStateList(t, e) {
    var r = this.bb.__offset(this.bb_pos, 14);
    return r
      ? (e || new prefab_effect_config_js_1.PrefabEffectConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  effectStateListLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startLevelPrefab(t) {
    t.startObject(6);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBlueprintPath(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPrefabPath(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addNameOffsetZ(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addPrefabStateList(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createPrefabStateListVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addOffset(r[t]);
    return e.endVector();
  }
  static startPrefabStateListVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addEffectStateList(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static createEffectStateListVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addOffset(r[t]);
    return e.endVector();
  }
  static startEffectStateListVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endLevelPrefab(t) {
    return t.endObject();
  }
  static createLevelPrefab(t, e, r, s, i, a, f) {
    return (
      LevelPrefab.startLevelPrefab(t),
      LevelPrefab.addType(t, e),
      LevelPrefab.addBlueprintPath(t, r),
      LevelPrefab.addPrefabPath(t, s),
      LevelPrefab.addNameOffsetZ(t, i),
      LevelPrefab.addPrefabStateList(t, a),
      LevelPrefab.addEffectStateList(t, f),
      LevelPrefab.endLevelPrefab(t)
    );
  }
}
exports.LevelPrefab = LevelPrefab;
//# sourceMappingURL=level-prefab.js.map
