"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillDamage = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SkillDamage {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsSkillDamage(t, a) {
    return (a || new SkillDamage()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSkillDamage(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new SkillDamage()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  defaultValue() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  normalAttack() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  accumulatorAttack() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  superSkill() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  qteAttack() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  normalSkill() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  fightVersion() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  exploreVersion() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startSkillDamage(t) {
    t.startObject(8);
  }
  static addDefaultValue(t, a) {
    t.addFieldInt32(0, a, 0);
  }
  static addNormalAttack(t, a) {
    t.addFieldInt32(1, a, 0);
  }
  static addAccumulatorAttack(t, a) {
    t.addFieldInt32(2, a, 0);
  }
  static addSuperSkill(t, a) {
    t.addFieldInt32(3, a, 0);
  }
  static addQteAttack(t, a) {
    t.addFieldInt32(4, a, 0);
  }
  static addNormalSkill(t, a) {
    t.addFieldInt32(5, a, 0);
  }
  static addFightVersion(t, a) {
    t.addFieldInt32(6, a, 0);
  }
  static addExploreVersion(t, a) {
    t.addFieldInt32(7, a, 0);
  }
  static endSkillDamage(t) {
    return t.endObject();
  }
  static createSkillDamage(t, a, i, s, e, l, r, h, u) {
    return (
      SkillDamage.startSkillDamage(t),
      SkillDamage.addDefaultValue(t, a),
      SkillDamage.addNormalAttack(t, i),
      SkillDamage.addAccumulatorAttack(t, s),
      SkillDamage.addSuperSkill(t, e),
      SkillDamage.addQteAttack(t, l),
      SkillDamage.addNormalSkill(t, r),
      SkillDamage.addFightVersion(t, h),
      SkillDamage.addExploreVersion(t, u),
      SkillDamage.endSkillDamage(t)
    );
  }
}
exports.SkillDamage = SkillDamage;
//# sourceMappingURL=skill-damage.js.map
