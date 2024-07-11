"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckTodTimePeriod = void 0);
const TimeOfDayController_1 = require("../../Module/TimeOfDay/TimeOfDayController");
const TimeOfDayDefine_1 = require("../../Module/TimeOfDay/TimeOfDayDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const DAYTIME_HOUR_START = 6;
const DAYTIME_HOUR_END = 18;
const NIGHT_HOUR_START = 18;
const NIGHT_HOUR_END = 6;
class LevelConditionCheckTodTimePeriod extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, i) {
    if (!e) return !1;
    let T = 0;
    let _ = 0;
    _ =
      e.TimePeriod === "DayTime"
        ? ((T = DAYTIME_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
          DAYTIME_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR)
        : ((T = NIGHT_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
          NIGHT_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
    const r = TimeOfDayController_1.TimeOfDayController.CheckInMinuteSpan(T, _);
    return e.Compare === "Eq" ? r : !r;
  }
}
exports.LevelConditionCheckTodTimePeriod = LevelConditionCheckTodTimePeriod;
// # sourceMappingURL=LevelConditionCheckTodTimePeriod.js.map
