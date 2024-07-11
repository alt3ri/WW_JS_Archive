"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorBlackboardBooleanCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.BlackboardKey = ""),
      (this.CompareValue = !1),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKey = ""),
      (this.TsCompareValue = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKey = this.BlackboardKey),
      (this.TsCompareValue = this.CompareValue));
  }
  PerformConditionCheckAI(o, r) {
    var e = o.AiController;
    return e
      ? !!(e = e.CharAiDesignComp) &&
          (this.InitTsVariables(),
          BlackboardController_1.BlackboardController.GetBooleanValueByEntity(
            e.Entity.Id,
            this.TsBlackboardKey,
          )
            ? this.TsCompareValue
            : !this.TsCompareValue)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            o.GetClass().GetName(),
          ]),
        !1);
  }
}
exports.default = TsDecoratorBlackboardBooleanCompare;
//# sourceMappingURL=TsDecoratorBlackboardBooleanCompare.js.map
