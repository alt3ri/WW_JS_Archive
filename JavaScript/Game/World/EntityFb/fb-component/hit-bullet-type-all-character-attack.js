"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HitBulletTypeAllCharacterAttack = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitBulletTypeAllCharacterAttack {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHitBulletTypeAllCharacterAttack(t, e) {
    return (e || new HitBulletTypeAllCharacterAttack()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHitBulletTypeAllCharacterAttack(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HitBulletTypeAllCharacterAttack()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startHitBulletTypeAllCharacterAttack(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endHitBulletTypeAllCharacterAttack(t) {
    return t.endObject();
  }
  static createHitBulletTypeAllCharacterAttack(t, e) {
    return (
      HitBulletTypeAllCharacterAttack.startHitBulletTypeAllCharacterAttack(t),
      HitBulletTypeAllCharacterAttack.addType(t, e),
      HitBulletTypeAllCharacterAttack.endHitBulletTypeAllCharacterAttack(t)
    );
  }
}
exports.HitBulletTypeAllCharacterAttack = HitBulletTypeAllCharacterAttack;
//# sourceMappingURL=hit-bullet-type-all-character-attack.js.map
