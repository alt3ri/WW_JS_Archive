"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Skill = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class Skill {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SkillGroupId() {
    return this.skillgroupid();
  }
  get SkillType() {
    return this.skilltype();
  }
  get SkillName() {
    return this.skillname();
  }
  get SkillLevelGroupId() {
    return this.skilllevelgroupid();
  }
  get LeftSkillEffect() {
    return this.leftskilleffect();
  }
  get MaxSkillLevel() {
    return this.maxskilllevel();
  }
  get SkillInfoList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.skillinfolistLength(),
      (t) => this.skillinfolist(t),
    );
  }
  get BuffList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bufflistLength(), (t) =>
      this.bufflist(t),
    );
  }
  get DamageList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.damagelistLength(), (t) =>
      this.damagelist(t),
    );
  }
  get Icon() {
    return this.icon();
  }
  get EffectSkillPath() {
    return this.effectskillpath();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get SkillDescribe() {
    return this.skilldescribe();
  }
  get SkillResume() {
    return this.skillresume();
  }
  get SkillTagList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.skilltaglistLength(),
      (t) => this.skilltaglist(t),
    );
  }
  get SkillDetailNum() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.skilldetailnumLength(),
      (t) => this.skilldetailnum(t),
    );
  }
  get MultiSkillDescribe() {
    return this.multiskilldescribe();
  }
  get MultiSkillDetailNum() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.multiskilldetailnumLength(),
      (t) => this.multiskilldetailnum(t),
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsSkill(t, i) {
    return (i || new Skill()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skillgroupid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skilltype() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skillname(t) {
    const i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  skilllevelgroupid() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  leftskilleffect() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxskilllevel() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetSkillinfolistAt(t) {
    return this.skillinfolist(t);
  }
  skillinfolist(t) {
    const i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  skillinfolistLength() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  skillinfolistArray() {
    const t = this.J7.__offset(this.z7, 18);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetBufflistAt(t) {
    return this.bufflist(t);
  }
  bufflist(t) {
    const i = this.J7.__offset(this.z7, 20);
    return i
      ? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
      : BigInt(0);
  }
  bufflistLength() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetDamagelistAt(t) {
    return this.damagelist(t);
  }
  damagelist(t) {
    const i = this.J7.__offset(this.z7, 22);
    return i
      ? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
      : BigInt(0);
  }
  damagelistLength() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  icon(t) {
    const i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  effectskillpath(t) {
    const i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  sortindex() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skilldescribe(t) {
    const i = this.J7.__offset(this.z7, 30);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  skillresume(t) {
    const i = this.J7.__offset(this.z7, 32);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetSkilltaglistAt(t) {
    return this.skilltaglist(t);
  }
  skilltaglist(t) {
    const i = this.J7.__offset(this.z7, 34);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  skilltaglistLength() {
    const t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  skilltaglistArray() {
    const t = this.J7.__offset(this.z7, 34);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetSkilldetailnumAt(t) {
    return this.skilldetailnum(t);
  }
  skilldetailnum(t, i) {
    const s = this.J7.__offset(this.z7, 36);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  skilldetailnumLength() {
    const t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  multiskilldescribe(t) {
    const i = this.J7.__offset(this.z7, 38);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetMultiskilldetailnumAt(t) {
    return this.multiskilldetailnum(t);
  }
  multiskilldetailnum(t, i) {
    const s = this.J7.__offset(this.z7, 40);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  multiskilldetailnumLength() {
    const t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.Skill = Skill;
// # sourceMappingURL=Skill.js.map
