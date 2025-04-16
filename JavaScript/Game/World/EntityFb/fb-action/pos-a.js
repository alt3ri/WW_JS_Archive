"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PosA = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PosA {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsPosA(t, s) {
    return (s || new PosA()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPosA(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new PosA()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  x() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  y() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  z() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  a() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startPosA(t) {
    t.startObject(4);
  }
  static addX(t, s) {
    t.addFieldFloat32(0, s, 0);
  }
  static addY(t, s) {
    t.addFieldFloat32(1, s, 0);
  }
  static addZ(t, s) {
    t.addFieldFloat32(2, s, 0);
  }
  static addA(t, s) {
    t.addFieldFloat32(3, s, 0);
  }
  static endPosA(t) {
    return t.endObject();
  }
  static createPosA(t, s, i, r, e) {
    return (
      PosA.startPosA(t),
      PosA.addX(t, s),
      PosA.addY(t, i),
      PosA.addZ(t, r),
      PosA.addA(t, e),
      PosA.endPosA(t)
    );
  }
}
exports.PosA = PosA;
//# sourceMappingURL=pos-a.js.map
