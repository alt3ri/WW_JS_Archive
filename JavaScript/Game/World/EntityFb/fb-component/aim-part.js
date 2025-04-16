"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AimPart = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class AimPart {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsAimPart(t, i) {
    return (i || new AimPart()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAimPart(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new AimPart()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  boneName(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  offset(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  radiusIn() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  radiusOut() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  radiusOutOnStart() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  mobileCorrect() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  gamePadCorrect() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startAimPart(t) {
    t.startObject(7);
  }
  static addBoneName(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addOffset(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addRadiusIn(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addRadiusOut(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static addRadiusOutOnStart(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static addMobileCorrect(t, i) {
    t.addFieldFloat32(5, i, 0);
  }
  static addGamePadCorrect(t, i) {
    t.addFieldFloat32(6, i, 0);
  }
  static endAimPart(t) {
    return t.endObject();
  }
}
exports.AimPart = AimPart;
//# sourceMappingURL=aim-part.js.map
