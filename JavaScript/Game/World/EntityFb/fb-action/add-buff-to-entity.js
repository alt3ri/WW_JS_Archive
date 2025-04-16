"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddBuffToEntity = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AddBuffToEntity {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsAddBuffToEntity(t, s) {
    return (s || new AddBuffToEntity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAddBuffToEntity(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new AddBuffToEntity()).__init(
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
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.readInt32(this.bb.__vector(this.bb_pos + s) + 4 * t) : 0;
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
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? this.bb.readInt64(this.bb.__vector(this.bb_pos + s) + 8 * t)
      : BigInt(0);
  }
  buffIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  persistOnOfflineBuffIds(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? this.bb.readInt64(this.bb.__vector(this.bb_pos + s) + 8 * t)
      : BigInt(0);
  }
  persistOnOfflineBuffIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startAddBuffToEntity(t) {
    t.startObject(4);
  }
  static addEntityId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addEntityIds(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createEntityIdsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) s.addInt32(i[t]);
    return s.endVector();
  }
  static startEntityIdsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addBuffIds(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static createBuffIdsVector(s, i) {
    s.startVector(8, i.length, 8);
    for (let t = i.length - 1; 0 <= t; t--) s.addInt64(i[t]);
    return s.endVector();
  }
  static startBuffIdsVector(t, s) {
    t.startVector(8, s, 8);
  }
  static addPersistOnOfflineBuffIds(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static createPersistOnOfflineBuffIdsVector(s, i) {
    s.startVector(8, i.length, 8);
    for (let t = i.length - 1; 0 <= t; t--) s.addInt64(i[t]);
    return s.endVector();
  }
  static startPersistOnOfflineBuffIdsVector(t, s) {
    t.startVector(8, s, 8);
  }
  static endAddBuffToEntity(t) {
    return t.endObject();
  }
  static createAddBuffToEntity(t, s, i, r, f) {
    return (
      AddBuffToEntity.startAddBuffToEntity(t),
      AddBuffToEntity.addEntityId(t, s),
      AddBuffToEntity.addEntityIds(t, i),
      AddBuffToEntity.addBuffIds(t, r),
      AddBuffToEntity.addPersistOnOfflineBuffIds(t, f),
      AddBuffToEntity.endAddBuffToEntity(t)
    );
  }
}
exports.AddBuffToEntity = AddBuffToEntity;
//# sourceMappingURL=add-buff-to-entity.js.map
