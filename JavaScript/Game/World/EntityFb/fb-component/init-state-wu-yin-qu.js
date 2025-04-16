"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InitStateWuYinQu = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InitStateWuYinQu {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsInitStateWuYinQu(t, i) {
    return (i || new InitStateWuYinQu()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInitStateWuYinQu(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new InitStateWuYinQu()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startInitStateWuYinQu(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static endInitStateWuYinQu(t) {
    return t.endObject();
  }
  static createInitStateWuYinQu(t, i) {
    return (
      InitStateWuYinQu.startInitStateWuYinQu(t),
      InitStateWuYinQu.addType(t, i),
      InitStateWuYinQu.endInitStateWuYinQu(t)
    );
  }
}
exports.InitStateWuYinQu = InitStateWuYinQu;
//# sourceMappingURL=init-state-wu-yin-qu.js.map
