"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterFormation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MonsterFormation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsMonsterFormation(t, o) {
    return (o || new MonsterFormation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMonsterFormation(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new MonsterFormation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  formationPosConfig(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.readUint8(this.bb.__vector(this.bb_pos + o) + t) : 0;
  }
  formationPosConfigLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  formationPosConfigArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startMonsterFormation(t) {
    t.startObject(1);
  }
  static addFormationPosConfig(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static createFormationPosConfigVector(o, r) {
    o.startVector(1, r.length, 1);
    for (let t = r.length - 1; 0 <= t; t--) o.addInt8(r[t]);
    return o.endVector();
  }
  static startFormationPosConfigVector(t, o) {
    t.startVector(1, o, 1);
  }
  static endMonsterFormation(t) {
    return t.endObject();
  }
  static createMonsterFormation(t, o) {
    return (
      MonsterFormation.startMonsterFormation(t),
      MonsterFormation.addFormationPosConfig(t, o),
      MonsterFormation.endMonsterFormation(t)
    );
  }
}
exports.MonsterFormation = MonsterFormation;
//# sourceMappingURL=monster-formation.js.map
