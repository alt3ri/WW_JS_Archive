"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttributeComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_fight_musics_switch_type_js_1 = require("../fb-component/union-fight-musics-switch-type.js"),
  union_world_level_bonus_js_1 = require("../fb-component/union-world-level-bonus.js");
class AttributeComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsAttributeComponent(t, e) {
    return (e || new AttributeComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAttributeComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new AttributeComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  propertyId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  monsterPropExtraRateId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  monsterPropGrowthId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  level() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  moraleLevel() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  rageModeId() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  hardnessModeId() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  worldLevelBonusId() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  fightMusicsType() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_fight_musics_switch_type_js_1.UnionFightMusicsSwitchType.NONE;
  }
  fightMusics(t) {
    var e = this.bb.__offset(this.bb_pos, 24);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  fightMusic(t) {
    var e = this.bb.__offset(this.bb_pos, 26);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  appendBuffIds(t) {
    var e = this.bb.__offset(this.bb_pos, 28);
    return e
      ? this.bb.readInt64(this.bb.__vector(this.bb_pos + e) + 8 * t)
      : BigInt(0);
  }
  appendBuffIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 28);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  worldLevelBonusTypeType() {
    var t = this.bb.__offset(this.bb_pos, 30);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_world_level_bonus_js_1.UnionWorldLevelBonus.NONE;
  }
  worldLevelBonusType(t) {
    var e = this.bb.__offset(this.bb_pos, 32);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startAttributeComponent(t) {
    t.startObject(15);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addPropertyId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addMonsterPropExtraRateId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addMonsterPropGrowthId(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addLevel(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addMoraleLevel(t, e) {
    t.addFieldInt32(5, e, 0);
  }
  static addRageModeId(t, e) {
    t.addFieldInt32(6, e, 0);
  }
  static addHardnessModeId(t, e) {
    t.addFieldInt32(7, e, 0);
  }
  static addWorldLevelBonusId(t, e) {
    t.addFieldInt32(8, e, 0);
  }
  static addFightMusicsType(t, e) {
    t.addFieldInt8(
      9,
      e,
      union_fight_musics_switch_type_js_1.UnionFightMusicsSwitchType.NONE,
    );
  }
  static addFightMusics(t, e) {
    t.addFieldOffset(10, e, 0);
  }
  static addFightMusic(t, e) {
    t.addFieldOffset(11, e, 0);
  }
  static addAppendBuffIds(t, e) {
    t.addFieldOffset(12, e, 0);
  }
  static createAppendBuffIdsVector(e, i) {
    e.startVector(8, i.length, 8);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt64(i[t]);
    return e.endVector();
  }
  static startAppendBuffIdsVector(t, e) {
    t.startVector(8, e, 8);
  }
  static addWorldLevelBonusTypeType(t, e) {
    t.addFieldInt8(
      13,
      e,
      union_world_level_bonus_js_1.UnionWorldLevelBonus.NONE,
    );
  }
  static addWorldLevelBonusType(t, e) {
    t.addFieldOffset(14, e, 0);
  }
  static endAttributeComponent(t) {
    return t.endObject();
  }
  static createAttributeComponent(
    t,
    e,
    i,
    s,
    r,
    n,
    o,
    u,
    h,
    d,
    a,
    p,
    c,
    l,
    b,
    _,
  ) {
    return (
      AttributeComponent.startAttributeComponent(t),
      AttributeComponent.addDisabled(t, e),
      AttributeComponent.addPropertyId(t, i),
      AttributeComponent.addMonsterPropExtraRateId(t, s),
      AttributeComponent.addMonsterPropGrowthId(t, r),
      AttributeComponent.addLevel(t, n),
      AttributeComponent.addMoraleLevel(t, o),
      AttributeComponent.addRageModeId(t, u),
      AttributeComponent.addHardnessModeId(t, h),
      AttributeComponent.addWorldLevelBonusId(t, d),
      AttributeComponent.addFightMusicsType(t, a),
      AttributeComponent.addFightMusics(t, p),
      AttributeComponent.addFightMusic(t, c),
      AttributeComponent.addAppendBuffIds(t, l),
      AttributeComponent.addWorldLevelBonusTypeType(t, b),
      AttributeComponent.addWorldLevelBonusType(t, _),
      AttributeComponent.endAttributeComponent(t)
    );
  }
}
exports.AttributeComponent = AttributeComponent;
//# sourceMappingURL=attribute-component.js.map
