"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
class TsDecoratorTimeSpanCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.CheckType = 0),
      (this.StartTime = new UE.Timecode()),
      (this.EndTime = new UE.Timecode()),
      (this.IsInitTsVariables = !1),
      (this.TsCheckType = 0),
      (this.TsStartTime = new UE.Timecode()),
      (this.TsEndTime = new UE.Timecode());
  }
  Constructor() {
    (this.IsInitTsVariables = !1),
      (this.TsCheckType = 0),
      (this.TsStartTime = new UE.Timecode()),
      (this.TsEndTime = new UE.Timecode());
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsCheckType = this.CheckType),
      (this.TsStartTime = this.StartTime),
      (this.TsEndTime = this.EndTime));
  }
  PerformConditionCheckAI(e, t) {
    if (!e.AiController)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        !1
      );
    this.InitTsVariables();
    var e =
        this.TsStartTime.Hours * CommonDefine_1.MINUTE_PER_HOUR +
        this.TsStartTime.Minutes,
      r =
        this.TsEndTime.Hours * CommonDefine_1.MINUTE_PER_HOUR +
        this.TsEndTime.Minutes,
      o =
        ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(
          e,
          r,
        );
    switch (this.TsCheckType) {
      case 0:
        return o;
      case 1:
        return !o;
      default:
        return !1;
    }
  }
}
exports.default = TsDecoratorTimeSpanCheck;
//# sourceMappingURL=TsDecoratorTimeSpanCheck.js.map
