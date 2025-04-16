"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SummonEntity = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_summon_entity_type_js_1 = require("../fb-action/union-summon-entity-type.js");
class SummonEntity {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsSummonEntity(t, n) {
    return (n || new SummonEntity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSummonEntity(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new SummonEntity()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  summonEntityConfigType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_summon_entity_type_js_1.UnionSummonEntityType.NONE;
  }
  summonEntityConfig(t) {
    var n = this.bb.__offset(this.bb_pos, 6);
    return n ? this.bb.__union(t, this.bb_pos + n) : void 0;
  }
  static startSummonEntity(t) {
    t.startObject(2);
  }
  static addSummonEntityConfigType(t, n) {
    t.addFieldInt8(
      0,
      n,
      union_summon_entity_type_js_1.UnionSummonEntityType.NONE,
    );
  }
  static addSummonEntityConfig(t, n) {
    t.addFieldOffset(1, n, 0);
  }
  static endSummonEntity(t) {
    return t.endObject();
  }
  static createSummonEntity(t, n, i) {
    return (
      SummonEntity.startSummonEntity(t),
      SummonEntity.addSummonEntityConfigType(t, n),
      SummonEntity.addSummonEntityConfig(t, i),
      SummonEntity.endSummonEntity(t)
    );
  }
}
exports.SummonEntity = SummonEntity;
//# sourceMappingURL=summon-entity.js.map
