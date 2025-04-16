"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HitBulletTypeFixedBulletId = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitBulletTypeFixedBulletId {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHitBulletTypeFixedBulletId(t, e) {
    return (e || new HitBulletTypeFixedBulletId()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHitBulletTypeFixedBulletId(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HitBulletTypeFixedBulletId()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  bulletId(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readInt64(this.bb.__vector(this.bb_pos + e) + 8 * t)
      : BigInt(0);
  }
  bulletIdLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  playerAttack() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startHitBulletTypeFixedBulletId(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBulletId(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createBulletIdVector(e, l) {
    e.startVector(8, l.length, 8);
    for (let t = l.length - 1; 0 <= t; t--) e.addInt64(l[t]);
    return e.endVector();
  }
  static startBulletIdVector(t, e) {
    t.startVector(8, e, 8);
  }
  static addPlayerAttack(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endHitBulletTypeFixedBulletId(t) {
    return t.endObject();
  }
  static createHitBulletTypeFixedBulletId(t, e, l, i) {
    return (
      HitBulletTypeFixedBulletId.startHitBulletTypeFixedBulletId(t),
      HitBulletTypeFixedBulletId.addType(t, e),
      HitBulletTypeFixedBulletId.addBulletId(t, l),
      HitBulletTypeFixedBulletId.addPlayerAttack(t, i),
      HitBulletTypeFixedBulletId.endHitBulletTypeFixedBulletId(t)
    );
  }
}
exports.HitBulletTypeFixedBulletId = HitBulletTypeFixedBulletId;
//# sourceMappingURL=hit-bullet-type-fixed-bullet-id.js.map
