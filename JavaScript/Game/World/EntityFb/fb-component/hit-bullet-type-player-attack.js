"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HitBulletTypePlayerAttack = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitBulletTypePlayerAttack {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHitBulletTypePlayerAttack(t, e) {
    return (e || new HitBulletTypePlayerAttack()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHitBulletTypePlayerAttack(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HitBulletTypePlayerAttack()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startHitBulletTypePlayerAttack(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endHitBulletTypePlayerAttack(t) {
    return t.endObject();
  }
  static createHitBulletTypePlayerAttack(t, e) {
    return (
      HitBulletTypePlayerAttack.startHitBulletTypePlayerAttack(t),
      HitBulletTypePlayerAttack.addType(t, e),
      HitBulletTypePlayerAttack.endHitBulletTypePlayerAttack(t)
    );
  }
}
exports.HitBulletTypePlayerAttack = HitBulletTypePlayerAttack;
//# sourceMappingURL=hit-bullet-type-player-attack.js.map
