"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpawnMonsterConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_spawn_monster_complete_condition_js_1 = require("../fb-component/union-spawn-monster-complete-condition.js"),
  union_spawn_monster_pre_condition_js_1 = require("../fb-component/union-spawn-monster-pre-condition.js");
class SpawnMonsterConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsSpawnMonsterConfig(t, n) {
    return (n || new SpawnMonsterConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSpawnMonsterConfig(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new SpawnMonsterConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  targetsToAwake(t) {
    var n = this.bb.__offset(this.bb_pos, 8);
    return n ? this.bb.readInt32(this.bb.__vector(this.bb_pos + n) + 4 * t) : 0;
  }
  targetsToAwakeLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  targetsToAwakeArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  completeConditionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_spawn_monster_complete_condition_js_1
          .UnionSpawnMonsterCompleteCondition.NONE;
  }
  completeCondition(t) {
    var n = this.bb.__offset(this.bb_pos, 12);
    return n ? this.bb.__union(t, this.bb_pos + n) : void 0;
  }
  preConditionType() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_spawn_monster_pre_condition_js_1.UnionSpawnMonsterPreCondition
          .NONE;
  }
  preCondition(t) {
    var n = this.bb.__offset(this.bb_pos, 16);
    return n ? this.bb.__union(t, this.bb_pos + n) : void 0;
  }
  static startSpawnMonsterConfig(t) {
    t.startObject(7);
  }
  static addId(t, n) {
    t.addFieldInt32(0, n, 0);
  }
  static addDelayTime(t, n) {
    t.addFieldFloat32(1, n, 0);
  }
  static addTargetsToAwake(t, n) {
    t.addFieldOffset(2, n, 0);
  }
  static createTargetsToAwakeVector(n, i) {
    n.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) n.addInt32(i[t]);
    return n.endVector();
  }
  static startTargetsToAwakeVector(t, n) {
    t.startVector(4, n, 4);
  }
  static addCompleteConditionType(t, n) {
    t.addFieldInt8(
      3,
      n,
      union_spawn_monster_complete_condition_js_1
        .UnionSpawnMonsterCompleteCondition.NONE,
    );
  }
  static addCompleteCondition(t, n) {
    t.addFieldOffset(4, n, 0);
  }
  static addPreConditionType(t, n) {
    t.addFieldInt8(
      5,
      n,
      union_spawn_monster_pre_condition_js_1.UnionSpawnMonsterPreCondition.NONE,
    );
  }
  static addPreCondition(t, n) {
    t.addFieldOffset(6, n, 0);
  }
  static endSpawnMonsterConfig(t) {
    return t.endObject();
  }
  static createSpawnMonsterConfig(t, n, i, s, e, o, r, a) {
    return (
      SpawnMonsterConfig.startSpawnMonsterConfig(t),
      SpawnMonsterConfig.addId(t, n),
      SpawnMonsterConfig.addDelayTime(t, i),
      SpawnMonsterConfig.addTargetsToAwake(t, s),
      SpawnMonsterConfig.addCompleteConditionType(t, e),
      SpawnMonsterConfig.addCompleteCondition(t, o),
      SpawnMonsterConfig.addPreConditionType(t, r),
      SpawnMonsterConfig.addPreCondition(t, a),
      SpawnMonsterConfig.endSpawnMonsterConfig(t)
    );
  }
}
exports.SpawnMonsterConfig = SpawnMonsterConfig;
//# sourceMappingURL=spawn-monster-config.js.map
