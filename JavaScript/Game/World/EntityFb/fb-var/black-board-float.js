"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackBoardFloat = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BlackBoardFloat {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBlackBoardFloat(t, a) {
    return (a || new BlackBoardFloat()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBlackBoardFloat(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BlackBoardFloat()).__init(
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
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startBlackBoardFloat(t) {
    t.startObject(3);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addKey(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static addValue(t, a) {
    t.addFieldFloat32(2, a, 0);
  }
  static endBlackBoardFloat(t) {
    return t.endObject();
  }
  static createBlackBoardFloat(t, a, r, o) {
    return (
      BlackBoardFloat.startBlackBoardFloat(t),
      BlackBoardFloat.addType(t, a),
      BlackBoardFloat.addKey(t, r),
      BlackBoardFloat.addValue(t, o),
      BlackBoardFloat.endBlackBoardFloat(t)
    );
  }
}
exports.BlackBoardFloat = BlackBoardFloat;
//# sourceMappingURL=black-board-float.js.map
