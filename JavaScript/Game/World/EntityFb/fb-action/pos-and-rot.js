"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PosAndRot = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PosAndRot {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsPosAndRot(t, s) {
    return (s || new PosAndRot()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPosAndRot(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new PosAndRot()).__init(t.readInt32(t.position()) + t.position(), t)
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
  roll() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  pitch() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startPosAndRot(t) {
    t.startObject(6);
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
  static addRoll(t, s) {
    t.addFieldFloat32(4, s, 0);
  }
  static addPitch(t, s) {
    t.addFieldFloat32(5, s, 0);
  }
  static endPosAndRot(t) {
    return t.endObject();
  }
  static createPosAndRot(t, s, i, o, r, e, n) {
    return (
      PosAndRot.startPosAndRot(t),
      PosAndRot.addX(t, s),
      PosAndRot.addY(t, i),
      PosAndRot.addZ(t, o),
      PosAndRot.addA(t, r),
      PosAndRot.addRoll(t, e),
      PosAndRot.addPitch(t, n),
      PosAndRot.endPosAndRot(t)
    );
  }
}
exports.PosAndRot = PosAndRot;
//# sourceMappingURL=pos-and-rot.js.map
