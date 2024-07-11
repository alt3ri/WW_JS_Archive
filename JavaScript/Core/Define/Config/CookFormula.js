"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookFormula = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const OneItemConfig_1 = require("./SubType/OneItemConfig");
class CookFormula {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get FormulaItemId() {
    return this.formulaitemid();
  }
  get FoodItemId() {
    return this.fooditemid();
  }
  get TypeId() {
    return this.typeid();
  }
  get Unlock() {
    return this.unlock();
  }
  get Name() {
    return this.name();
  }
  get ConsumeItems() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.consumeitemsLength(),
      (t) => this.consumeitems(t),
    );
  }
  get Proficiency() {
    return this.proficiency();
  }
  get MaxProficiencyCount() {
    return this.maxproficiencycount();
  }
  get FoodContent() {
    return this.foodcontent();
  }
  get FoodBackground() {
    return this.foodbackground();
  }
  get RoleList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rolelistLength(), (t) =>
      this.rolelist(t),
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsCookFormula(t, i) {
    return (i || new CookFormula()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  formulaitemid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  fooditemid() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  typeid() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlock() {
    const t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  name(t) {
    const i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetConsumeitemsAt(t, i) {
    return this.consumeitems(t);
  }
  consumeitems(t, i) {
    const s = this.J7.__offset(this.z7, 16);
    return s
      ? (i || new OneItemConfig_1.OneItemConfig()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  consumeitemsLength() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  proficiency() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxproficiencycount() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  foodcontent(t) {
    const i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  foodbackground(t) {
    const i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetRolelistAt(t) {
    return this.rolelist(t);
  }
  rolelist(t) {
    const i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  rolelistLength() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  rolelistArray() {
    const t = this.J7.__offset(this.z7, 26);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.CookFormula = CookFormula;
// # sourceMappingURL=CookFormula.js.map
