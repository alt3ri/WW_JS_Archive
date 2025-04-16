"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackBoardBoolean = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BlackBoardBoolean {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(a, t) {
    return (this.bb_pos = a), (this.bb = t), this;
  }
  static getRootAsBlackBoardBoolean(a, t) {
    return (t || new BlackBoardBoolean()).__init(
      a.readInt32(a.position()) + a.position(),
      a,
    );
  }
  static getSizePrefixedRootAsBlackBoardBoolean(a, t) {
    return (
      a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new BlackBoardBoolean()).__init(
        a.readInt32(a.position()) + a.position(),
        a,
      )
    );
  }
  type(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, a) : void 0;
  }
  key(a) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, a) : void 0;
  }
  value() {
    var a = this.bb.__offset(this.bb_pos, 8);
    return !!a && !!this.bb.readInt8(this.bb_pos + a);
  }
  static startBlackBoardBoolean(a) {
    a.startObject(3);
  }
  static addType(a, t) {
    a.addFieldOffset(0, t, 0);
  }
  static addKey(a, t) {
    a.addFieldOffset(1, t, 0);
  }
  static addValue(a, t) {
    a.addFieldInt8(2, +t, 0);
  }
  static endBlackBoardBoolean(a) {
    return a.endObject();
  }
  static createBlackBoardBoolean(a, t, o, e) {
    return (
      BlackBoardBoolean.startBlackBoardBoolean(a),
      BlackBoardBoolean.addType(a, t),
      BlackBoardBoolean.addKey(a, o),
      BlackBoardBoolean.addValue(a, e),
      BlackBoardBoolean.endBlackBoardBoolean(a)
    );
  }
}
exports.BlackBoardBoolean = BlackBoardBoolean;
//# sourceMappingURL=black-board-boolean.js.map
