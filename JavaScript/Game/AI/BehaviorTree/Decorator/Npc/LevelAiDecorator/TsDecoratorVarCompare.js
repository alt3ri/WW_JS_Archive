"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  IVar_1 = require("../../../../../../UniverseEditor/Interface/IVar"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsDecoratorVarCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.CheckType = 0),
      (this.SourceVarContext = void 0),
      (this.TargetVarContext = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsCheckType = 0),
      (this.TsSourceVarContext = void 0),
      (this.TsTargetVarContext = void 0),
      (this.Entity = void 0);
  }
  Constructor() {
    (this.IsInitTsVariables = !1),
      (this.TsCheckType = 0),
      (this.TsSourceVarContext = void 0),
      (this.TsTargetVarContext = void 0),
      (this.Entity = void 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsCheckType = this.CheckType),
      (this.TsSourceVarContext = this.SourceVarContext),
      (this.TsTargetVarContext = this.TargetVarContext));
  }
  PerformConditionCheckAI(e, r) {
    var t = e.AiController;
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        !1
      );
    if (
      (this.InitTsVariables(),
      (this.Entity = t.CharActorComp?.Entity),
      !this.TsSourceVarContext || !this.TsTargetVarContext)
    )
      return !1;
    if (
      "" === this.TsSourceVarContext.Type ||
      "" === this.TsTargetVarContext.Type
    )
      return !1;
    if (this.TsSourceVarContext.Type !== this.TsTargetVarContext.Type)
      return !1;
    var s = this.GetVarValue(this.TsSourceVarContext),
      a = this.GetVarValue(this.TsTargetVarContext);
    if (void 0 === s || void 0 === a) return !1;
    switch (this.TsCheckType) {
      case 0:
        return s === a;
      case 1:
        return s !== a;
      case 2:
        return s < a;
      case 3:
        return s <= a;
      case 4:
        return a < s;
      case 5:
        return a <= s;
      default:
        return !1;
    }
  }
  GetVarValue(e) {
    switch (e.VarRefSource) {
      case "Constant":
        return this.ParseConstantValue(e);
      case "Global":
        return ModelManager_1.ModelManager.WorldModel?.GetWorldState(e.Key);
      case "Other":
        return this.ParseOtherValue(e);
      case "Self":
        return this.ParseSelfValue(e);
    }
  }
  GetClientValue(e, r) {
    switch (r.Type) {
      case "Boolean":
        return ControllerHolder_1.ControllerHolder.BlackboardController.GetBooleanValueByEntity(
          e.Id,
          r.Key,
        );
      case "Float":
        return ControllerHolder_1.ControllerHolder.BlackboardController.GetFloatValueByEntity(
          e.Id,
          r.Key,
        );
      case "Int":
        return ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(
          e.Id,
          r.Key,
        );
      case "String":
        return ControllerHolder_1.ControllerHolder.BlackboardController.GetStringValueByEntity(
          e.Id,
          r.Key,
        );
      default:
        return;
    }
  }
  ParseConstantValue(e) {
    switch (e.Type) {
      case "Boolean":
        return e.BoolValue;
      case "Float":
        return e.FloatValue;
      case "Int":
        return e.IntValue;
      case "String":
        return e.StringValue;
      default:
        return;
    }
  }
  ParseSelfValue(e) {
    return e.IsClientVariable
      ? this.GetClientValue(this.Entity, e)
      : ((e = this.Entity?.GetComponent(0)?.GetEntityVar(e.Key)),
        this.ParseValue(e));
  }
  ParseOtherValue(e) {
    var r = e.Key,
      t = e.RefId;
    switch (e.VarRefType) {
      case "Entity":
        var s =
          ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(t);
        if (s)
          return e.IsClientVariable
            ? this.GetClientValue(s.Entity, e)
            : ((s = s.Entity?.GetComponent(0)),
              this.ParseValue(s?.GetEntityVar(r)));
        break;
      case "Quest":
        s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t)?.Tree;
        return this.ParseValue(s?.GetTreeVarByKey(r));
      case "LevelPlay":
        s =
          ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(t)?.Tree;
        return this.ParseValue(s?.GetTreeVarByKey(r));
      default:
        return;
    }
  }
  ParseValue(e) {
    if (e)
      switch ((0, IVar_1.getVarTypeByIndex)(e.iTs)) {
        case "Boolean":
          return e.rTs;
        case "Float":
          return e.sTs;
        case "Int":
          return MathUtils_1.MathUtils.LongToNumber(e.oTs);
        case "String":
          return e.nTs;
        default:
          return;
      }
  }
}
exports.default = TsDecoratorVarCompare;
//# sourceMappingURL=TsDecoratorVarCompare.js.map
