"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RemoveBuffFromEntity = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RemoveBuffFromEntity {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsRemoveBuffFromEntity(t, e) {
    return (e || new RemoveBuffFromEntity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRemoveBuffFromEntity(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new RemoveBuffFromEntity()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  entityIds(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
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
  buffIds(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? this.bb.readInt64(this.bb.__vector(this.bb_pos + e) + 8 * t)
      : BigInt(0);
  }
  buffIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startRemoveBuffFromEntity(t) {
    t.startObject(3);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addEntityIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createEntityIdsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt32(i[t]);
    return e.endVector();
  }
  static startEntityIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addBuffIds(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createBuffIdsVector(e, i) {
    e.startVector(8, i.length, 8);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt64(i[t]);
    return e.endVector();
  }
  static startBuffIdsVector(t, e) {
    t.startVector(8, e, 8);
  }
  static endRemoveBuffFromEntity(t) {
    return t.endObject();
  }
  static createRemoveBuffFromEntity(t, e, i, s) {
    return (
      RemoveBuffFromEntity.startRemoveBuffFromEntity(t),
      RemoveBuffFromEntity.addEntityId(t, e),
      RemoveBuffFromEntity.addEntityIds(t, i),
      RemoveBuffFromEntity.addBuffIds(t, s),
      RemoveBuffFromEntity.endRemoveBuffFromEntity(t)
    );
  }
}
exports.RemoveBuffFromEntity = RemoveBuffFromEntity;
//# sourceMappingURL=remove-buff-from-entity.js.map
