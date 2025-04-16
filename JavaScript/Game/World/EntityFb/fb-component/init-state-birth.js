"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InitStateBirth = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InitStateBirth {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsInitStateBirth(t, i) {
    return (i || new InitStateBirth()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInitStateBirth(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new InitStateBirth()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  birthTag(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startInitStateBirth(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addBirthTag(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endInitStateBirth(t) {
    return t.endObject();
  }
  static createInitStateBirth(t, i, e) {
    return (
      InitStateBirth.startInitStateBirth(t),
      InitStateBirth.addType(t, i),
      InitStateBirth.addBirthTag(t, e),
      InitStateBirth.endInitStateBirth(t)
    );
  }
}
exports.InitStateBirth = InitStateBirth;
//# sourceMappingURL=init-state-birth.js.map
