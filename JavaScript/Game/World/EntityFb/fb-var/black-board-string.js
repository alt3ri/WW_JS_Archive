"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackBoardString = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BlackBoardString {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsBlackBoardString(t, r) {
    return (r || new BlackBoardString()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBlackBoardString(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new BlackBoardString()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  key(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  value(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  static startBlackBoardString(t) {
    t.startObject(3);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addKey(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addValue(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endBlackBoardString(t) {
    return t.endObject();
  }
  static createBlackBoardString(t, r, a, i) {
    return (
      BlackBoardString.startBlackBoardString(t),
      BlackBoardString.addType(t, r),
      BlackBoardString.addKey(t, a),
      BlackBoardString.addValue(t, i),
      BlackBoardString.endBlackBoardString(t)
    );
  }
}
exports.BlackBoardString = BlackBoardString;
//# sourceMappingURL=black-board-string.js.map
