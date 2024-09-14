"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGeneralModel = void 0);
const ModelBase_1 = require("../../Core/Framework/ModelBase"),
  IUtil_1 = require("../../UniverseEditor/Interface/IUtil"),
  GuaranteeActionCenter_1 = require("./Guarantee/GuaranteeActionCenter"),
  LevelConditionCenter_1 = require("./LevelConditions/LevelConditionCenter"),
  LevelEventCenter_1 = require("./LevelEvents/LevelEventCenter");
class LevelGeneralModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CreatureGenAddTagList = void 0),
      (this.InteractionDebug = !1),
      (this.WUe = void 0),
      (this.KUe = void 0);
  }
  OnInit() {
    return (
      (this.CreatureGenAddTagList = new Map()),
      (this.InteractionDebug = !1),
      (this.WUe = new Map()),
      (this.KUe = new Array()),
      LevelEventCenter_1.LevelEventCenter.RegistEvents(),
      LevelConditionCenter_1.LevelConditionCenter.RegistConditions(),
      GuaranteeActionCenter_1.GuaranteeActionCenter.RegGuaranteeActions(),
      !0
    );
  }
  OnClear() {
    return (
      (this.CreatureGenAddTagList = void 0),
      (this.InteractionDebug = !1),
      (this.WUe = void 0),
      !(this.KUe = void 0)
    );
  }
  AddTreeGuaranteeActionInfo(e, t) {
    this.WUe.has(e) || this.WUe.set(e, []), this.WUe.get(e).push(t);
  }
  PopTreeGuaranteeActionInfo(t, r) {
    var n = this.WUe.get(t);
    if (n)
      for (let e = n.length - 1; 0 <= e; e--) {
        var i = n[e];
        if (i.Name === r.Name && (0, IUtil_1.deepEquals)(i, r))
          return n.splice(e, 1), 0 === n.length && this.WUe.delete(t), i;
      }
  }
  HasTreeGuaranteeActionInfo(e, t, r) {
    return (
      0 !== r &&
      !!(e = this.WUe.get(e)) &&
      e.some((e) =>
        1 === r
          ? e.Name === t.Name
          : e.Name === t.Name && (0, IUtil_1.deepEquals)(e, t),
      )
    );
  }
  RemoveTreeGuaranteeActionInfos(e) {
    var t = this.WUe.get(e);
    if ((this.WUe.delete(e), t)) return t;
  }
  ClearTreeGuaranteeActionInfosMap() {
    this.WUe.clear();
  }
  AddSceneGuaranteeActionInfo(e) {
    this.KUe.push(e);
  }
  PopSceneGuaranteeActionInfo(t) {
    var r = this.KUe;
    for (let e = r.length - 1; 0 <= e; e--) {
      var n = r[e];
      if (n.Name === t.Name && (0, IUtil_1.deepEquals)(n, t))
        return r.splice(e, 1), n;
    }
  }
  HasSceneGuaranteeActionInfo(t, r) {
    return (
      0 !== r &&
      this.KUe.some((e) =>
        1 === r
          ? e.Name === t.Name
          : e.Name === t.Name && (0, IUtil_1.deepEquals)(e, t),
      )
    );
  }
  RemoveSceneGuaranteeActionInfos() {
    var e = this.KUe;
    return (this.KUe = new Array()), e;
  }
}
exports.LevelGeneralModel = LevelGeneralModel;
//# sourceMappingURL=LevelGeneralModel.js.map
