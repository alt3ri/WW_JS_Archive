"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  GlobalData_1 = require("../../../GlobalData"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorNowTimeCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.BlackboardKey = ""),
      (this.IsGreaterThan = !0),
      (this.CompareValue = 0),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKey = ""),
      (this.TsIsGreaterThan = !1),
      (this.TsCompareValue = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKey = this.BlackboardKey),
      (this.TsIsGreaterThan = this.IsGreaterThan),
      (this.TsCompareValue = this.CompareValue));
  }
  PerformConditionCheckAI(r, e) {
    var o, t;
    return (
      this.InitTsVariables(),
      !!this.TsBlackboardKey &&
        ((o = r.AiController)
          ? ((o = o.CharActorComp.Entity.Id),
            (t = Time_1.Time.WorldTime),
            !(o =
              BlackboardController_1.BlackboardController.GetIntValueByEntity(
                o,
                this.TsBlackboardKey,
              )) ||
              ((t = t - o),
              this.TsIsGreaterThan
                ? t > this.TsCompareValue
                : this.TsCompareValue > t))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
                "Type",
                r.GetClass().GetName(),
              ]),
            !1))
    );
  }
}
exports.default = TsDecoratorNowTimeCompare;
//# sourceMappingURL=TsDecoratorNowTimeCompare.js.map
