"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorBlackboardFloatCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.BlackboardKey = ""),
      (this.Operation = 0),
      (this.CompareValue = 0),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKey = ""),
      (this.TsOperation = 0),
      (this.TsCompareValue = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKey = this.BlackboardKey),
      (this.TsOperation = this.Operation),
      (this.TsCompareValue = this.CompareValue));
  }
  PerformConditionCheckAI(r, t) {
    const e = r.AiController;
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            r.GetClass().GetName(),
          ]),
        !1
      );
    r = e.CharAiDesignComp;
    if (!r) return !1;
    this.InitTsVariables();
    let s = BlackboardController_1.BlackboardController.GetFloatValueByEntity(
      r.Entity.Id,
      this.TsBlackboardKey,
    );
    switch (((s = s || 0), this.TsOperation)) {
      case 0:
        return s === this.TsCompareValue;
      case 1:
        return s !== this.TsCompareValue;
      case 2:
        return s < this.TsCompareValue;
      case 3:
        return s <= this.TsCompareValue;
      case 4:
        return s > this.TsCompareValue;
      case 5:
        return s >= this.TsCompareValue;
      default:
        return !1;
    }
  }
}
exports.default = TsDecoratorBlackboardFloatCompare;
// # sourceMappingURL=TsDecoratorBlackboardFloatCompare.js.map
