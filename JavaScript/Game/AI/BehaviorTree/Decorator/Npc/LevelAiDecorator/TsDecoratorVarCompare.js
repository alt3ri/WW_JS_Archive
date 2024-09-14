"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  IVar_1 = require("../../../../../../UniverseEditor/Interface/IVar"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  BlackboardController_1 = require("../../../../../World/Controller/BlackboardController");
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
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsCheckType = this.CheckType),
      (this.TsSourceVarContext = this.SourceVarContext),
      (this.TsTargetVarContext = this.TargetVarContext));
  }
  PerformConditionCheckAI(r, e) {
    var t = r.AiController;
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            r.GetClass().GetName(),
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
    var a = this.GetVarValue(this.TsSourceVarContext),
      s = this.GetVarValue(this.TsTargetVarContext);
    if (void 0 === a || void 0 === s) return !1;
    switch (this.TsCheckType) {
      case 0:
        return a === s;
      case 1:
        return a !== s;
      case 2:
        return a < s;
      case 3:
        return a <= s;
      case 4:
        return s < a;
      case 5:
        return s <= a;
      default:
        return !1;
    }
  }
  GetVarValue(r) {
    switch (r.VarRefSource) {
      case "Constant":
        return this.ParseConstantValue(r);
      case "Global":
        return ModelManager_1.ModelManager.WorldModel?.WorldStateMap.get(r.Key);
      case "Other":
        var e = this.ParseOtherValue(r.Key, r.RefId, r.VarRefType);
        return this.ParseValue(e);
      case "Self":
        return r.IsClientVariable
          ? this.GetClientValue(r)
          : ((e = this.Entity?.GetComponent(0)?.GetEntityVar(r.Key)),
            this.ParseValue(e));
    }
  }
  GetClientValue(r) {
    switch (r.Type) {
      case "Boolean":
        return BlackboardController_1.BlackboardController.GetBooleanValueByEntity(
          this.Entity.Id,
          r.Key,
        );
      case "Float":
        return BlackboardController_1.BlackboardController.GetFloatValueByEntity(
          this.Entity.Id,
          r.Key,
        );
      case "Int":
        return BlackboardController_1.BlackboardController.GetIntValueByEntity(
          this.Entity.Id,
          r.Key,
        );
      case "String":
        return BlackboardController_1.BlackboardController.GetStringValueByEntity(
          this.Entity.Id,
          r.Key,
        );
      default:
        return;
    }
  }
  ParseConstantValue(r) {
    switch (r.Type) {
      case "Boolean":
        return r.BoolValue;
      case "Float":
        return r.FloatValue;
      case "Int":
        return r.IntValue;
      case "String":
        return r.StringValue;
      default:
        return;
    }
  }
  ParseOtherValue(r, e, t) {
    switch (t) {
      case "Entity":
        var a =
          ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e);
        if (a) return a.Entity?.GetComponent(0)?.GetEntityVar(r);
        break;
      case "Quest":
        return ModelManager_1.ModelManager.QuestNewModel.GetQuest(
          e,
        )?.Tree?.GetTreeVarByKey(r);
      case "LevelPlay":
        return ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
          e,
        )?.Tree?.GetTreeVarByKey(r);
      default:
        return;
    }
  }
  ParseValue(r) {
    if (r)
      switch ((0, IVar_1.getVarTypeByIndex)(r.iTs)) {
        case "Boolean":
          return r.rTs;
        case "Float":
          return r.sTs;
        case "Int":
          return MathUtils_1.MathUtils.LongToNumber(r.oTs);
        case "String":
          return r.nTs;
        default:
          return;
      }
  }
}
exports.default = TsDecoratorVarCompare;
//# sourceMappingURL=TsDecoratorVarCompare.js.map
