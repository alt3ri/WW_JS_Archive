"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComboTeachingModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class ComboTeachingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.AIt = 0),
      (this.PIt = 0),
      (this.xIt = !1),
      (this.wIt = !1),
      (this.BIt = 0),
      (this.bIt = 0),
      (this.qIt = []),
      (this.GIt = []),
      (this.NIt = 0),
      (this.OIt = !1),
      (this.kIt = !1),
      (this.FIt = 0);
  }
  get BeforeJumpTime() {
    return this.FIt;
  }
  set BeforeJumpTime(t) {
    this.FIt = t;
  }
  get IsClose() {
    return this.kIt;
  }
  set IsClose(t) {
    this.kIt = t;
  }
  get IsEmit() {
    return this.OIt;
  }
  set IsEmit(t) {
    this.OIt = t;
  }
  get RecoveryComboId() {
    return this.NIt;
  }
  set RecoveryComboId(t) {
    this.NIt = t;
  }
  get AddBuffList() {
    return this.qIt;
  }
  get AddTagList() {
    return this.GIt;
  }
  get NextAttrSkillId() {
    return this.bIt;
  }
  set NextAttrSkillId(t) {
    this.bIt = t;
  }
  set UseSkillId(t) {
    this.AIt = t;
  }
  get UseSkillId() {
    return this.AIt;
  }
  set UseSkillTime(t) {
    this.PIt = t;
  }
  get UseSkillTime() {
    return this.PIt;
  }
  set PreNextAttr(t) {
    this.xIt = t;
  }
  get PreNextAttr() {
    return this.xIt;
  }
  set NextAttr(t) {
    (this.xIt = this.wIt), (this.wIt = t);
  }
  get NextAttr() {
    return this.wIt;
  }
  set HitSkillId(t) {
    this.BIt = t;
  }
  get HitSkillId() {
    return this.BIt;
  }
}
exports.ComboTeachingModel = ComboTeachingModel;
//# sourceMappingURL=ComboTeachingModel.js.map
