"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckCollectAnimalParts = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckCollectAnimalParts {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsCheckCollectAnimalParts(t, s) {
    return (s || new CheckCollectAnimalParts()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckCollectAnimalParts(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new CheckCollectAnimalParts()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  targetAnimal() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  checkType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  slots(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s ? this.bb.readUint8(this.bb.__vector(this.bb_pos + s) + t) : 0;
  }
  slotsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  slotsArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startCheckCollectAnimalParts(t) {
    t.startObject(4);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addTargetAnimal(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addCheckType(t, s) {
    t.addFieldInt8(2, s, 0);
  }
  static addSlots(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static createSlotsVector(s, e) {
    s.startVector(1, e.length, 1);
    for (let t = e.length - 1; 0 <= t; t--) s.addInt8(e[t]);
    return s.endVector();
  }
  static startSlotsVector(t, s) {
    t.startVector(1, s, 1);
  }
  static endCheckCollectAnimalParts(t) {
    return t.endObject();
  }
  static createCheckCollectAnimalParts(t, s, e, i, r) {
    return (
      CheckCollectAnimalParts.startCheckCollectAnimalParts(t),
      CheckCollectAnimalParts.addType(t, s),
      CheckCollectAnimalParts.addTargetAnimal(t, e),
      CheckCollectAnimalParts.addCheckType(t, i),
      CheckCollectAnimalParts.addSlots(t, r),
      CheckCollectAnimalParts.endCheckCollectAnimalParts(t)
    );
  }
}
exports.CheckCollectAnimalParts = CheckCollectAnimalParts;
//# sourceMappingURL=check-collect-animal-parts.js.map
