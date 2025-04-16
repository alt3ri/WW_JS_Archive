"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpawnMonsterPreDependOnPreceding = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SpawnMonsterPreDependOnPreceding {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSpawnMonsterPreDependOnPreceding(e, t) {
    return (t || new SpawnMonsterPreDependOnPreceding()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSpawnMonsterPreDependOnPreceding(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SpawnMonsterPreDependOnPreceding()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  ids(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb.__vector(this.bb_pos + t) + 4 * e) : 0;
  }
  idsLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  idsArray() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + e),
          this.bb.__vector_len(this.bb_pos + e),
        )
      : void 0;
  }
  static startSpawnMonsterPreDependOnPreceding(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addIds(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createIdsVector(t, r) {
    t.startVector(4, r.length, 4);
    for (let e = r.length - 1; 0 <= e; e--) t.addInt32(r[e]);
    return t.endVector();
  }
  static startIdsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endSpawnMonsterPreDependOnPreceding(e) {
    return e.endObject();
  }
  static createSpawnMonsterPreDependOnPreceding(e, t, r) {
    return (
      SpawnMonsterPreDependOnPreceding.startSpawnMonsterPreDependOnPreceding(e),
      SpawnMonsterPreDependOnPreceding.addType(e, t),
      SpawnMonsterPreDependOnPreceding.addIds(e, r),
      SpawnMonsterPreDependOnPreceding.endSpawnMonsterPreDependOnPreceding(e)
    );
  }
}
exports.SpawnMonsterPreDependOnPreceding = SpawnMonsterPreDependOnPreceding;
//# sourceMappingURL=spawn-monster-pre-depend-on-preceding.js.map
