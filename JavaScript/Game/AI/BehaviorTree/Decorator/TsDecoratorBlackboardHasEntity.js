"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorBlackboardHasEntity extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.BlackboardKey = ""),
      (this.CompareValue = !0),
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
    if ((this.InitTsVariables(), this.TsBlackboardKey)) {
      o = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
        r.Entity.Id,
        this.TsBlackboardKey,
      );
      if (o && o > 0) return this.TsCompareValue;
    }
    return !this.TsCompareValue;
  }
}
exports.default = TsDecoratorBlackboardHasEntity;
// # sourceMappingURL=TsDecoratorBlackboardHasEntity.js.map
