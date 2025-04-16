"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CipherGameplay = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CipherGameplay {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCipherGameplay(e, t) {
    return (t || new CipherGameplay()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCipherGameplay(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CipherGameplay()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  cipherId(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startCipherGameplay(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCipherId(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endCipherGameplay(e) {
    return e.endObject();
  }
  static createCipherGameplay(e, t, i) {
    return (
      CipherGameplay.startCipherGameplay(e),
      CipherGameplay.addType(e, t),
      CipherGameplay.addCipherId(e, i),
      CipherGameplay.endCipherGameplay(e)
    );
  }
}
exports.CipherGameplay = CipherGameplay;
//# sourceMappingURL=cipher-gameplay.js.map
