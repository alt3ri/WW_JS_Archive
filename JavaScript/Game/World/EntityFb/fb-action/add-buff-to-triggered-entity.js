"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddBuffToTriggeredEntity = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AddBuffToTriggeredEntity {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsAddBuffToTriggeredEntity(t, e) {
    return (e || new AddBuffToTriggeredEntity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAddBuffToTriggeredEntity(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new AddBuffToTriggeredEntity()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  buffIds(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? this.bb.readInt64(this.bb.__vector(this.bb_pos + e) + 8 * t)
      : BigInt(0);
  }
  buffIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startAddBuffToTriggeredEntity(t) {
    t.startObject(1);
  }
  static addBuffIds(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createBuffIdsVector(e, r) {
    e.startVector(8, r.length, 8);
    for (let t = r.length - 1; 0 <= t; t--) e.addInt64(r[t]);
    return e.endVector();
  }
  static startBuffIdsVector(t, e) {
    t.startVector(8, e, 8);
  }
  static endAddBuffToTriggeredEntity(t) {
    return t.endObject();
  }
  static createAddBuffToTriggeredEntity(t, e) {
    return (
      AddBuffToTriggeredEntity.startAddBuffToTriggeredEntity(t),
      AddBuffToTriggeredEntity.addBuffIds(t, e),
      AddBuffToTriggeredEntity.endAddBuffToTriggeredEntity(t)
    );
  }
}
exports.AddBuffToTriggeredEntity = AddBuffToTriggeredEntity;
//# sourceMappingURL=add-buff-to-triggered-entity.js.map
