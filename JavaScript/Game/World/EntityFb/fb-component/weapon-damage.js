"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponDamage = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class WeaponDamage {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(a, t) {
    return (this.bb_pos = a), (this.bb = t), this;
  }
  static getRootAsWeaponDamage(a, t) {
    return (t || new WeaponDamage()).__init(
      a.readInt32(a.position()) + a.position(),
      a,
    );
  }
  static getSizePrefixedRootAsWeaponDamage(a, t) {
    return (
      a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new WeaponDamage()).__init(
        a.readInt32(a.position()) + a.position(),
        a,
      )
    );
  }
  defaultValue() {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.readInt32(this.bb_pos + a) : 0;
  }
  greatSword() {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.readInt32(this.bb_pos + a) : 0;
  }
  dagger() {
    var a = this.bb.__offset(this.bb_pos, 8);
    return a ? this.bb.readInt32(this.bb_pos + a) : 0;
  }
  pistol() {
    var a = this.bb.__offset(this.bb_pos, 10);
    return a ? this.bb.readInt32(this.bb_pos + a) : 0;
  }
  pugilism() {
    var a = this.bb.__offset(this.bb_pos, 12);
    return a ? this.bb.readInt32(this.bb_pos + a) : 0;
  }
  ring() {
    var a = this.bb.__offset(this.bb_pos, 14);
    return a ? this.bb.readInt32(this.bb_pos + a) : 0;
  }
  static startWeaponDamage(a) {
    a.startObject(6);
  }
  static addDefaultValue(a, t) {
    a.addFieldInt32(0, t, 0);
  }
  static addGreatSword(a, t) {
    a.addFieldInt32(1, t, 0);
  }
  static addDagger(a, t) {
    a.addFieldInt32(2, t, 0);
  }
  static addPistol(a, t) {
    a.addFieldInt32(3, t, 0);
  }
  static addPugilism(a, t) {
    a.addFieldInt32(4, t, 0);
  }
  static addRing(a, t) {
    a.addFieldInt32(5, t, 0);
  }
  static endWeaponDamage(a) {
    return a.endObject();
  }
  static createWeaponDamage(a, t, e, s, i, r, n) {
    return (
      WeaponDamage.startWeaponDamage(a),
      WeaponDamage.addDefaultValue(a, t),
      WeaponDamage.addGreatSword(a, e),
      WeaponDamage.addDagger(a, s),
      WeaponDamage.addPistol(a, i),
      WeaponDamage.addPugilism(a, r),
      WeaponDamage.addRing(a, n),
      WeaponDamage.endWeaponDamage(a)
    );
  }
}
exports.WeaponDamage = WeaponDamage;
//# sourceMappingURL=weapon-damage.js.map
