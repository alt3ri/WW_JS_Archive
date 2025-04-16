"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MorseCode = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MorseCode {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsMorseCode(e, t) {
    return (t || new MorseCode()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsMorseCode(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new MorseCode()).__init(e.readInt32(e.position()) + e.position(), e)
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  morseCodeId(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startMorseCode(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addMorseCodeId(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endMorseCode(e) {
    return e.endObject();
  }
  static createMorseCode(e, t, s) {
    return (
      MorseCode.startMorseCode(e),
      MorseCode.addType(e, t),
      MorseCode.addMorseCodeId(e, s),
      MorseCode.endMorseCode(e)
    );
  }
}
exports.MorseCode = MorseCode;
//# sourceMappingURL=morse-code.js.map
