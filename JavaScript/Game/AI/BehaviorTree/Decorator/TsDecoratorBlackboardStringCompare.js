"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorBlackboardStringCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.BlackboardKey = ""),
      (this.Positive = !1),
      (this.Exactly = !1),
      (this.CompareValue = ""),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKey = ""),
      (this.TsPositive = !1),
      (this.TsExactly = !1),
      (this.TsCompareValue = "");
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKey = this.BlackboardKey),
      (this.TsPositive = this.Positive),
      (this.TsExactly = this.Exactly),
      (this.TsCompareValue = this.CompareValue));
  }
  PerformConditionCheckAI(r, t) {
    let o = r.AiController;
    if (!o)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            r.GetClass().GetName(),
          ]),
        !1
      );
    r = o.CharAiDesignComp;
    if (!r) return !1;
    this.InitTsVariables();
    o = BlackboardController_1.BlackboardController.GetStringValueByEntity(
      r.Entity.Id,
      this.TsBlackboardKey,
    );
    return this.TsExactly
      ? o === this.TsCompareValue
      : o.includes(this.TsCompareValue) === this.TsPositive;
  }
}
exports.default = TsDecoratorBlackboardStringCompare;
// # sourceMappingURL=TsDecoratorBlackboardStringCompare.js.map
