"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomTrialBattleData = void 0);
const AttributeDefine_1 = require("../../../Attribute/AttributeDefine"),
  PhantomBattleData_1 = require("../PhantomBattleData");
class PhantomTrialBattleData extends PhantomBattleData_1.PhantomBattleData {
  constructor() {
    super(...arguments),
      (this.kVi = new Map()),
      (this.FVi = void 0),
      (this.VVi = new Map()),
      (this.wVi = 0),
      (this.HVi = 0);
  }
  SetMainPropValue(t, e, r) {
    e = new AttributeDefine_1.AttributeValueData(t, e, r);
    this.kVi.set(t, e);
  }
  SetSubPropValue(t, e, r) {
    e = new AttributeDefine_1.AttributeValueData(t, e, r);
    this.VVi.set(t, e);
  }
  SetFetterGroupId(t) {
    this.HVi = t;
  }
  GetFetterGroupId() {
    return this.HVi;
  }
  SetSlotIndex(t) {
    this.wVi = t;
  }
  GetIfMain() {
    return 0 === this.wVi;
  }
  GetUniqueId() {
    return this.GetIncrId();
  }
  GetMainTrailProp() {
    return this.kVi;
  }
  GetSubTrailPropMap() {
    return this.VVi;
  }
  GetBreachProp() {
    return this.FVi;
  }
  IsBreach() {
    return !0;
  }
}
exports.PhantomTrialBattleData = PhantomTrialBattleData;
//# sourceMappingURL=PhantomTrialBattleData.js.map
