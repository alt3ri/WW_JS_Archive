"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PassiveSkill = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PassiveSkill {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SkillDesc() {
    return this.skilldesc();
  }
  get CDTime() {
    return this.cdtime();
  }
  get CdThreshold() {
    return this.cdthreshold();
  }
  get ShareGroupId() {
    return this.sharegroupid();
  }
  get MaxCount() {
    return this.maxcount();
  }
  get IsShareAllCdSkill() {
    return this.isshareallcdskill();
  }
  get IsDefaultActivated() {
    return this.isdefaultactivated();
  }
  get TriggerType() {
    return this.triggertype();
  }
  get TriggerPreset() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.triggerpresetLength(),
      this.triggerpreset,
      this,
    );
  }
  get TriggerParams() {
    return this.triggerparams();
  }
  get TriggerFormula() {
    return this.triggerformula();
  }
  get SubSkillAction() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.subskillactionLength(),
      this.subskillaction,
      this,
    );
  }
  get InstigatorType() {
    return this.instigatortype();
  }
  get SkillAction() {
    return this.skillaction();
  }
  get SkillActionParams() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.skillactionparamsLength(),
      this.skillactionparams,
      this,
    );
  }
  get ActionScriptParams() {
    return this.actionscriptparams();
  }
  get SkillActionScript() {
    return this.skillactionscript();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsPassiveSkill(t, i) {
    return (i || new PassiveSkill()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readFloat64(this.z7 + t) : 0;
  }
  skilldesc(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  cdtime() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  cdthreshold() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readFloat32(this.z7 + t) : -1;
  }
  sharegroupid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxcount() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  isshareallcdskill() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isdefaultactivated() {
    var t = this.J7.__offset(this.z7, 18);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  triggertype(t) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetTriggerpresetAt(t) {
    return this.triggerpreset(t);
  }
  triggerpreset(t, i) {
    var s = this.J7.__offset(this.z7, 22),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  triggerpresetLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  triggerparams(t) {
    var i = this.J7.__offset(this.z7, 24),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  triggerformula(t) {
    var i = this.J7.__offset(this.z7, 26),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetSubskillactionAt(t) {
    return this.subskillaction(t);
  }
  subskillaction(t) {
    var i = this.J7.__offset(this.z7, 28);
    return i ? this.J7.readFloat64(this.J7.__vector(this.z7 + i) + 8 * t) : 0;
  }
  subskillactionLength() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  subskillactionArray() {
    var t = this.J7.__offset(this.z7, 28);
    return t
      ? new Float64Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  instigatortype(t) {
    var i = this.J7.__offset(this.z7, 30),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  skillaction(t) {
    var i = this.J7.__offset(this.z7, 32),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetSkillactionparamsAt(t) {
    return this.skillactionparams(t);
  }
  skillactionparams(t, i) {
    var s = this.J7.__offset(this.z7, 34),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  skillactionparamsLength() {
    var t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  actionscriptparams(t) {
    var i = this.J7.__offset(this.z7, 36),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  skillactionscript(t) {
    var i = this.J7.__offset(this.z7, 38),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.PassiveSkill = PassiveSkill;
//# sourceMappingURL=PassiveSkill.js.map
