"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCompareVar = void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IVar_1 = require("../../../UniverseEditor/Interface/IVar"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareVar extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r, a) {
    if (!e) return !1;
    var t = e.Var1,
      n = e.Var2;
    if (t.Type !== n.Type) return !1;
    var s = this.VTn(t, a),
      u = this.VTn(n, a);
    if (void 0 === s || void 0 === u) return !1;
    switch (e.Compare) {
      case "Eq":
        return s === u;
      case "Ne":
        return s !== u;
      case "Ge":
        return u <= s;
      case "Gt":
        return u < s;
      case "Le":
        return s <= u;
      case "Lt":
        return s < u;
      default:
        return !1;
    }
  }
  VTn(e, r) {
    switch (e.Source) {
      case "Constant":
        return e.Value;
      case "Global":
        return ModelManager_1.ModelManager.WorldModel?.WorldStateMap.get(
          e.Keyword,
        );
      case "Other":
        var a = this.HTn(e.Name, e.RefId, e.RefType);
        return this.E$(a);
      case "Self":
        return r ? ((a = this.jTn(e.Name, r)), this.E$(a)) : void 0;
      default:
        return;
    }
  }
  jTn(e, r) {
    switch (r.Type) {
      case 1:
        var a = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
          r.EntityId,
        );
        if (a) return a.Entity?.GetComponent(0)?.GetEntityVar(e);
        break;
      case 6:
        return ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
          r.TreeIncId,
        )?.GetTreeVarByKey(e);
      case 5:
        a = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
          r.TriggerEntityId,
        );
        if (a) return a.Entity?.GetComponent(0)?.GetEntityVar(e);
        break;
      default:
        return;
    }
  }
  HTn(e, r, a) {
    switch (a) {
      case "Entity":
        var t =
          ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(r);
        if (t) return t.Entity?.GetComponent(0)?.GetEntityVar(e);
        break;
      case "Quest":
        return ModelManager_1.ModelManager.QuestNewModel.GetQuest(
          r,
        )?.Tree?.GetTreeVarByKey(e);
      case "LevelPlay":
        return ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
          r,
        )?.Tree?.GetTreeVarByKey(e);
      default:
        return;
    }
  }
  E$(e) {
    if (e)
      switch ((0, IVar_1.getVarTypeByIndex)(e.xMs)) {
        case "Boolean":
          return e.bMs;
        case "Float":
          return e.GMs;
        case "Int":
          return MathUtils_1.MathUtils.LongToNumber(e.BMs);
        case "String":
          return e.qMs;
        default:
          return;
      }
  }
}
exports.LevelConditionCompareVar = LevelConditionCompareVar;
//# sourceMappingURL=LevelConditionCompareVar.js.map
