"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RandomBatchRefresh = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RandomBatchRefresh {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsRandomBatchRefresh(t, e) {
    return (e || new RandomBatchRefresh()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRandomBatchRefresh(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new RandomBatchRefresh()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  entityBatchesType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readUint8(this.bb.__vector(this.bb_pos + e) + t) : 0;
  }
  entityBatchesTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entityBatchesTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  entityBatches(t, e) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? this.bb.__union(e, this.bb.__vector(this.bb_pos + s) + 4 * t)
      : void 0;
  }
  entityBatchesLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startRandomBatchRefresh(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityBatchesType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createEntityBatchesTypeVector(e, s) {
    e.startVector(1, s.length, 1);
    for (let t = s.length - 1; 0 <= t; t--) e.addInt8(s[t]);
    return e.endVector();
  }
  static startEntityBatchesTypeVector(t, e) {
    t.startVector(1, e, 1);
  }
  static addEntityBatches(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createEntityBatchesVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startEntityBatchesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endRandomBatchRefresh(t) {
    return t.endObject();
  }
  static createRandomBatchRefresh(t, e, s, h) {
    return (
      RandomBatchRefresh.startRandomBatchRefresh(t),
      RandomBatchRefresh.addType(t, e),
      RandomBatchRefresh.addEntityBatchesType(t, s),
      RandomBatchRefresh.addEntityBatches(t, h),
      RandomBatchRefresh.endRandomBatchRefresh(t)
    );
  }
}
exports.RandomBatchRefresh = RandomBatchRefresh;
//# sourceMappingURL=random-batch-refresh.js.map
