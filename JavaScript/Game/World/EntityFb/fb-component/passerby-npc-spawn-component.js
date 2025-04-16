"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PasserbyNpcSpawnComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_passerby_npc_move_js_1 = require("../fb-component/union-passerby-npc-move.js"),
  union_passerby_npc_source_js_1 = require("../fb-component/union-passerby-npc-source.js"),
  union_passerby_npc_spawn_js_1 = require("../fb-component/union-passerby-npc-spawn.js");
class PasserbyNpcSpawnComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(s, n) {
    return (this.bb_pos = s), (this.bb = n), this;
  }
  static getRootAsPasserbyNpcSpawnComponent(s, n) {
    return (n || new PasserbyNpcSpawnComponent()).__init(
      s.readInt32(s.position()) + s.position(),
      s,
    );
  }
  static getSizePrefixedRootAsPasserbyNpcSpawnComponent(s, n) {
    return (
      s.setPosition(s.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new PasserbyNpcSpawnComponent()).__init(
        s.readInt32(s.position()) + s.position(),
        s,
      )
    );
  }
  disabled() {
    var s = this.bb.__offset(this.bb_pos, 4);
    return !!s && !!this.bb.readInt8(this.bb_pos + s);
  }
  moveConfigType() {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? this.bb.readUint8(this.bb_pos + s)
      : union_passerby_npc_move_js_1.UnionPasserbyNpcMove.NONE;
  }
  moveConfig(s) {
    var n = this.bb.__offset(this.bb_pos, 8);
    return n ? this.bb.__union(s, this.bb_pos + n) : void 0;
  }
  spawnConfigType() {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? this.bb.readUint8(this.bb_pos + s)
      : union_passerby_npc_spawn_js_1.UnionPasserbyNpcSpawn.NONE;
  }
  spawnConfig(s) {
    var n = this.bb.__offset(this.bb_pos, 12);
    return n ? this.bb.__union(s, this.bb_pos + n) : void 0;
  }
  sourceConfigType() {
    var s = this.bb.__offset(this.bb_pos, 14);
    return s
      ? this.bb.readUint8(this.bb_pos + s)
      : union_passerby_npc_source_js_1.UnionPasserbyNpcSource.NONE;
  }
  sourceConfig(s) {
    var n = this.bb.__offset(this.bb_pos, 16);
    return n ? this.bb.__union(s, this.bb_pos + n) : void 0;
  }
  static startPasserbyNpcSpawnComponent(s) {
    s.startObject(7);
  }
  static addDisabled(s, n) {
    s.addFieldInt8(0, +n, 0);
  }
  static addMoveConfigType(s, n) {
    s.addFieldInt8(
      1,
      n,
      union_passerby_npc_move_js_1.UnionPasserbyNpcMove.NONE,
    );
  }
  static addMoveConfig(s, n) {
    s.addFieldOffset(2, n, 0);
  }
  static addSpawnConfigType(s, n) {
    s.addFieldInt8(
      3,
      n,
      union_passerby_npc_spawn_js_1.UnionPasserbyNpcSpawn.NONE,
    );
  }
  static addSpawnConfig(s, n) {
    s.addFieldOffset(4, n, 0);
  }
  static addSourceConfigType(s, n) {
    s.addFieldInt8(
      5,
      n,
      union_passerby_npc_source_js_1.UnionPasserbyNpcSource.NONE,
    );
  }
  static addSourceConfig(s, n) {
    s.addFieldOffset(6, n, 0);
  }
  static endPasserbyNpcSpawnComponent(s) {
    return s.endObject();
  }
  static createPasserbyNpcSpawnComponent(s, n, e, t, o, p, a, r) {
    return (
      PasserbyNpcSpawnComponent.startPasserbyNpcSpawnComponent(s),
      PasserbyNpcSpawnComponent.addDisabled(s, n),
      PasserbyNpcSpawnComponent.addMoveConfigType(s, e),
      PasserbyNpcSpawnComponent.addMoveConfig(s, t),
      PasserbyNpcSpawnComponent.addSpawnConfigType(s, o),
      PasserbyNpcSpawnComponent.addSpawnConfig(s, p),
      PasserbyNpcSpawnComponent.addSourceConfigType(s, a),
      PasserbyNpcSpawnComponent.addSourceConfig(s, r),
      PasserbyNpcSpawnComponent.endPasserbyNpcSpawnComponent(s)
    );
  }
}
exports.PasserbyNpcSpawnComponent = PasserbyNpcSpawnComponent;
//# sourceMappingURL=passerby-npc-spawn-component.js.map
