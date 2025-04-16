"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SynthesisFormula = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  OneItemConfig_1 = require("./SubType/OneItemConfig");
class SynthesisFormula {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get FormulaItemId() {
    return this.formulaitemid();
  }
  get ItemId() {
    return this.itemid();
  }
  get FormulaType() {
    return this.formulatype();
  }
  get ItemGroup() {
    return this.itemgroup();
  }
  get Name() {
    return this.name();
  }
  get ConsumeItems() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.consumeitemsLength(),
      this.consumeitems,
      this,
    );
  }
  get SortId() {
    return this.sortid();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get Proficiency() {
    return this.proficiency();
  }
  get MaxProficiencyCount() {
    return this.maxproficiencycount();
  }
  get TypeId() {
    return this.typeid();
  }
  get Unlock() {
    return this.unlock();
  }
  get LimitCount() {
    return this.limitcount();
  }
  get PermanentLimit() {
    return this.permanentlimit();
  }
  get RoleList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.rolelistLength(),
      this.rolelist,
      this,
    );
  }
  get ComposeContent() {
    return this.composecontent();
  }
  get ComposeBackground() {
    return this.composebackground();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsSynthesisFormula(t, i) {
    return (i || new SynthesisFormula()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  formulaitemid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  formulatype() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 3;
  }
  itemgroup() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetConsumeitemsAt(t, i) {
    return this.consumeitems(t);
  }
  consumeitems(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    return s
      ? (i || new OneItemConfig_1.OneItemConfig()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  consumeitemsLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  proficiency() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxproficiencycount() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  typeid() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlock() {
    var t = this.J7.__offset(this.z7, 28);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  limitcount() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  permanentlimit() {
    var t = this.J7.__offset(this.z7, 32);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetRolelistAt(t) {
    return this.rolelist(t);
  }
  rolelist(t) {
    var i = this.J7.__offset(this.z7, 34);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  rolelistLength() {
    var t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  rolelistArray() {
    var t = this.J7.__offset(this.z7, 34);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  composecontent(t) {
    var i = this.J7.__offset(this.z7, 36),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  composebackground(t) {
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
exports.SynthesisFormula = SynthesisFormula;
//# sourceMappingURL=SynthesisFormula.js.map
