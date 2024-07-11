"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../../../GlobalData"),
  TimeOfDayController_1 = require("../../../../../Module/TimeOfDay/TimeOfDayController"),
  TimeOfDayDefine_1 = require("../../../../../Module/TimeOfDay/TimeOfDayDefine"),
  DAYTIME_HOUR_START = 6,
  DAYTIME_HOUR_END = 18,
  NIGHT_HOUR_START = 18,
  NIGHT_HOUR_END = 6;
class TsDecoratorTimePeriodCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.CheckType = 0),
      (this.TimePeriod = ""),
      (this.IsInitTsVariables = !1),
      (this.TsCheckType = 0),
      (this.TsTimePeriod = "");
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsCheckType = this.CheckType),
      (this.TsTimePeriod = this.TimePeriod));
  }
  PerformConditionCheckAI(e, i) {
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
    let r = 0,
      t = 0;
    t =
      "DayTime" === this.TsTimePeriod
        ? ((r = DAYTIME_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
          DAYTIME_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR)
        : ((r = NIGHT_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
          NIGHT_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
    var o = TimeOfDayController_1.TimeOfDayController.CheckInMinuteSpan(r, t);
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
exports.default = TsDecoratorTimePeriodCheck;
//# sourceMappingURL=TsDecoratorTimePeriodCheck.js.map
