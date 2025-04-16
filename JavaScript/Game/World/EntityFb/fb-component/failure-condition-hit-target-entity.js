"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FailureConditionHitTargetEntity = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FailureConditionHitTargetEntity {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsFailureConditionHitTargetEntity(t, i) {
    return (i || new FailureConditionHitTargetEntity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFailureConditionHitTargetEntity(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FailureConditionHitTargetEntity()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  entityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startFailureConditionHitTargetEntity(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createEntityIdsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) i.addInt32(r[t]);
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endFailureConditionHitTargetEntity(t) {
    return t.endObject();
  }
  static createFailureConditionHitTargetEntity(t, i, r) {
    return (
      FailureConditionHitTargetEntity.startFailureConditionHitTargetEntity(t),
      FailureConditionHitTargetEntity.addType(t, i),
      FailureConditionHitTargetEntity.addEntityIds(t, r),
      FailureConditionHitTargetEntity.endFailureConditionHitTargetEntity(t)
    );
  }
}
exports.FailureConditionHitTargetEntity = FailureConditionHitTargetEntity;
//# sourceMappingURL=failure-condition-hit-target-entity.js.map
