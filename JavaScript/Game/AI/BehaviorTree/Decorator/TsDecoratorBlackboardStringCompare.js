"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
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
  Constructor() {
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
  PerformConditionCheckAI(t, r) {
    var s = t.AiController;
    if (!s)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        !1
      );
    t = s.CharAiDesignComp;
    if (!t) return !1;
    this.InitTsVariables();
    s =
      ControllerHolder_1.ControllerHolder.BlackboardController.GetStringValueByEntity(
        t.Entity.Id,
        this.TsBlackboardKey,
      );
    return (
      (this.TsExactly
        ? s === this.TsCompareValue
        : s.includes(this.TsCompareValue)) === this.TsPositive
    );
  }
}
exports.default = TsDecoratorBlackboardStringCompare;
//# sourceMappingURL=TsDecoratorBlackboardStringCompare.js.map
