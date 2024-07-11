"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0,
}),
  (exports.Damage = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class Damage {
  constructor() {
    (this.j7 = null), (this.W7 = 0);
  }
  get Id() {
    return this.id();
  }
  get CalculateType() {
    return this.calculatetype();
  }
  get Element() {
    return this.element();
  }
  get DamageTextType() {
    return this.damagetexttype();
  }
  get PayloadId() {
    return this.payloadid();
  }
  get Type() {
    return this.type();
  }
  get SmashType() {
    return this.smashtype();
  }
  get CureBaseValue() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.curebasevalueLength(),
      (t) => this.curebasevalue(t),
    );
  }
  get RelatedProperty() {
    return this.relatedproperty();
  }
  get RateLv() {
    return GameUtils_1.GameUtils.ConvertToArray(this.ratelvLength(), (t) =>
      this.ratelv(t),
    );
  }
  get HardnessLv() {
    return GameUtils_1.GameUtils.ConvertToArray(this.hardnesslvLength(), (t) =>
      this.hardnesslv(t),
    );
  }
  get ToughLv() {
    return GameUtils_1.GameUtils.ConvertToArray(this.toughlvLength(), (t) =>
      this.toughlv(t),
    );
  }
  get Energy() {
    return GameUtils_1.GameUtils.ConvertToArray(this.energyLength(), (t) =>
      this.energy(t),
    );
  }
  get SpecialEnergy1() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.specialenergy1Length(),
      (t) => this.specialenergy1(t),
    );
  }
  get SpecialEnergy2() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.specialenergy2Length(),
      (t) => this.specialenergy2(t),
    );
  }
  get SpecialEnergy3() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.specialenergy3Length(),
      (t) => this.specialenergy3(t),
    );
  }
  get SpecialEnergy4() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.specialenergy4Length(),
      (t) => this.specialenergy4(t),
    );
  }
  get ElementPowerType() {
    return this.elementpowertype();
  }
  get ElementPower() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.elementpowerLength(),
      (t) => this.elementpower(t),
    );
  }
  get FormulaType() {
    return this.formulatype();
  }
  get FormulaParam1() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.formulaparam1Length(),
      (t) => this.formulaparam1(t),
    );
  }
  get FormulaParam2() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.formulaparam2Length(),
      (t) => this.formulaparam2(t),
    );
  }
  get FormulaParam3() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.formulaparam3Length(),
      (t) => this.formulaparam3(t),
    );
  }
  get FormulaParam4() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.formulaparam4Length(),
      (t) => this.formulaparam4(t),
    );
  }
  get FormulaParam5() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.formulaparam5Length(),
      (t) => this.formulaparam5(t),
    );
  }
  get FormulaParam6() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.formulaparam6Length(),
      (t) => this.formulaparam6(t),
    );
  }
  get FormulaParam7() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.formulaparam7Length(),
      (t) => this.formulaparam7(t),
    );
  }
  get FormulaParam8() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.formulaparam8Length(),
      (t) => this.formulaparam8(t),
    );
  }
  get FormulaParam9() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.formulaparam9Length(),
      (t) => this.formulaparam9(t),
    );
  }
  get FormulaParam10() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.formulaparam10Length(),
      (t) => this.formulaparam10(t),
    );
  }
  get ImmuneType() {
    return this.immunetype();
  }
  get Percent0() {
    return GameUtils_1.GameUtils.ConvertToArray(this.percent0Length(), (t) =>
      this.percent0(t),
    );
  }
  get Percent1() {
    return GameUtils_1.GameUtils.ConvertToArray(this.percent1Length(), (t) =>
      this.percent1(t),
    );
  }
  get FluctuationLower() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.fluctuationlowerLength(),
      (t) => this.fluctuationlower(t),
    );
  }
  get FluctuationUpper() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.fluctuationupperLength(),
      (t) => this.fluctuationupper(t),
    );
  }
  __init(t, r) {
    return (this.W7 = t), (this.j7 = r), this;
  }
  static getRootAsDamage(t, r) {
    return (r || new Damage()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.j7.__offset(this.W7, 4);
    return t ? this.j7.readInt64(this.W7 + t) : BigInt("0");
  }
  calculatetype() {
    var t = this.j7.__offset(this.W7, 6);
    return t ? this.j7.readInt32(this.W7 + t) : 0;
  }
  element() {
    var t = this.j7.__offset(this.W7, 8);
    return t ? this.j7.readInt32(this.W7 + t) : 0;
  }
  damagetexttype() {
    var t = this.j7.__offset(this.W7, 10);
    return t ? this.j7.readInt32(this.W7 + t) : 0;
  }
  payloadid() {
    var t = this.j7.__offset(this.W7, 12);
    return t ? this.j7.readInt64(this.W7 + t) : BigInt("0");
  }
  type() {
    var t = this.j7.__offset(this.W7, 14);
    return t ? this.j7.readInt32(this.W7 + t) : 0;
  }
  smashtype() {
    var t = this.j7.__offset(this.W7, 16);
    return t ? this.j7.readInt32(this.W7 + t) : 1;
  }
  GetCurebasevalueAt(t) {
    return this.curebasevalue(t);
  }
  curebasevalue(t) {
    var r = this.j7.__offset(this.W7, 18);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  curebasevalueLength() {
    var t = this.j7.__offset(this.W7, 18);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  curebasevalueArray() {
    var t = this.j7.__offset(this.W7, 18);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  relatedproperty() {
    var t = this.j7.__offset(this.W7, 20);
    return t ? this.j7.readInt32(this.W7 + t) : 7;
  }
  GetRatelvAt(t) {
    return this.ratelv(t);
  }
  ratelv(t) {
    var r = this.j7.__offset(this.W7, 22);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  ratelvLength() {
    var t = this.j7.__offset(this.W7, 22);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  ratelvArray() {
    var t = this.j7.__offset(this.W7, 22);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetHardnesslvAt(t) {
    return this.hardnesslv(t);
  }
  hardnesslv(t) {
    var r = this.j7.__offset(this.W7, 24);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  hardnesslvLength() {
    var t = this.j7.__offset(this.W7, 24);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  hardnesslvArray() {
    var t = this.j7.__offset(this.W7, 24);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetToughlvAt(t) {
    return this.toughlv(t);
  }
  toughlv(t) {
    var r = this.j7.__offset(this.W7, 26);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  toughlvLength() {
    var t = this.j7.__offset(this.W7, 26);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  toughlvArray() {
    var t = this.j7.__offset(this.W7, 26);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetEnergyAt(t) {
    return this.energy(t);
  }
  energy(t) {
    var r = this.j7.__offset(this.W7, 28);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  energyLength() {
    var t = this.j7.__offset(this.W7, 28);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  energyArray() {
    var t = this.j7.__offset(this.W7, 28);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetSpecialenergy1At(t) {
    return this.specialenergy1(t);
  }
  specialenergy1(t) {
    var r = this.j7.__offset(this.W7, 30);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  specialenergy1Length() {
    var t = this.j7.__offset(this.W7, 30);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  specialenergy1Array() {
    var t = this.j7.__offset(this.W7, 30);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetSpecialenergy2At(t) {
    return this.specialenergy2(t);
  }
  specialenergy2(t) {
    var r = this.j7.__offset(this.W7, 32);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  specialenergy2Length() {
    var t = this.j7.__offset(this.W7, 32);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  specialenergy2Array() {
    var t = this.j7.__offset(this.W7, 32);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetSpecialenergy3At(t) {
    return this.specialenergy3(t);
  }
  specialenergy3(t) {
    var r = this.j7.__offset(this.W7, 34);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  specialenergy3Length() {
    var t = this.j7.__offset(this.W7, 34);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  specialenergy3Array() {
    var t = this.j7.__offset(this.W7, 34);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetSpecialenergy4At(t) {
    return this.specialenergy4(t);
  }
  specialenergy4(t) {
    var r = this.j7.__offset(this.W7, 36);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  specialenergy4Length() {
    var t = this.j7.__offset(this.W7, 36);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  specialenergy4Array() {
    var t = this.j7.__offset(this.W7, 36);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  elementpowertype() {
    var t = this.j7.__offset(this.W7, 38);
    return t ? this.j7.readInt32(this.W7 + t) : 0;
  }
  GetElementpowerAt(t) {
    return this.elementpower(t);
  }
  elementpower(t) {
    var r = this.j7.__offset(this.W7, 40);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  elementpowerLength() {
    var t = this.j7.__offset(this.W7, 40);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  elementpowerArray() {
    var t = this.j7.__offset(this.W7, 40);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  formulatype() {
    var t = this.j7.__offset(this.W7, 42);
    return t ? this.j7.readInt32(this.W7 + t) : 0;
  }
  GetFormulaparam1At(t) {
    return this.formulaparam1(t);
  }
  formulaparam1(t) {
    var r = this.j7.__offset(this.W7, 44);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  formulaparam1Length() {
    var t = this.j7.__offset(this.W7, 44);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  formulaparam1Array() {
    var t = this.j7.__offset(this.W7, 44);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetFormulaparam2At(t) {
    return this.formulaparam2(t);
  }
  formulaparam2(t) {
    var r = this.j7.__offset(this.W7, 46);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  formulaparam2Length() {
    var t = this.j7.__offset(this.W7, 46);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  formulaparam2Array() {
    var t = this.j7.__offset(this.W7, 46);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetFormulaparam3At(t) {
    return this.formulaparam3(t);
  }
  formulaparam3(t) {
    var r = this.j7.__offset(this.W7, 48);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  formulaparam3Length() {
    var t = this.j7.__offset(this.W7, 48);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  formulaparam3Array() {
    var t = this.j7.__offset(this.W7, 48);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetFormulaparam4At(t) {
    return this.formulaparam4(t);
  }
  formulaparam4(t) {
    var r = this.j7.__offset(this.W7, 50);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  formulaparam4Length() {
    var t = this.j7.__offset(this.W7, 50);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  formulaparam4Array() {
    var t = this.j7.__offset(this.W7, 50);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetFormulaparam5At(t) {
    return this.formulaparam5(t);
  }
  formulaparam5(t) {
    var r = this.j7.__offset(this.W7, 52);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  formulaparam5Length() {
    var t = this.j7.__offset(this.W7, 52);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  formulaparam5Array() {
    var t = this.j7.__offset(this.W7, 52);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetFormulaparam6At(t) {
    return this.formulaparam6(t);
  }
  formulaparam6(t) {
    var r = this.j7.__offset(this.W7, 54);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  formulaparam6Length() {
    var t = this.j7.__offset(this.W7, 54);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  formulaparam6Array() {
    var t = this.j7.__offset(this.W7, 54);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetFormulaparam7At(t) {
    return this.formulaparam7(t);
  }
  formulaparam7(t) {
    var r = this.j7.__offset(this.W7, 56);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  formulaparam7Length() {
    var t = this.j7.__offset(this.W7, 56);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  formulaparam7Array() {
    var t = this.j7.__offset(this.W7, 56);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetFormulaparam8At(t) {
    return this.formulaparam8(t);
  }
  formulaparam8(t) {
    var r = this.j7.__offset(this.W7, 58);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  formulaparam8Length() {
    var t = this.j7.__offset(this.W7, 58);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  formulaparam8Array() {
    var t = this.j7.__offset(this.W7, 58);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetFormulaparam9At(t) {
    return this.formulaparam9(t);
  }
  formulaparam9(t) {
    var r = this.j7.__offset(this.W7, 60);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  formulaparam9Length() {
    var t = this.j7.__offset(this.W7, 60);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  formulaparam9Array() {
    var t = this.j7.__offset(this.W7, 60);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetFormulaparam10At(t) {
    return this.formulaparam10(t);
  }
  formulaparam10(t) {
    var r = this.j7.__offset(this.W7, 62);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  formulaparam10Length() {
    var t = this.j7.__offset(this.W7, 62);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  formulaparam10Array() {
    var t = this.j7.__offset(this.W7, 62);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  immunetype() {
    var t = this.j7.__offset(this.W7, 64);
    return t ? this.j7.readInt32(this.W7 + t) : 0;
  }
  GetPercent0At(t) {
    return this.percent0(t);
  }
  percent0(t) {
    var r = this.j7.__offset(this.W7, 66);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  percent0Length() {
    var t = this.j7.__offset(this.W7, 66);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  percent0Array() {
    var t = this.j7.__offset(this.W7, 66);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetPercent1At(t) {
    return this.percent1(t);
  }
  percent1(t) {
    var r = this.j7.__offset(this.W7, 68);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  percent1Length() {
    var t = this.j7.__offset(this.W7, 68);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  percent1Array() {
    var t = this.j7.__offset(this.W7, 68);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetFluctuationlowerAt(t) {
    return this.fluctuationlower(t);
  }
  fluctuationlower(t) {
    var r = this.j7.__offset(this.W7, 70);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  fluctuationlowerLength() {
    var t = this.j7.__offset(this.W7, 70);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  fluctuationlowerArray() {
    var t = this.j7.__offset(this.W7, 70);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
  GetFluctuationupperAt(t) {
    return this.fluctuationupper(t);
  }
  fluctuationupper(t) {
    var r = this.j7.__offset(this.W7, 72);
    return r ? this.j7.readInt32(this.j7.__vector(this.W7 + r) + 4 * t) : 0;
  }
  fluctuationupperLength() {
    var t = this.j7.__offset(this.W7, 72);
    return t ? this.j7.__vector_len(this.W7 + t) : 0;
  }
  fluctuationupperArray() {
    var t = this.j7.__offset(this.W7, 72);
    return t
      ? new Int32Array(
          this.j7.bytes().buffer,
          this.j7.bytes().byteOffset + this.j7.__vector(this.W7 + t),
          this.j7.__vector_len(this.W7 + t),
        )
      : null;
  }
}
exports.Damage = Damage;
//# sourceMappingURL=Damage.js.map
