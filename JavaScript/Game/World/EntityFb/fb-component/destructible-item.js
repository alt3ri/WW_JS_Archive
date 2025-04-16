"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DestructibleItem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  aim_part_js_1 = require("../fb-component/aim-part.js"),
  durability_state_config_js_1 = require("../fb-component/durability-state-config.js"),
  durability_worn_js_1 = require("../fb-component/durability-worn.js"),
  element_damage_js_1 = require("../fb-component/element-damage.js"),
  hit_time_scale_ratio_js_1 = require("../fb-component/hit-time-scale-ratio.js"),
  skill_damage_js_1 = require("../fb-component/skill-damage.js"),
  union_hit_bullet_type_js_1 = require("../fb-component/union-hit-bullet-type.js"),
  weapon_damage_js_1 = require("../fb-component/weapon-damage.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class DestructibleItem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsDestructibleItem(t, i) {
    return (i || new DestructibleItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDestructibleItem(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new DestructibleItem()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  hitBulletType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_hit_bullet_type_js_1.UnionHitBulletType.NONE;
  }
  hitBullet(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  attackerHitTimeScaleRatio(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new hit_time_scale_ratio_js_1.HitTimeScaleRatio()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  victimHitTimeScaleRatio(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (t || new hit_time_scale_ratio_js_1.HitTimeScaleRatio()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  aimParts(t, i) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e
      ? (i || new aim_part_js_1.AimPart()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  aimPartsLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  durabilityId() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  durability() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  durabilityWorn(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    return i
      ? (t || new durability_worn_js_1.DurabilityWorn()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  durabilityStateConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    return i
      ? (t || new durability_state_config_js_1.DurabilityStateConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  hitPoint(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  destructionActions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 26);
    return e
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  destructionActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  skillDamage(t) {
    var i = this.bb.__offset(this.bb_pos, 28);
    return i
      ? (t || new skill_damage_js_1.SkillDamage()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  elementDamage(t) {
    var i = this.bb.__offset(this.bb_pos, 30);
    return i
      ? (t || new element_damage_js_1.ElementDamage()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  weaponDamage(t) {
    var i = this.bb.__offset(this.bb_pos, 32);
    return i
      ? (t || new weapon_damage_js_1.WeaponDamage()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  matchRoleOptionType(t) {
    var i = this.bb.__offset(this.bb_pos, 34);
    return i ? this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t) : 0;
  }
  matchRoleOptionTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 34);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  matchRoleOptionTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 34);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  matchRoleOption(t, i) {
    var e = this.bb.__offset(this.bb_pos, 36);
    return e
      ? this.bb.__union(i, this.bb.__vector(this.bb_pos + e) + 4 * t)
      : void 0;
  }
  matchRoleOptionLength() {
    var t = this.bb.__offset(this.bb_pos, 36);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startDestructibleItem(t) {
    t.startObject(17);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addHitBulletType(t, i) {
    t.addFieldInt8(1, i, union_hit_bullet_type_js_1.UnionHitBulletType.NONE);
  }
  static addHitBullet(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addAttackerHitTimeScaleRatio(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addVictimHitTimeScaleRatio(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addAimParts(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static createAimPartsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startAimPartsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addDurabilityId(t, i) {
    t.addFieldInt32(6, i, 0);
  }
  static addDurability(t, i) {
    t.addFieldInt32(7, i, 0);
  }
  static addDurabilityWorn(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addDurabilityStateConfig(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addHitPoint(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static addDestructionActions(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static createDestructionActionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startDestructionActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addSkillDamage(t, i) {
    t.addFieldOffset(12, i, 0);
  }
  static addElementDamage(t, i) {
    t.addFieldOffset(13, i, 0);
  }
  static addWeaponDamage(t, i) {
    t.addFieldOffset(14, i, 0);
  }
  static addMatchRoleOptionType(t, i) {
    t.addFieldOffset(15, i, 0);
  }
  static createMatchRoleOptionTypeVector(i, e) {
    i.startVector(1, e.length, 1);
    for (let t = e.length - 1; 0 <= t; t--) i.addInt8(e[t]);
    return i.endVector();
  }
  static startMatchRoleOptionTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addMatchRoleOption(t, i) {
    t.addFieldOffset(16, i, 0);
  }
  static createMatchRoleOptionVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startMatchRoleOptionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endDestructibleItem(t) {
    return t.endObject();
  }
}
exports.DestructibleItem = DestructibleItem;
//# sourceMappingURL=destructible-item.js.map
