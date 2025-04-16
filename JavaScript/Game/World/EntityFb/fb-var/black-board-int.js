"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackBoardInt = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BlackBoardInt {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBlackBoardInt(t, a) {
    return (a || new BlackBoardInt()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBlackBoardInt(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BlackBoardInt()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  key(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  value() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startBlackBoardInt(t) {
    t.startObject(3);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addKey(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static addValue(t, a) {
    t.addFieldInt32(2, a, 0);
  }
  static endBlackBoardInt(t) {
    return t.endObject();
  }
  static createBlackBoardInt(t, a, r, s) {
    return (
      BlackBoardInt.startBlackBoardInt(t),
      BlackBoardInt.addType(t, a),
      BlackBoardInt.addKey(t, r),
      BlackBoardInt.addValue(t, s),
      BlackBoardInt.endBlackBoardInt(t)
    );
  }
}
exports.BlackBoardInt = BlackBoardInt;
//# sourceMappingURL=black-board-int.js.map
