"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGeneralModel = void 0);
const Log_1 = require("../../Core/Common/Log"),
  ActionTypeByType_1 = require("../../Core/Define/ConfigQuery/ActionTypeByType"),
  ModelBase_1 = require("../../Core/Framework/ModelBase"),
  IUtil_1 = require("../../UniverseEditor/Interface/IUtil"),
  GuaranteeActionCenter_1 = require("./Guarantee/GuaranteeActionCenter"),
  LevelConditionCenter_1 = require("./LevelConditions/LevelConditionCenter"),
  LevelEventCenter_1 = require("./LevelEvents/LevelEventCenter");
class LevelGeneralModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CreatureGenAddTagList = void 0),
      (this.ActionTypeMap = void 0),
      (this.InteractionDebug = !1),
      (this.WUe = void 0),
      (this.KUe = void 0);
  }
  OnInit() {
    return (
      (this.CreatureGenAddTagList = new Map()),
      (this.ActionTypeMap = new Map()),
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
  GetActionTypeConfig(e) {
    var t = this.ActionTypeMap.get(e);
    return (
      t ||
      ((t = ActionTypeByType_1.configActionTypeByType.GetConfig(e))
        ? (this.ActionTypeMap.set(e, t), t)
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelEvent",
              7,
              "行为类型不存在，请检查行为类型表配置",
              ["ActionType", e],
            )
          ))
    );
  }
  AddTreeGuaranteeActionInfo(e, t) {
    this.WUe.has(e) || this.WUe.set(e, []), this.WUe.get(e).push(t);
  }
  PopTreeGuaranteeActionInfo(t, n) {
    var r = this.WUe.get(t);
    if (r)
      for (let e = r.length - 1; 0 <= e; e--) {
        var i = r[e];
        if (i.Name === n.Name && (0, IUtil_1.deepEquals)(i, n))
          return r.splice(e, 1), 0 === r.length && this.WUe.delete(t), i;
      }
  }
  HasTreeGuaranteeActionInfo(e, t, n) {
    return (
      0 !== n &&
      !!(e = this.WUe.get(e)) &&
      e.some((e) =>
        1 === n
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
    var n = this.KUe;
    for (let e = n.length - 1; 0 <= e; e--) {
      var r = n[e];
      if (r.Name === t.Name && (0, IUtil_1.deepEquals)(r, t))
        return n.splice(e, 1), r;
    }
  }
  HasSceneGuaranteeActionInfo(t, n) {
    return (
      0 !== n &&
      this.KUe.some((e) =>
        1 === n
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
