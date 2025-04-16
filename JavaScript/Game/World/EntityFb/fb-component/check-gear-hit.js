"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckGearHit = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckGearHit {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckGearHit(t, e) {
    return (e || new CheckGearHit()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckGearHit(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckGearHit()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  hitIndex() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  affectIndex(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  affectIndexLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  affectIndexArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  affectType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startCheckGearHit(t) {
    t.startObject(3);
  }
  static addHitIndex(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addAffectIndex(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createAffectIndexVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt32(i[t]);
    return e.endVector();
  }
  static startAffectIndexVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addAffectType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endCheckGearHit(t) {
    return t.endObject();
  }
  static createCheckGearHit(t, e, i, r) {
    return (
      CheckGearHit.startCheckGearHit(t),
      CheckGearHit.addHitIndex(t, e),
      CheckGearHit.addAffectIndex(t, i),
      CheckGearHit.addAffectType(t, r),
      CheckGearHit.endCheckGearHit(t)
    );
  }
}
exports.CheckGearHit = CheckGearHit;
//# sourceMappingURL=check-gear-hit.js.map
