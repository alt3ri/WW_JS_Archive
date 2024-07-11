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
      (t) => this.triggerpreset(t),
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
      (t) => this.subskillaction(t),
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
      (t) => this.skillactionparams(t),
    );
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
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt64(this.z7 + t) : BigInt("0");
  }
  skilldesc(t) {
    const i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  cdtime() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  sharegroupid() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxcount() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  isshareallcdskill() {
    const t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isdefaultactivated() {
    const t = this.J7.__offset(this.z7, 16);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  triggertype(t) {
    const i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetTriggerpresetAt(t) {
    return this.triggerpreset(t);
  }
  triggerpreset(t, i) {
    const s = this.J7.__offset(this.z7, 20);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  triggerpresetLength() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  triggerparams(t) {
    const i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  triggerformula(t) {
    const i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetSubskillactionAt(t) {
    return this.subskillaction(t);
  }
  subskillaction(t) {
    const i = this.J7.__offset(this.z7, 26);
    return i
      ? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
      : BigInt(0);
  }
  subskillactionLength() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  instigatortype(t) {
    const i = this.J7.__offset(this.z7, 28);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  skillaction(t) {
    const i = this.J7.__offset(this.z7, 30);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetSkillactionparamsAt(t) {
    return this.skillactionparams(t);
  }
  skillactionparams(t, i) {
    const s = this.J7.__offset(this.z7, 32);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  skillactionparamsLength() {
    const t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.PassiveSkill = PassiveSkill;
// # sourceMappingURL=PassiveSkill.js.map
