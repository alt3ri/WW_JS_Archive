"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.IntArray = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class IntArray {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsIntArray(t, r) {
    return (r || new IntArray()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsIntArray(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new IntArray()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  values(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.readInt32(this.bb.__vector(this.bb_pos + r) + 4 * t) : 0;
  }
  valuesLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  valuesArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startIntArray(t) {
    t.startObject(1);
  }
  static addValues(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static createValuesVector(r, s) {
    r.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) r.addInt32(s[t]);
    return r.endVector();
  }
  static startValuesVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endIntArray(t) {
    return t.endObject();
  }
  static createIntArray(t, r) {
    return (
      IntArray.startIntArray(t),
      IntArray.addValues(t, r),
      IntArray.endIntArray(t)
    );
  }
}
exports.IntArray = IntArray;
//# sourceMappingURL=int-array.js.map
