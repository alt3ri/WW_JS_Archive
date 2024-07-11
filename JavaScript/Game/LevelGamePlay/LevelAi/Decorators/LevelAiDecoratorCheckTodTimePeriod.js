"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiDecoratorCheckTodTimePeriod = void 0);
const TimeOfDayController_1 = require("../../../Module/TimeOfDay/TimeOfDayController");
const TimeOfDayDefine_1 = require("../../../Module/TimeOfDay/TimeOfDayDefine");
const LevelAiDecorator_1 = require("../LevelAiDecorator");
const DAYTIME_HOUR_START = 6;
const DAYTIME_HOUR_END = 18;
const NIGHT_HOUR_START = 18;
const NIGHT_HOUR_END = 6;
class LevelAiDecoratorCheckTodTimePeriod extends LevelAiDecorator_1.LevelAiDecorator {
  OnExecutionStart() {
    this.CheckConditionOnTick = !0;
  }
  CheckCondition(e) {
    const i = this.Params;
    if (!i) return !1;
    let r = 0;
    let T = 0;
    T =
      i.TimePeriod === "DayTime"
        ? ((r = DAYTIME_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
          DAYTIME_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR)
        : ((r = NIGHT_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
          NIGHT_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
    const o = TimeOfDayController_1.TimeOfDayController.CheckInMinuteSpan(r, T);
    return i.Compare === "Eq" ? o : !o;
  }
}
exports.LevelAiDecoratorCheckTodTimePeriod = LevelAiDecoratorCheckTodTimePeriod;
// # sourceMappingURL=LevelAiDecoratorCheckTodTimePeriod.js.map
