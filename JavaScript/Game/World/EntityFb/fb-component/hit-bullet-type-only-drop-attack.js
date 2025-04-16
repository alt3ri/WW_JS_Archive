"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HitBulletTypeOnlyDropAttack = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitBulletTypeOnlyDropAttack {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHitBulletTypeOnlyDropAttack(t, e) {
    return (e || new HitBulletTypeOnlyDropAttack()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHitBulletTypeOnlyDropAttack(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HitBulletTypeOnlyDropAttack()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startHitBulletTypeOnlyDropAttack(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endHitBulletTypeOnlyDropAttack(t) {
    return t.endObject();
  }
  static createHitBulletTypeOnlyDropAttack(t, e) {
    return (
      HitBulletTypeOnlyDropAttack.startHitBulletTypeOnlyDropAttack(t),
      HitBulletTypeOnlyDropAttack.addType(t, e),
      HitBulletTypeOnlyDropAttack.endHitBulletTypeOnlyDropAttack(t)
    );
  }
}
exports.HitBulletTypeOnlyDropAttack = HitBulletTypeOnlyDropAttack;
//# sourceMappingURL=hit-bullet-type-only-drop-attack.js.map
