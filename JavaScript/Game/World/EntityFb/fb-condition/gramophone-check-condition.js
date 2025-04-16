"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GramophoneCheckCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GramophoneCheckCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsGramophoneCheckCondition(t, i) {
    return (i || new GramophoneCheckCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGramophoneCheckCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new GramophoneCheckCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  checkType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  playList(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  playListLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  playListArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startGramophoneCheckCondition(t) {
    t.startObject(2);
  }
  static addCheckType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addPlayList(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createPlayListVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addInt32(e[t]);
    return i.endVector();
  }
  static startPlayListVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endGramophoneCheckCondition(t) {
    return t.endObject();
  }
  static createGramophoneCheckCondition(t, i, e) {
    return (
      GramophoneCheckCondition.startGramophoneCheckCondition(t),
      GramophoneCheckCondition.addCheckType(t, i),
      GramophoneCheckCondition.addPlayList(t, e),
      GramophoneCheckCondition.endGramophoneCheckCondition(t)
    );
  }
}
exports.GramophoneCheckCondition = GramophoneCheckCondition;
//# sourceMappingURL=gramophone-check-condition.js.map
