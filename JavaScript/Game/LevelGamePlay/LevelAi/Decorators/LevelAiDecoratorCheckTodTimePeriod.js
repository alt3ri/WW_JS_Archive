"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiDecoratorCheckTodTimePeriod = void 0);
const TimeOfDayController_1 = require("../../../Module/TimeOfDay/TimeOfDayController"),
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
    var i = this.Params;
    if (!i) return !1;
    let r = 0,
      T = 0;
    T =
      "DayTime" === i.TimePeriod
        ? ((r = DAYTIME_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
          DAYTIME_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR)
        : ((r = NIGHT_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
          NIGHT_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
    var o = TimeOfDayController_1.TimeOfDayController.CheckInMinuteSpan(r, T);
    return "Eq" === i.Compare ? o : !o;
  }
}
exports.LevelAiDecoratorCheckTodTimePeriod = LevelAiDecoratorCheckTodTimePeriod;
//# sourceMappingURL=LevelAiDecoratorCheckTodTimePeriod.js.map
