"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiDecoratorCheckInTodTimeSpan = void 0);
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimeOfDayController_1 = require("../../../Module/TimeOfDay/TimeOfDayController"),
  LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorCheckInTodTimeSpan extends LevelAiDecorator_1.LevelAiDecorator {
  OnExecutionStart() {
    this.CheckConditionOnTick = !0;
  }
  CheckCondition(e) {
    var o,
      r,
      i = this.Params;
    return (
      !(!i.Start || !i.End) &&
      ((r = i.Start.Hour * CommonDefine_1.MINUTE_PER_HOUR + i.Start.Min),
      (o = i.End.Hour * CommonDefine_1.MINUTE_PER_HOUR + i.End.Min),
      (r = TimeOfDayController_1.TimeOfDayController.CheckInMinuteSpan(r, o)),
      "Eq" === i.Compare ? r : !r)
    );
  }
}
exports.LevelAiDecoratorCheckInTodTimeSpan = LevelAiDecoratorCheckInTodTimeSpan;
//# sourceMappingURL=LevelAiDecoratorCheckInTodTimeSpan.js.map
