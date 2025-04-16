"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterGachaBaseComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  monster_formation_js_1 = require("../fb-component/monster-formation.js"),
  monster_gacha_slot_js_1 = require("../fb-component/monster-gacha-slot.js");
class MonsterGachaBaseComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsMonsterGachaBaseComponent(t, s) {
    return (s || new MonsterGachaBaseComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMonsterGachaBaseComponent(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new MonsterGachaBaseComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  monsterEntityIds(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.readInt32(this.bb.__vector(this.bb_pos + s) + 4 * t) : 0;
  }
  monsterEntityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  monsterEntityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  config(t, s) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (s || new monster_gacha_slot_js_1.MonsterGachaSlot()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  configLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  formation(t, s) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? (s || new monster_formation_js_1.MonsterFormation()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  formationLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startMonsterGachaBaseComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, s) {
    t.addFieldInt8(0, +s, 0);
  }
  static addMonsterEntityIds(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createMonsterEntityIdsVector(s, e) {
    s.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) s.addInt32(e[t]);
    return s.endVector();
  }
  static startMonsterEntityIdsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addConfig(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static createConfigVector(s, e) {
    s.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) s.addOffset(e[t]);
    return s.endVector();
  }
  static startConfigVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addFormation(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static createFormationVector(s, e) {
    s.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) s.addOffset(e[t]);
    return s.endVector();
  }
  static startFormationVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endMonsterGachaBaseComponent(t) {
    return t.endObject();
  }
  static createMonsterGachaBaseComponent(t, s, e, r, n) {
    return (
      MonsterGachaBaseComponent.startMonsterGachaBaseComponent(t),
      MonsterGachaBaseComponent.addDisabled(t, s),
      MonsterGachaBaseComponent.addMonsterEntityIds(t, e),
      MonsterGachaBaseComponent.addConfig(t, r),
      MonsterGachaBaseComponent.addFormation(t, n),
      MonsterGachaBaseComponent.endMonsterGachaBaseComponent(t)
    );
  }
}
exports.MonsterGachaBaseComponent = MonsterGachaBaseComponent;
//# sourceMappingURL=monster-gacha-base-component.js.map
