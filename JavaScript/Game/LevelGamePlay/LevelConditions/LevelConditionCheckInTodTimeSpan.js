"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckInTodTimeSpan = void 0);
const CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  TimeOfDayController_1 = require("../../Module/TimeOfDay/TimeOfDayController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckInTodTimeSpan extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var r;
    return (
      !!e.LimitParams &&
      !!(r = e.LimitParams.get("StartMinute")) &&
      !!(e = e.LimitParams.get("EndMinute")) &&
      TimeOfDayController_1.TimeOfDayController.CheckInMinuteSpan(
        parseInt(r),
        parseInt(e),
      )
    );
  }
  CheckNew(e, n) {
    var r, o;
    return (
      !!e &&
      !(!(e = e).Start || !e.End) &&
      ((o = e.Start.Hour * CommonDefine_1.MINUTE_PER_HOUR + e.Start.Min),
      (r = e.End.Hour * CommonDefine_1.MINUTE_PER_HOUR + e.End.Min),
      (o = TimeOfDayController_1.TimeOfDayController.CheckInMinuteSpan(o, r)),
      "Eq" === e.Compare ? o : !o)
    );
  }
}
exports.LevelConditionCheckInTodTimeSpan = LevelConditionCheckInTodTimeSpan;
//# sourceMappingURL=LevelConditionCheckInTodTimeSpan.js.map
