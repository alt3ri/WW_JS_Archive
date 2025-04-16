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
  get UpgradeCondition() {
    return this.upgradecondition();
  }
  get UpgradeSkillId() {
    return this.upgradeskillid();
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
      this.skillinfolist,
      this,
    );
  }
  get BuffList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bufflistLength(),
      this.bufflist,
      this,
    );
  }
  get DamageList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.damagelistLength(),
      this.damagelist,
      this,
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
      this.skilltaglist,
      this,
    );
  }
  get SkillDetailNum() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.skilldetailnumLength(),
      this.skilldetailnum,
      this,
    );
  }
  get SkillResumeNum() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.skillresumenumLength(),
      this.skillresumenum,
      this,
    );
  }
  get MultiSkillDescribe() {
    return this.multiskilldescribe();
  }
  get MultiSkillDetailNum() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.multiskilldetailnumLength(),
      this.multiskilldetailnum,
      this,
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
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skillgroupid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skilltype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  upgradecondition() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  upgradeskillid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skillname(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  skilllevelgroupid() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  leftskilleffect() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxskilllevel() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetSkillinfolistAt(t) {
    return this.skillinfolist(t);
  }
  skillinfolist(t) {
    var i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  skillinfolistLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  skillinfolistArray() {
    var t = this.J7.__offset(this.z7, 22);
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
    var i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.readFloat64(this.J7.__vector(this.z7 + i) + 8 * t) : 0;
  }
  bufflistLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  bufflistArray() {
    var t = this.J7.__offset(this.z7, 24);
    return t
      ? new Float64Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetDamagelistAt(t) {
    return this.damagelist(t);
  }
  damagelist(t) {
    var i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.readFloat64(this.J7.__vector(this.z7 + i) + 8 * t) : 0;
  }
  damagelistLength() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  damagelistArray() {
    var t = this.J7.__offset(this.z7, 26);
    return t
      ? new Float64Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 28),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  effectskillpath(t) {
    var i = this.J7.__offset(this.z7, 30),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skilldescribe(t) {
    var i = this.J7.__offset(this.z7, 34),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  skillresume(t) {
    var i = this.J7.__offset(this.z7, 36),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetSkilltaglistAt(t) {
    return this.skilltaglist(t);
  }
  skilltaglist(t) {
    var i = this.J7.__offset(this.z7, 38);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  skilltaglistLength() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  skilltaglistArray() {
    var t = this.J7.__offset(this.z7, 38);
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
    var s = this.J7.__offset(this.z7, 40),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  skilldetailnumLength() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetSkillresumenumAt(t) {
    return this.skillresumenum(t);
  }
  skillresumenum(t, i) {
    var s = this.J7.__offset(this.z7, 42),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  skillresumenumLength() {
    var t = this.J7.__offset(this.z7, 42);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  multiskilldescribe(t) {
    var i = this.J7.__offset(this.z7, 44),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetMultiskilldetailnumAt(t) {
    return this.multiskilldetailnum(t);
  }
  multiskilldetailnum(t, i) {
    var s = this.J7.__offset(this.z7, 46),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  multiskilldetailnumLength() {
    var t = this.J7.__offset(this.z7, 46);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.Skill = Skill;
//# sourceMappingURL=Skill.js.map
