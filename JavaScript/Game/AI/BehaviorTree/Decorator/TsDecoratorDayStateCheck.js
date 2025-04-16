"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorDayStateCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.BlackboardKey = "DayState"),
      (this.CheckValue = 0),
      (this.IsCollected = !1),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKey = ""),
      (this.TsCheckValue = 0);
  }
  Constructor() {
    (this.IsCollected = !1),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKey = ""),
      (this.TsCheckValue = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKey = this.BlackboardKey),
      (this.TsCheckValue = this.CheckValue));
  }
  PerformConditionCheckAI(t, e) {
    var r = t.AiController;
    if (!r)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        !1
      );
    this.InitTsVariables(),
      this.IsCollected ||
        ((t = r.NpcDecision) &&
          ((this.IsCollected = !0), (t.CheckDayState = !0)));
    t = r.CharActorComp;
    return (
      !!t &&
      ((r = t.Entity.Id),
      ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(
        r,
        this.TsBlackboardKey,
      ) === this.TsCheckValue)
    );
  }
}
exports.default = TsDecoratorDayStateCheck;
//# sourceMappingURL=TsDecoratorDayStateCheck.js.map
