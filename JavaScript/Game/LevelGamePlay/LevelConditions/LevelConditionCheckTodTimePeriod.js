"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckTodTimePeriod = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  TimeOfDayDefine_1 = require("../../Module/TimeOfDay/TimeOfDayDefine"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  DAYTIME_HOUR_START = 6,
  DAYTIME_HOUR_END = 18,
  NIGHT_HOUR_START = 18,
  NIGHT_HOUR_END = 6;
class LevelConditionCheckTodTimePeriod extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) return !1;
    let i = 0,
      T = 0;
    T =
      "DayTime" === e.TimePeriod
        ? ((i = DAYTIME_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
          DAYTIME_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR)
        : ((i = NIGHT_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
          NIGHT_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
    var _ =
      ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(
        i,
        T,
      );
    return "Eq" === e.Compare ? _ : !_;
  }
}
exports.LevelConditionCheckTodTimePeriod = LevelConditionCheckTodTimePeriod;
//# sourceMappingURL=LevelConditionCheckTodTimePeriod.js.map
