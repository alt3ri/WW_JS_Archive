"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InitStateDigital = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InitStateDigital {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsInitStateDigital(t, i) {
    return (i || new InitStateDigital()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInitStateDigital(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new InitStateDigital()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startInitStateDigital(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static endInitStateDigital(t) {
    return t.endObject();
  }
  static createInitStateDigital(t, i) {
    return (
      InitStateDigital.startInitStateDigital(t),
      InitStateDigital.addType(t, i),
      InitStateDigital.endInitStateDigital(t)
    );
  }
}
exports.InitStateDigital = InitStateDigital;
//# sourceMappingURL=init-state-digital.js.map
