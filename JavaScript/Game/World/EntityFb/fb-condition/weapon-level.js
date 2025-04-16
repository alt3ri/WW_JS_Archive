"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponLevel = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_weapon_level_js_1 = require("../fb-condition/union-weapon-level.js");
class WeaponLevel {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsWeaponLevel(e, t) {
    return (t || new WeaponLevel()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsWeaponLevel(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new WeaponLevel()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  optionType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_weapon_level_js_1.UnionWeaponLevel.NONE;
  }
  option(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startWeaponLevel(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addOptionType(e, t) {
    e.addFieldInt8(1, t, union_weapon_level_js_1.UnionWeaponLevel.NONE);
  }
  static addOption(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endWeaponLevel(e) {
    return e.endObject();
  }
  static createWeaponLevel(e, t, i, n) {
    return (
      WeaponLevel.startWeaponLevel(e),
      WeaponLevel.addType(e, t),
      WeaponLevel.addOptionType(e, i),
      WeaponLevel.addOption(e, n),
      WeaponLevel.endWeaponLevel(e)
    );
  }
}
exports.WeaponLevel = WeaponLevel;
//# sourceMappingURL=weapon-level.js.map
