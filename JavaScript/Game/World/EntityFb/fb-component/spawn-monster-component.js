"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpawnMonsterComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  spawn_monster_config_js_1 = require("../fb-component/spawn-monster-config.js"),
  union_spawn_monster_constraint_js_1 = require("../fb-component/union-spawn-monster-constraint.js"),
  union_spawn_monster_start_condition_js_1 = require("../fb-component/union-spawn-monster-start-condition.js");
class SpawnMonsterComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsSpawnMonsterComponent(t, n) {
    return (n || new SpawnMonsterComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSpawnMonsterComponent(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new SpawnMonsterComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  activeTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_spawn_monster_start_condition_js_1.UnionSpawnMonsterStartCondition
          .NONE;
  }
  activeType(t) {
    var n = this.bb.__offset(this.bb_pos, 8);
    return n ? this.bb.__union(t, this.bb_pos + n) : void 0;
  }
  spawnMonsterConfigs(t, n) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? (n || new spawn_monster_config_js_1.SpawnMonsterConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  spawnMonsterConfigsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  issharedHatred() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  spawnMonsterConstraintTypeType() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_spawn_monster_constraint_js_1.UnionSpawnMonsterConstraint.NONE;
  }
  spawnMonsterConstraintType(t) {
    var n = this.bb.__offset(this.bb_pos, 16);
    return n ? this.bb.__union(t, this.bb_pos + n) : void 0;
  }
  static startSpawnMonsterComponent(t) {
    t.startObject(7);
  }
  static addDisabled(t, n) {
    t.addFieldInt8(0, +n, 0);
  }
  static addActiveTypeType(t, n) {
    t.addFieldInt8(
      1,
      n,
      union_spawn_monster_start_condition_js_1.UnionSpawnMonsterStartCondition
        .NONE,
    );
  }
  static addActiveType(t, n) {
    t.addFieldOffset(2, n, 0);
  }
  static addSpawnMonsterConfigs(t, n) {
    t.addFieldOffset(3, n, 0);
  }
  static createSpawnMonsterConfigsVector(n, s) {
    n.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) n.addOffset(s[t]);
    return n.endVector();
  }
  static startSpawnMonsterConfigsVector(t, n) {
    t.startVector(4, n, 4);
  }
  static addIssharedHatred(t, n) {
    t.addFieldInt8(4, +n, 0);
  }
  static addSpawnMonsterConstraintTypeType(t, n) {
    t.addFieldInt8(
      5,
      n,
      union_spawn_monster_constraint_js_1.UnionSpawnMonsterConstraint.NONE,
    );
  }
  static addSpawnMonsterConstraintType(t, n) {
    t.addFieldOffset(6, n, 0);
  }
  static endSpawnMonsterComponent(t) {
    return t.endObject();
  }
  static createSpawnMonsterComponent(t, n, s, e, o, r, i, a) {
    return (
      SpawnMonsterComponent.startSpawnMonsterComponent(t),
      SpawnMonsterComponent.addDisabled(t, n),
      SpawnMonsterComponent.addActiveTypeType(t, s),
      SpawnMonsterComponent.addActiveType(t, e),
      SpawnMonsterComponent.addSpawnMonsterConfigs(t, o),
      SpawnMonsterComponent.addIssharedHatred(t, r),
      SpawnMonsterComponent.addSpawnMonsterConstraintTypeType(t, i),
      SpawnMonsterComponent.addSpawnMonsterConstraintType(t, a),
      SpawnMonsterComponent.endSpawnMonsterComponent(t)
    );
  }
}
exports.SpawnMonsterComponent = SpawnMonsterComponent;
//# sourceMappingURL=spawn-monster-component.js.map
