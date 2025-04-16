"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DirectionFill = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DirectionFill {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsDirectionFill(i, t) {
    return (t || new DirectionFill()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsDirectionFill(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new DirectionFill()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  w() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  s() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  a() {
    var i = this.bb.__offset(this.bb_pos, 10);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  d() {
    var i = this.bb.__offset(this.bb_pos, 12);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startDirectionFill(i) {
    i.startObject(5);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addW(i, t) {
    i.addFieldInt8(1, +t, 0);
  }
  static addS(i, t) {
    i.addFieldInt8(2, +t, 0);
  }
  static addA(i, t) {
    i.addFieldInt8(3, +t, 0);
  }
  static addD(i, t) {
    i.addFieldInt8(4, +t, 0);
  }
  static endDirectionFill(i) {
    return i.endObject();
  }
  static createDirectionFill(i, t, r, s, e, l) {
    return (
      DirectionFill.startDirectionFill(i),
      DirectionFill.addType(i, t),
      DirectionFill.addW(i, r),
      DirectionFill.addS(i, s),
      DirectionFill.addA(i, e),
      DirectionFill.addD(i, l),
      DirectionFill.endDirectionFill(i)
    );
  }
}
exports.DirectionFill = DirectionFill;
//# sourceMappingURL=direction-fill.js.map
