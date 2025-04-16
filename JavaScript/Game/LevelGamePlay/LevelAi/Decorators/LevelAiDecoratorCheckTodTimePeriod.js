"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiDecoratorCheckTodTimePeriod = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  TimeOfDayDefine_1 = require("../../../Module/TimeOfDay/TimeOfDayDefine"),
  LevelAiDecorator_1 = require("../LevelAiDecorator"),
  DAYTIME_HOUR_START = 6,
  DAYTIME_HOUR_END = 18,
  NIGHT_HOUR_START = 18,
  NIGHT_HOUR_END = 6;
class LevelAiDecoratorCheckTodTimePeriod extends LevelAiDecorator_1.LevelAiDecorator {
  OnExecutionStart() {
    this.CheckConditionOnTick = !0;
  }
  CheckCondition(e) {
    var r = this.Params;
    if (!r) return !1;
    let i = 0,
      o = 0;
    o =
      "DayTime" === r.TimePeriod
        ? ((i = DAYTIME_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
          DAYTIME_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR)
        : ((i = NIGHT_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
          NIGHT_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
    var T =
      ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(
        i,
        o,
      );
    return "Eq" === r.Compare ? T : !T;
  }
}
exports.LevelAiDecoratorCheckTodTimePeriod = LevelAiDecoratorCheckTodTimePeriod;
//# sourceMappingURL=LevelAiDecoratorCheckTodTimePeriod.js.map
