"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckTargetEntity = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_entity_js_1 = require("../fb-condition/union-target-entity.js");
class CheckTargetEntity {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckTargetEntity(t, e) {
    return (e || new CheckTargetEntity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckTargetEntity(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckTargetEntity()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  targetEntityType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_entity_js_1.UnionTargetEntity.NONE;
  }
  targetEntity(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startCheckTargetEntity(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetEntityType(t, e) {
    t.addFieldInt8(1, e, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTargetEntity(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endCheckTargetEntity(t) {
    return t.endObject();
  }
  static createCheckTargetEntity(t, e, i, r) {
    return (
      CheckTargetEntity.startCheckTargetEntity(t),
      CheckTargetEntity.addType(t, e),
      CheckTargetEntity.addTargetEntityType(t, i),
      CheckTargetEntity.addTargetEntity(t, r),
      CheckTargetEntity.endCheckTargetEntity(t)
    );
  }
}
exports.CheckTargetEntity = CheckTargetEntity;
//# sourceMappingURL=check-target-entity.js.map
