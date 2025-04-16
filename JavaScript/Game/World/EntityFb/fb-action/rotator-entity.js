"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RotatorEntity = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class RotatorEntity {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsRotatorEntity(t, i) {
    return (i || new RotatorEntity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRotatorEntity(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new RotatorEntity()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_entity_js_1.UnionTargetEntity.NONE;
  }
  entity(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startRotatorEntity(t) {
    t.startObject(2);
  }
  static addEntityType(t, i) {
    t.addFieldInt8(0, i, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addEntity(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endRotatorEntity(t) {
    return t.endObject();
  }
  static createRotatorEntity(t, i, r) {
    return (
      RotatorEntity.startRotatorEntity(t),
      RotatorEntity.addEntityType(t, i),
      RotatorEntity.addEntity(t, r),
      RotatorEntity.endRotatorEntity(t)
    );
  }
}
exports.RotatorEntity = RotatorEntity;
//# sourceMappingURL=rotator-entity.js.map
