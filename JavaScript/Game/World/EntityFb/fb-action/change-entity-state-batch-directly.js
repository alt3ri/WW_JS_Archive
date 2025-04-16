"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeEntityStateBatchDirectly = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeEntityStateBatchDirectly {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeEntityStateBatchDirectly(t, e) {
    return (e || new ChangeEntityStateBatchDirectly()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeEntityStateBatchDirectly(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeEntityStateBatchDirectly()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  entityIds(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  delayChange() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startChangeEntityStateBatchDirectly(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addEntityIds(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createEntityIdsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt32(i[t]);
    return e.endVector();
  }
  static startEntityIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addState(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addDelayChange(t, e) {
    t.addFieldInt8(4, +e, 0);
  }
  static endChangeEntityStateBatchDirectly(t) {
    return t.endObject();
  }
  static createChangeEntityStateBatchDirectly(t, e, i, a, s, h) {
    return (
      ChangeEntityStateBatchDirectly.startChangeEntityStateBatchDirectly(t),
      ChangeEntityStateBatchDirectly.addType(t, e),
      ChangeEntityStateBatchDirectly.addEntityId(t, i),
      ChangeEntityStateBatchDirectly.addEntityIds(t, a),
      ChangeEntityStateBatchDirectly.addState(t, s),
      ChangeEntityStateBatchDirectly.addDelayChange(t, h),
      ChangeEntityStateBatchDirectly.endChangeEntityStateBatchDirectly(t)
    );
  }
}
exports.ChangeEntityStateBatchDirectly = ChangeEntityStateBatchDirectly;
//# sourceMappingURL=change-entity-state-batch-directly.js.map
